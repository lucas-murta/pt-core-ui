<script setup lang="ts">
import { computed } from 'vue';

import { useCheckableControl } from '../../../composables/useCheckableControl';
import PtIcon from '../../icon/PtIcon.vue';
import type { PtSwitchProps } from './PtSwitch.interface';
import { buildSwitchClasses } from './stylePtSwitch';

defineOptions({ name: 'PtSwitch', inheritAttrs: false });

const props = withDefaults(defineProps<PtSwitchProps>(), {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  label: undefined,
  iconOff: undefined,
  iconOn: undefined,
  className: ''
});

const emit = defineEmits<{
  'update:checked': [checked: boolean];
  change: [event: Event];
}>();

const { attrs, checkedValue, hasLabel, inputAttrs, handleChange } =
  useCheckableControl(props, {
    updateChecked: (checked) => emit('update:checked', checked),
    change: (event) => emit('change', event)
  });

const classes = computed(() => buildSwitchClasses(props));
const wrapperClass = computed(() =>
  [classes.value.wrapper, attrs.class].filter(Boolean).join(' ')
);
const wrapperStyle = computed(() => attrs.style);
</script>

<template>
  <label :class="wrapperClass" :style="wrapperStyle">
    <input
      type="checkbox"
      role="switch"
      :class="classes.input"
      :disabled="props.disabled"
      :checked="checkedValue"
      :aria-checked="checkedValue ? 'true' : 'false'"
      v-bind="inputAttrs"
      @change="handleChange"
    />
    <span :class="classes.track" aria-hidden="true">
      <span
        v-if="props.iconOff"
        :class="classes.iconOff"
        aria-hidden="true"
        data-switch-icon-off
      >
        <PtIcon :name="props.iconOff" :size="2" aria-hidden="true" />
      </span>
      <span
        v-if="props.iconOn"
        :class="classes.iconOn"
        aria-hidden="true"
        data-switch-icon-on
      >
        <PtIcon :name="props.iconOn" :size="2" aria-hidden="true" />
      </span>
      <span :class="classes.thumb" data-switch-thumb />
    </span>
    <span v-if="hasLabel" :class="classes.label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
