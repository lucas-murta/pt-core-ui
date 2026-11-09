import type { PtToastStatus, ToastClassProps } from './PtToast.interface';

export const PT_TOAST_DEFAULT_STATUS: PtToastStatus = 'info';

type ToastStatusTokens = {
  surface: string;
  accent: string;
  content: string;
  icon: string;
};

const statusTokens: Record<PtToastStatus, ToastStatusTokens> = {
  info: {
    surface: 'bg-pt-surface-info',
    accent: 'border-l-pt-content-info',
    content: 'text-pt-content-info',
    icon: 'circle-info'
  },
  system: {
    surface: 'bg-pt-surface-system',
    accent: 'border-l-pt-content-system',
    content: 'text-pt-content-system',
    icon: 'gear'
  },
  warning: {
    surface: 'bg-pt-surface-warning',
    accent: 'border-l-pt-content-warning',
    content: 'text-pt-content-warning',
    icon: 'triangle-exclamation'
  },
  positive: {
    surface: 'bg-pt-surface-positive',
    accent: 'border-l-pt-content-positive',
    content: 'text-pt-content-positive',
    icon: 'circle-check'
  },
  negative: {
    surface: 'bg-pt-surface-negative',
    accent: 'border-l-pt-content-negative',
    content: 'text-pt-content-negative',
    icon: 'circle-xmark'
  }
};

/** Icone padrao de cada status. */
export const resolveToastIcon = (
  status: PtToastStatus = PT_TOAST_DEFAULT_STATUS
) => statusTokens[status].icon;

/**
 * Erros e avisos interrompem a leitura (`alert`/`assertive`); os demais
 * esperam uma pausa natural do leitor de tela (`status`/`polite`).
 */
export const resolveToastRole = (
  status: PtToastStatus = PT_TOAST_DEFAULT_STATUS
): { role: 'alert' | 'status'; ariaLive: 'assertive' | 'polite' } => {
  const assertive = status === 'negative' || status === 'warning';

  return {
    role: assertive ? 'alert' : 'status',
    ariaLive: assertive ? 'assertive' : 'polite'
  };
};

export const buildToastClasses = (props: ToastClassProps) => {
  const { status = PT_TOAST_DEFAULT_STATUS, className } = props;

  const tokens = statusTokens[status];

  /** Largura fixa de `pt-48` (384px); a altura acompanha o conteudo. */
  const container = [
    'flex w-pt-48 max-w-full items-start gap-pt-1 rounded-pt-1 p-pt-2',
    'border-l-[4px] font-pt-body shadow-pt-paper-3',
    tokens.surface,
    tokens.accent,
    className
  ]
    .filter(Boolean)
    .join(' ');

  /**
   * Icone e botao de fechar tem 16px e sao centralizados na primeira linha do
   * titulo, que mede 28px (`text-pt-body-medium` em `leading 1.75`):
   * (28 - 16) / 2 = 6px.
   */
  const iconOffset = 'mt-[6px]';

  const icon = [iconOffset, 'shrink-0', tokens.content].join(' ');

  const texts = 'flex min-w-0 flex-1 flex-col gap-[2px]';

  const title = [
    'block break-words text-pt-body-medium font-bold',
    tokens.content
  ].join(' ');

  const description =
    'block break-words text-pt-body-small text-pt-content-default';

  const close = [
    iconOffset,
    // `inline-flex` faz o botao ter a altura exata do icone, e nao a da linha.
    'inline-flex shrink-0 items-center cursor-pointer rounded-pt-1 border-0 bg-transparent p-0',
    'transition-opacity duration-200 ease-out hover:opacity-70',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus',
    tokens.content
  ].join(' ');

  return { container, icon, texts, title, description, close };
};
