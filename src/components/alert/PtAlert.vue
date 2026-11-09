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
import { computed, normalizeClass, ref, useAttrs, useSlots, watch } from 'vue';

import type { PtAlertProps } from './PtAlert.interface';
import {
  buildAlertClasses,
  resolveAlertIcon,
  resolveAlertRole,
  PT_ALERT_DEFAULT_STATUS
} from './stylePtAlert';
import PtIcon from '../icon/PtIcon.vue';

defineOptions({ name: 'PtAlert', inheritAttrs: false });

library.add(
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faGear,
  faTriangleExclamation,
  faXmark
);

const props = withDefaults(defineProps<PtAlertProps>(), {
  title: '',
  description: '',
  status: PT_ALERT_DEFAULT_STATUS,
  icon: undefined,
  hideIcon: false,
  closable: false,
  closeAriaLabel: 'Fechar alerta',
  open: undefined,
  width: 'full',
  className: ''
});

const emit = defineEmits<{
  close: [];
  'update:open': [value: boolean];
}>();

defineSlots<{
  default?: () => unknown;
  action?: () => unknown;
}>();

const attrs = useAttrs();
const slots = useSlots();

const internalOpen = ref(props.open ?? true);

watch(
  () => props.open,
  (value) => {
    if (value !== undefined) internalOpen.value = value;
  }
);

const isOpen = computed(() => props.open ?? internalOpen.value);

const classes = computed(() =>
  buildAlertClasses({
    status: props.status,
    width: props.width,
    hasTitle: Boolean(props.title),
    className: props.className
  })
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

const statusIcon = computed(() => props.icon ?? resolveAlertIcon(props.status));

const role = computed(() => resolveAlertRole(props.status));

const hasTitle = computed(() => Boolean(props.title));

const hasDescription = computed(() => Boolean(props.description));

const hasAction = computed(() => Boolean(slots.action));

const onClose = () => {
  internalOpen.value = false;
  emit('update:open', false);
  emit('close');
};
</script>

<template>
  <div
    v-if="isOpen"
    :class="containerClass"
    :style="containerStyle"
    :role="role"
    :data-pt-alert-status="props.status"
    v-bind="containerAttrs"
  >
    <PtIcon
      v-if="!props.hideIcon"
      :name="statusIcon"
      :size="3"
      :class="classes.icon"
      aria-hidden="true"
      data-pt-alert-icon
    />

    <div :class="classes.texts">
      <span v-if="hasTitle" :class="classes.title" data-pt-alert-title>
        {{ props.title }}
      </span>

      <span
        v-if="hasDescription"
        :class="classes.description"
        data-pt-alert-description
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
      data-pt-alert-close
      @click="onClose"
    >
      <PtIcon name="xmark" :size="3" aria-hidden="true" />
    </button>
  </div>
</template>
