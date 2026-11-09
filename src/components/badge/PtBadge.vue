<script setup lang="ts">
import { computed } from 'vue';

import type { PtBadgeSize, PtBadgeVariant } from './PtBadge.interface';
import { buildBadgeClasses, formatBadgeValue } from './stylePtBadge';

const props = withDefaults(
  defineProps<{
    variant?: PtBadgeVariant;
    size?: PtBadgeSize;
    value?: number | string;
    pulse?: boolean;
    className?: string;
  }>(),
  {
    variant: 'info',
    size: 'small',
    pulse: false,
    className: ''
  }
);

const hasValue = computed(
  () => typeof props.value === 'number' || !!props.value
);
const displayValue = computed(() => formatBadgeValue(props.value));
const classes = computed(() => buildBadgeClasses(props));
</script>

<template>
  <span :class="classes.container" v-bind="$attrs">
    <span :class="classes.ring" aria-hidden="true" />
    <span v-if="hasValue">{{ displayValue }}</span>
  </span>
</template>
