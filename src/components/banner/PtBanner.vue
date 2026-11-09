<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { computed, normalizeClass, ref, useAttrs, useSlots, watch } from 'vue';

import type { PtBannerProps } from './PtBanner.interface';
import {
  buildBannerClasses,
  resolveBannerActionColor,
  resolveBannerRole,
  PT_BANNER_DEFAULT_STATUS
} from './stylePtBanner';
import PtButton from '../buttons/button/PtButton.vue';
import PtIcon from '../icon/PtIcon.vue';

defineOptions({ name: 'PtBanner', inheritAttrs: false });

library.add(faXmark);

const props = withDefaults(defineProps<PtBannerProps>(), {
  text: '',
  status: PT_BANNER_DEFAULT_STATUS,
  icon: undefined,
  actionLabel: undefined,
  closable: false,
  closeAriaLabel: 'Fechar banner',
  open: undefined,
  className: ''
});

const emit = defineEmits<{
  action: [event: MouseEvent];
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

const hasIcon = computed(() => Boolean(props.icon));

const hasActionSlot = computed(() => Boolean(slots.action));

const hasAction = computed(
  () => hasActionSlot.value || Boolean(props.actionLabel)
);

const classes = computed(() =>
  buildBannerClasses({
    status: props.status,
    hasIcon: hasIcon.value,
    hasAction: hasAction.value,
    closable: props.closable,
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

const role = computed(() => resolveBannerRole(props.status));

const actionColor = computed(() => resolveBannerActionColor(props.status));

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
    :data-pt-banner-status="props.status"
    v-bind="containerAttrs"
  >
    <span
      v-if="hasIcon"
      :class="classes.icon"
      aria-hidden="true"
      data-pt-banner-icon
    >
      <PtIcon :name="props.icon as string" :size="3" />
    </span>

    <span
      :class="classes.text"
      :title="props.text || undefined"
      data-pt-banner-text
    >
      <slot>{{ props.text }}</slot>
    </span>

    <slot v-if="hasActionSlot" name="action" />
    <PtButton
      v-else-if="props.actionLabel"
      size="small"
      :color="actionColor"
      :class-name="classes.action"
      data-pt-banner-action
      @click="emit('action', $event)"
    >
      {{ props.actionLabel }}
    </PtButton>

    <button
      v-if="props.closable"
      type="button"
      :class="classes.close"
      :aria-label="props.closeAriaLabel"
      data-pt-banner-close
      @click="onClose"
    >
      <PtIcon name="xmark" :size="3" aria-hidden="true" />
    </button>
  </div>
</template>
