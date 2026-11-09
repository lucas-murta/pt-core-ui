<script setup lang="ts">
import { computed, inject, normalizeClass, useAttrs } from 'vue';

import type { PtTabPanelProps } from '../tabs/PtTabs.interface';
import { buildTabPanelClasses, ptTabsContextKey } from '../tabs/stylePtTabs';

defineOptions({ name: 'PtTabPanel', inheritAttrs: false });

const props = withDefaults(defineProps<PtTabPanelProps>(), {
  keepAlive: false,
  className: ''
});

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const tabs = inject(ptTabsContextKey, null);

const isActive = computed(() => Boolean(tabs?.isActive(props.value)));

/** Sem `keepAlive` o painel inativo sai do DOM; com ele, so fica escondido. */
const shouldRender = computed(() => isActive.value || props.keepAlive);

const classes = computed(() =>
  buildTabPanelClasses({ className: props.className })
);

const panelClass = computed(() =>
  normalizeClass([classes.value.panel, attrs.class])
);

const panelStyle = computed(() => attrs.style);

const panelAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});
</script>

<template>
  <div
    v-if="shouldRender"
    :id="tabs?.panelId(props.value)"
    role="tabpanel"
    :class="panelClass"
    :style="panelStyle"
    :aria-labelledby="tabs?.tabId(props.value)"
    :hidden="!isActive"
    :tabindex="isActive ? 0 : undefined"
    :data-pt-tab-panel-value="props.value"
    v-bind="panelAttrs"
  >
    <slot />
  </div>
</template>
