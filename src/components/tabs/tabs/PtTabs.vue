<script setup lang="ts">
import {
  computed,
  normalizeClass,
  provide,
  reactive,
  ref,
  useAttrs,
  useId,
  watch
} from 'vue';

import type {
  PtTabsContext,
  PtTabsProps,
  PtTabValue
} from './PtTabs.interface';
import {
  buildTabsClasses,
  resolveNextTabIndex,
  ptTabsContextKey,
  PT_TABS_DEFAULT_COLOR,
  PT_TABS_DEFAULT_ICON_POSITION,
  PT_TABS_DEFAULT_SIZE,
  PT_TABS_DEFAULT_VARIANT,
  PT_TABS_NAV_KEYS
} from './stylePtTabs';

defineOptions({ name: 'PtTabs', inheritAttrs: false });

const props = withDefaults(defineProps<PtTabsProps>(), {
  modelValue: undefined,
  variant: PT_TABS_DEFAULT_VARIANT,
  size: PT_TABS_DEFAULT_SIZE,
  color: PT_TABS_DEFAULT_COLOR,
  align: 'start',
  fullWidth: false,
  iconPosition: PT_TABS_DEFAULT_ICON_POSITION,
  disabled: false,
  ariaLabel: 'Abas',
  className: '',
  listClassName: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: PtTabValue];
  change: [value: PtTabValue];
}>();

defineSlots<{
  tabs?: () => unknown;
  default?: () => unknown;
}>();

const attrs = useAttrs();
const generatedId = useId();

const listRef = ref<HTMLDivElement | null>(null);

const internalValue = ref<PtTabValue | undefined>(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    internalValue.value = value;
  }
);

const activeValue = computed(() => internalValue.value);

const isActive = (value: PtTabValue) => activeValue.value === value;

const select = (value: PtTabValue) => {
  if (props.disabled || value === activeValue.value) return;

  internalValue.value = value;

  emit('update:modelValue', value);
  emit('change', value);
};

const tabId = (value: PtTabValue) => `${generatedId}-tab-${value}`;

const panelId = (value: PtTabValue) => `${generatedId}-panel-${value}`;

const context = reactive<PtTabsContext>({
  activeValue: activeValue.value,
  variant: props.variant,
  size: props.size,
  color: props.color,
  fullWidth: props.fullWidth,
  iconPosition: props.iconPosition,
  disabled: props.disabled,
  isActive,
  select,
  tabId,
  panelId
});

watch(
  () =>
    [
      activeValue.value,
      props.variant,
      props.size,
      props.color,
      props.fullWidth,
      props.iconPosition,
      props.disabled
    ] as const,
  ([value, variant, size, color, fullWidth, iconPosition, disabled]) => {
    context.activeValue = value;
    context.variant = variant;
    context.size = size;
    context.color = color;
    context.fullWidth = fullWidth;
    context.iconPosition = iconPosition;
    context.disabled = disabled;
  }
);

provide(ptTabsContextKey, context);

/**
 * Navegacao por teclado do padrao ARIA: setas circulam entre as abas
 * habilitadas, `Home`/`End` vao para as pontas. A lista e lida direto do DOM,
 * entao a ordem e sempre a ordem visual.
 */
const onKeydown = (event: KeyboardEvent) => {
  if (!PT_TABS_NAV_KEYS.includes(event.key as never)) return;
  if (props.disabled || !listRef.value) return;

  const tabs = Array.from(
    listRef.value.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled])'
    )
  );

  if (tabs.length === 0) return;

  const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
  const next = resolveNextTabIndex(current, tabs.length, event.key);

  if (next < 0) return;

  event.preventDefault();
  tabs[next].focus();
  tabs[next].click();
};

const classes = computed(() =>
  buildTabsClasses({
    variant: props.variant,
    size: props.size,
    align: props.align,
    fullWidth: props.fullWidth,
    iconPosition: props.iconPosition,
    className: props.className,
    listClassName: props.listClassName
  })
);

const rootClass = computed(() =>
  normalizeClass([classes.value.root, attrs.class])
);

const rootStyle = computed(() => attrs.style);

const rootAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

defineExpose({ activeValue, select });
</script>

<template>
  <div :class="rootClass" :style="rootStyle" data-pt-tabs v-bind="rootAttrs">
    <div
      ref="listRef"
      :class="classes.list"
      role="tablist"
      :aria-label="props.ariaLabel"
      aria-orientation="horizontal"
      data-pt-tabs-list
      @keydown="onKeydown"
    >
      <slot name="tabs" />
    </div>

    <slot />
  </div>
</template>
