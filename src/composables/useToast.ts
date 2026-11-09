import { computed, reactive, ref } from 'vue';

import type {
  PtToastEntry,
  PtToastOptions,
  PtToastShortcutOptions,
  PtToastStatus
} from '../components/toasts/toast/PtToast.interface';

export const PT_TOAST_DEFAULT_DURATION = 5000;

export const PT_TOAST_DEFAULT_MAX = 5;

/**
 * Ajustes globais da fila. Reativo: mudar aqui vale para os proximos toasts,
 * em qualquer ponto da aplicacao.
 */
export const ptToastConfig = reactive({
  duration: PT_TOAST_DEFAULT_DURATION,
  max: PT_TOAST_DEFAULT_MAX
});

/**
 * Fila no escopo do modulo, e nao por instancia: qualquer componente que
 * chamar `useToast()` fala com a mesma lista, e um unico `PtToastContainer`
 * montado na aplicacao renderiza tudo.
 */
const entries = ref<PtToastEntry[]>([]);

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const remaining = new Map<string, number>();
const startedAt = new Map<string, number>();

let sequence = 0;

const clearTimer = (id: string) => {
  const timer = timers.get(id);

  if (timer !== undefined) clearTimeout(timer);

  timers.delete(id);
};

export const dismissToast = (id: string) => {
  clearTimer(id);
  remaining.delete(id);
  startedAt.delete(id);

  entries.value = entries.value.filter((entry) => entry.id !== id);
};

export const dismissAllToasts = () => {
  entries.value.forEach((entry) => clearTimer(entry.id));

  remaining.clear();
  startedAt.clear();
  entries.value = [];
};

const startTimer = (id: string, duration: number) => {
  if (duration <= 0) return;

  clearTimer(id);
  startedAt.set(id, Date.now());
  remaining.set(id, duration);
  timers.set(
    id,
    setTimeout(() => dismissToast(id), duration)
  );
};

/** Congela a contagem: usado enquanto o ponteiro esta sobre a pilha. */
export const pauseToasts = () => {
  entries.value.forEach((entry) => {
    if (entry.duration <= 0 || !timers.has(entry.id)) return;

    const started = startedAt.get(entry.id) ?? Date.now();
    const left = remaining.get(entry.id) ?? entry.duration;

    remaining.set(entry.id, Math.max(0, left - (Date.now() - started)));
    clearTimer(entry.id);
  });
};

export const resumeToasts = () => {
  entries.value.forEach((entry) => {
    if (entry.duration <= 0 || timers.has(entry.id)) return;

    const left = remaining.get(entry.id) ?? entry.duration;

    startedAt.set(entry.id, Date.now());
    timers.set(
      entry.id,
      setTimeout(() => dismissToast(entry.id), left)
    );
  });
};

/** Normaliza o atalho: `'titulo'` ou o objeto completo de opcoes. */
export const toToastOptions = (
  options: PtToastShortcutOptions,
  status?: PtToastStatus
): PtToastOptions => {
  const base =
    typeof options === 'string' ? { title: options } : { ...options };

  return status ? { ...base, status } : base;
};

export const pushToast = (options: PtToastShortcutOptions | PtToastOptions) => {
  const resolved = toToastOptions(options as PtToastShortcutOptions);

  sequence += 1;

  const entry: PtToastEntry = {
    ...resolved,
    id: `pt-toast-${sequence}`,
    duration: resolved.duration ?? ptToastConfig.duration
  };

  const max = Math.max(1, Math.trunc(ptToastConfig.max));

  while (entries.value.length >= max) {
    const oldest = entries.value[0];

    if (!oldest) break;

    dismissToast(oldest.id);
  }

  entries.value = [...entries.value, entry];

  startTimer(entry.id, entry.duration);

  return entry.id;
};

const withStatus =
  (status: PtToastStatus) => (options: PtToastShortcutOptions) =>
    pushToast(toToastOptions(options, status));

/**
 * Dispara toasts de qualquer lugar da aplicacao:
 *
 * ```ts
 * const toast = useToast();
 * toast.positive('Aposta registrada');
 * toast.negative({ title: 'Saldo insuficiente', description: '...' });
 * ```
 */
export const useToast = () => ({
  toasts: computed(() => entries.value),
  toast: pushToast,
  info: withStatus('info'),
  system: withStatus('system'),
  warning: withStatus('warning'),
  positive: withStatus('positive'),
  negative: withStatus('negative'),
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
  pause: pauseToasts,
  resume: resumeToasts,
  config: ptToastConfig
});
