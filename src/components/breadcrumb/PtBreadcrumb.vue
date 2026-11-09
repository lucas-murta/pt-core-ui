<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { computed, normalizeClass, useAttrs } from 'vue';

import type { PtBreadcrumbProps } from './PtBreadcrumb.interface';
import {
  buildBreadcrumbClasses,
  isBreadcrumbCurrent,
  shouldShowBreadcrumb,
  PT_BREADCRUMB_DEFAULT_MIN_ITEMS
} from './stylePtBreadcrumb';
import PtIcon from '../icon/PtIcon.vue';

defineOptions({ name: 'PtBreadcrumb', inheritAttrs: false });

library.add(faChevronRight);

const props = withDefaults(defineProps<PtBreadcrumbProps>(), {
  linkAs: 'a',
  minItems: PT_BREADCRUMB_DEFAULT_MIN_ITEMS,
  ariaLabel: 'Breadcrumb',
  className: ''
});

defineSlots<{
  separator?: () => unknown;
}>();

const attrs = useAttrs();

const classes = computed(() =>
  buildBreadcrumbClasses({ className: props.className })
);

const navClass = computed(() =>
  normalizeClass([classes.value.nav, attrs.class])
);

const navStyle = computed(() => attrs.style);

const navAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

const isVisible = computed(() =>
  shouldShowBreadcrumb(props.items, props.minItems)
);

const total = computed(() => props.items.length);

/** O ultimo nivel nunca vira link, mesmo com `href`: ele e a pagina atual. */
const isLink = (index: number, href?: string | null) =>
  Boolean(href) && !isBreadcrumbCurrent(index, total.value);
</script>

<template>
  <nav
    v-if="isVisible"
    :class="navClass"
    :style="navStyle"
    :aria-label="props.ariaLabel"
    v-bind="navAttrs"
  >
    <ol :class="classes.list">
      <li
        v-for="(item, index) in props.items"
        :key="`${item.label}-${index}`"
        :class="classes.item"
        data-pt-breadcrumb-item
      >
        <component
          :is="props.linkAs"
          v-if="isLink(index, item.href)"
          :href="item.href"
          :class="classes.link"
          :title="item.label"
          data-pt-breadcrumb-link
        >
          {{ item.label }}
        </component>
        <span
          v-else
          :class="
            isBreadcrumbCurrent(index, total) ? classes.current : classes.text
          "
          :aria-current="isBreadcrumbCurrent(index, total) ? 'page' : undefined"
          :title="item.label"
          data-pt-breadcrumb-text
        >
          {{ item.label }}
        </span>

        <span
          v-if="!isBreadcrumbCurrent(index, total)"
          :class="classes.separator"
          aria-hidden="true"
          data-pt-breadcrumb-separator
        >
          <slot name="separator">
            <PtIcon name="chevron-right" :size="1" />
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>
