<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch
} from 'vue';

import type {
  PtThemeContext,
  PtThemeMode,
  PtThemeProviderProps,
  PtThemeSetting
} from './PtThemeProvider.interface';
import {
  PT_THEME_ATTRIBUTE,
  buildThemeProviderClasses,
  resolveThemeMode,
  ptThemeContextKey,
  toggleThemeMode
} from './stylePtThemeProvider';
import { subscribeSystemTheme, useSystemThemeState } from './systemTheme';

defineOptions({ name: 'PtThemeProvider' });

const props = withDefaults(defineProps<PtThemeProviderProps>(), {
  theme: 'inherit',
  as: 'div',
  root: false,
  inline: false,
  className: ''
});

const emit = defineEmits<{
  'update:theme': [theme: PtThemeSetting];
  change: [theme: PtThemeMode];
}>();

defineSlots<{ default?: () => unknown }>();

const parent = inject(ptThemeContextKey, null);

/**
 * Tema escolhido por `setTheme`. Volta a `null` quando a prop muda, para que
 * o valor vindo de fora - inclusive por `v-model:theme` - tenha a palavra final.
 */
const localTheme = ref<PtThemeSetting | null>(null);

watch(
  () => props.theme,
  () => {
    localTheme.value = null;
  }
);

const theme = computed<PtThemeSetting>(() => localTheme.value ?? props.theme);

const systemThemeState = useSystemThemeState();
const systemTheme = computed<PtThemeMode | null>(() => systemThemeState.value);

const resolvedTheme = computed<PtThemeMode>(() =>
  resolveThemeMode(theme.value, {
    parentTheme: parent?.resolvedTheme.value ?? null,
    systemTheme: systemTheme.value
  })
);

const setTheme = (next: PtThemeSetting) => {
  localTheme.value = next;
  emit('update:theme', next);
};

const toggle = () => setTheme(toggleThemeMode(resolvedTheme.value));

watch(resolvedTheme, (mode) => emit('change', mode));

const context: PtThemeContext = {
  theme,
  resolvedTheme,
  systemTheme,
  setTheme,
  toggle
};

provide(ptThemeContextKey, context);

/** Guarda o valor original do `<html>` para restaurar ao desmontar. */
let documentThemeBackup: string | null = null;
let documentPatched = false;

const restoreDocumentTheme = () => {
  if (!documentPatched || typeof document === 'undefined') return;

  const root = document.documentElement;

  if (documentThemeBackup === null) root.removeAttribute(PT_THEME_ATTRIBUTE);
  else root.setAttribute(PT_THEME_ATTRIBUTE, documentThemeBackup);

  documentThemeBackup = null;
  documentPatched = false;
};

const applyDocumentTheme = () => {
  if (typeof document === 'undefined') return;

  if (!props.root) {
    restoreDocumentTheme();
    return;
  }

  const root = document.documentElement;

  if (!documentPatched) {
    documentThemeBackup = root.getAttribute(PT_THEME_ATTRIBUTE);
    documentPatched = true;
  }

  root.setAttribute(PT_THEME_ATTRIBUTE, resolvedTheme.value);
};

let releaseSystemTheme: (() => void) | null = null;

onMounted(() => {
  releaseSystemTheme = subscribeSystemTheme();

  applyDocumentTheme();
});

watch([resolvedTheme, () => props.root], applyDocumentTheme);

onBeforeUnmount(() => {
  releaseSystemTheme?.();
  releaseSystemTheme = null;

  restoreDocumentTheme();
});

const providerClasses = computed(
  () =>
    buildThemeProviderClasses({
      inline: props.inline,
      className: props.className
    }) || undefined
);

defineExpose({ theme, resolvedTheme, systemTheme, setTheme, toggle });
</script>

<template>
  <component
    :is="props.as"
    :class="providerClasses"
    :data-theme="resolvedTheme"
  >
    <slot />
  </component>
</template>
