<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faGear,
  faTriangleExclamation,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { computed, normalizeClass, useAttrs, useSlots } from 'vue';

import type { PtToastProps } from './PtToast.interface';
import {
  buildToastClasses,
  resolveToastIcon,
  resolveToastRole,
  PT_TOAST_DEFAULT_STATUS
} from './stylePtToast';
import PtIcon from '../../icon/PtIcon.vue';

defineOptions({ name: 'PtToast', inheritAttrs: false });

library.add(
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faGear,
  faTriangleExclamation,
  faXmark
);

const props = withDefaults(defineProps<PtToastProps>(), {
  title: '',
  description: '',
  status: PT_TOAST_DEFAULT_STATUS,
  icon: undefined,
  hideIcon: false,
  closable: true,
  closeAriaLabel: 'Fechar aviso',
  className: ''
});

const emit = defineEmits<{ close: [] }>();

defineSlots<{
  default?: () => unknown;
  action?: () => unknown;
}>();

const attrs = useAttrs();
const slots = useSlots();

const classes = computed(() =>
  buildToastClasses({ status: props.status, className: props.className })
);

const containerClass = computed(() =>
  normalizeClass([classes.value.container, attrs.class])
);

const containerStyle = computed(() => attrs.style);

const containerAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

const statusIcon = computed(() => props.icon ?? resolveToastIcon(props.status));

const semantics = computed(() => resolveToastRole(props.status));

const hasDescription = computed(() => Boolean(props.description));

const hasAction = computed(() => Boolean(slots.action));
</script>

<template>
  <div
    :class="containerClass"
    :style="containerStyle"
    :role="semantics.role"
    :aria-live="semantics.ariaLive"
    :data-pt-toast-status="props.status"
    v-bind="containerAttrs"
  >
    <PtIcon
      v-if="!props.hideIcon"
      :name="statusIcon"
      :size="3"
      :class="classes.icon"
      aria-hidden="true"
      data-pt-toast-icon
    />

    <div :class="classes.texts">
      <span :class="classes.title">{{ props.title }}</span>

      <span
        v-if="hasDescription"
        :class="classes.description"
        data-pt-toast-description
      >
        {{ props.description }}
      </span>

      <slot />

      <div v-if="hasAction" class="mt-pt-1 flex items-center gap-pt-1">
        <slot name="action" />
      </div>
    </div>

    <button
      v-if="props.closable"
      type="button"
      :class="classes.close"
      :aria-label="props.closeAriaLabel"
      data-pt-toast-close
      @click="emit('close')"
    >
      <PtIcon name="xmark" :size="3" aria-hidden="true" />
    </button>
  </div>
</template>
