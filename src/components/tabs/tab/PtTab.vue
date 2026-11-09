<script setup lang="ts">
import { computed, inject, normalizeClass, useAttrs, useSlots } from 'vue';

import type { PtTabProps } from '../tabs/PtTabs.interface';
import {
  buildTabClasses,
  resolveTabIconSize,
  ptTabsContextKey
} from '../tabs/stylePtTabs';
import PtIcon from '../../icon/PtIcon.vue';

defineOptions({ name: 'PtTab', inheritAttrs: false });

const props = withDefaults(defineProps<PtTabProps>(), {
  label: '',
  icon: undefined,
  disabled: false,
  className: ''
});

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();

const tabs = inject(ptTabsContextKey, null);

const isActive = computed(() => Boolean(tabs?.isActive(props.value)));

const isDisabled = computed(() => props.disabled || Boolean(tabs?.disabled));

const iconSize = computed(() =>
  resolveTabIconSize(tabs?.size, tabs?.iconPosition)
);

const classes = computed(() =>
  buildTabClasses({
    variant: tabs?.variant,
    size: tabs?.size,
    color: tabs?.color,
    active: isActive.value,
    disabled: isDisabled.value,
    fullWidth: tabs?.fullWidth,
    iconPosition: tabs?.iconPosition,
    className: props.className
  })
);

const tabClass = computed(() =>
  normalizeClass([classes.value.tab, attrs.class])
);

const tabStyle = computed(() => attrs.style);

const tabAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

const hasContent = computed(
  () => Boolean(slots.default) || Boolean(props.label)
);

const onClick = () => {
  if (isDisabled.value) return;

  tabs?.select(props.value);
};
</script>

<template>
  <button
    type="button"
    role="tab"
    :id="tabs?.tabId(props.value)"
    :class="tabClass"
    :style="tabStyle"
    :disabled="isDisabled"
    :aria-selected="isActive"
    :aria-controls="tabs?.panelId(props.value)"
    :tabindex="isActive ? 0 : -1"
    :data-pt-tab-value="props.value"
    :data-pt-tab-active="isActive"
    v-bind="tabAttrs"
    @click="onClick"
  >
    <PtIcon
      v-if="props.icon"
      :name="props.icon"
      :size="iconSize"
      :class="classes.icon"
      aria-hidden="true"
      data-pt-tab-icon
    />

    <span v-if="hasContent">
      <slot>{{ props.label }}</slot>
    </span>
  </button>
</template>
