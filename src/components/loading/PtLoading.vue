<script setup lang="ts">
import { computed } from 'vue';

import type {
  PtLoadingProps,
  PtLoadingSize,
  PtLoadingVariant
} from './PtLoading.interface';
import { buildPtLoadingClasses } from './stylePtLoading';

defineOptions({ name: 'PtLoading' });

const props = withDefaults(defineProps<PtLoadingProps>(), {
  type: 'arrow',
  variant: 'primary',
  size: '8',
  value: 0,
  className: ''
});

const classes = computed(() =>
  buildPtLoadingClasses({
    type: props.type,
    variant: props.variant,
    size: props.size,
    className: props.className
  })
);

const arrowColorByVariant: Record<PtLoadingVariant, string> = {
  primary: 'var(--pt-color-content-bright)',
  secondary: 'var(--pt-color-primary)',
  tertiary: 'var(--pt-color-content-bright)'
};

const animatedAccentColor = 'var(--pt-color-content-bright)';

const backgroundColorByVariant: Record<PtLoadingVariant, string> = {
  primary: 'var(--pt-brand-primary-600)',
  secondary: 'var(--pt-brand-secondary-500)',
  tertiary: 'var(--pt-brand-primary-700)'
};

const showArrow = computed(() => props.size !== '3' || props.type === 'arrow');

const contentStyle = computed(() => ({
  backgroundColor: backgroundColorByVariant[props.variant]
}));

const accentStyle = computed(() => ({
  color: arrowColorByVariant[props.variant]
}));

const animatedAccentStyle = computed(() => ({
  color: animatedAccentColor
}));

const cyclicalValue = computed(() => {
  const raw = props.value ?? 0;
  if (raw < 0) return 0;
  if (raw > 100) return 100;
  return raw;
});

const cyclicalRadius = 46;
const cyclicalCircumference = 2 * Math.PI * cyclicalRadius;
const cyclicalOffset = computed(
  () => cyclicalCircumference * (1 - cyclicalValue.value / 100)
);

const viewBoxBySize: Record<PtLoadingSize, string> = {
  '3': '0 0 24 24',
  '4': '0 0 24 24',
  '6': '0 0 24 24',
  '8': '0 0 24 24'
};
</script>

<template>
  <span
    :class="classes.content"
    :style="contentStyle"
    role="status"
    aria-busy="true"
    aria-live="polite"
  >
    <svg
      v-if="showArrow"
      :class="classes.arrow"
      :viewBox="viewBoxBySize[props.size]"
      :style="accentStyle"
      :data-variant="props.variant"
      data-loading-arrow
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7.2 3.6C5.7 2.7 4 3.8 4 5.5v13c0 1.7 1.7 2.8 3.2 1.9l11.7-7.1c1.3-.8 1.3-2.2 0-3L7.2 3.6Z"
      />
    </svg>

    <span
      v-if="props.type === 'spinner'"
      :class="classes.spinner"
      :style="animatedAccentStyle"
      data-loading-spinner
      aria-hidden="true"
    />

    <svg
      v-else-if="props.type === 'cyclical'"
      :class="classes.cyclical"
      viewBox="0 0 100 100"
      data-loading-cyclical
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        :r="cyclicalRadius"
        fill="none"
        :stroke="animatedAccentColor"
        stroke-width="4"
        stroke-linecap="round"
        :stroke-dasharray="cyclicalCircumference"
        :stroke-dashoffset="cyclicalOffset"
        class="transition-[stroke-dashoffset] duration-200 ease-linear"
      />
    </svg>
  </span>
</template>
