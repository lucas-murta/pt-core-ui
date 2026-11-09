<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { computed, normalizeClass, ref, useAttrs, watch } from 'vue';

import type {
  PtStepperProps,
  PtStepperRenderStep,
  PtStepperStep
} from './PtStepper.interface';
import {
  buildStepperClasses,
  buildStepperStepClasses,
  clampStepIndex,
  resolveStepBulletContent,
  resolveStepperIconSize,
  resolveStepState,
  resolveStepTone,
  PT_STEPPER_COMPLETED_ICON,
  PT_STEPPER_FIRST_INDEX
} from './stylePtStepper';
import PtIcon from '../icon/PtIcon.vue';
import PtTooltip from '../tooltip/PtTooltip.vue';

defineOptions({ name: 'PtStepper', inheritAttrs: false });

library.add(faCheck);

const props = withDefaults(defineProps<PtStepperProps>(), {
  steps: () => [],
  modelValue: PT_STEPPER_FIRST_INDEX,
  variant: 'primary',
  orientation: 'horizontal',
  size: 'medium',
  interactive: true,
  completedIcon: PT_STEPPER_COMPLETED_ICON,
  clampDescription: false,
  tooltipPlacement: 'top',
  ariaLabel: 'Progresso das etapas',
  className: '',
  stepClassName: ''
});

const emit = defineEmits<{
  'update:modelValue': [index: number];
  change: [index: number, step: PtStepperStep | undefined];
  'step-click': [index: number, step: PtStepperStep];
}>();

const attrs = useAttrs();

const isHorizontal = computed(() => props.orientation === 'horizontal');

const total = computed(() => props.steps.length);

const internalIndex = ref(clampStepIndex(props.modelValue, props.steps.length));

const activeIndex = computed(() =>
  clampStepIndex(internalIndex.value, total.value)
);

const activeStep = computed<PtStepperStep | undefined>(
  () => props.steps[activeIndex.value]
);

const canGoPrev = computed(
  () => props.interactive && activeIndex.value > PT_STEPPER_FIRST_INDEX
);

const canGoNext = computed(
  () => props.interactive && activeIndex.value < total.value - 1
);

const iconSize = computed(() => resolveStepperIconSize(props.size));

const classes = computed(() =>
  buildStepperClasses({
    orientation: props.orientation,
    className: props.className
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

type RenderStep = PtStepperRenderStep & {
  element: 'button' | 'div';
  classes: ReturnType<typeof buildStepperStepClasses>;
};

const renderSteps = computed<RenderStep[]>(() =>
  props.steps.map((step, index) => {
    const state = resolveStepState(index, activeIndex.value);
    const tone = resolveStepTone(state, !!step.variant, props.interactive);
    const isSelectable = props.interactive && !step.disabled;
    const hasDescription = !!step.description;
    const bullet = resolveStepBulletContent({
      step,
      state,
      position: index + 1,
      size: props.size,
      interactive: props.interactive,
      completedIcon: props.completedIcon
    });

    return {
      ...step,
      index,
      position: index + 1,
      state,
      tone,
      isCurrent: props.interactive && state === 'active',
      isFirst: index === PT_STEPPER_FIRST_INDEX,
      isLast: index === total.value - 1,
      isSelectable,
      hasTooltip: isHorizontal.value && hasDescription,
      hasInlineDescription: !isHorizontal.value && hasDescription,
      bulletIcon: bullet.icon,
      bulletLabel: bullet.label,
      leadingDone: props.interactive && activeIndex.value >= index,
      trailingDone: props.interactive && activeIndex.value >= index + 1,
      element: isSelectable ? 'button' : 'div',
      classes: buildStepperStepClasses({
        orientation: props.orientation,
        size: props.size,
        tone,
        variant: step.variant ?? props.variant,
        interactive: props.interactive,
        disabled: step.disabled,
        clampDescription: props.clampDescription,
        stepClassName: props.stepClassName
      })
    };
  })
);

const connectorClass = (step: RenderStep, edge: 'leading' | 'trailing') => {
  const base =
    edge === 'leading'
      ? step.classes.connectorLeading
      : step.classes.connectorTrailing;
  const done = edge === 'leading' ? step.leadingDone : step.trailingDone;

  return [
    base,
    done ? step.classes.connectorDone : step.classes.connectorPending
  ].join(' ');
};

const goTo = (index: number) => {
  if (!props.interactive || total.value === 0) return activeIndex.value;

  const next = clampStepIndex(index, total.value);

  if (props.steps[next]?.disabled || next === activeIndex.value) {
    return activeIndex.value;
  }

  internalIndex.value = next;

  emit('update:modelValue', next);
  emit('change', next, props.steps[next]);

  return next;
};

const next = () => goTo(activeIndex.value + 1);

const prev = () => goTo(activeIndex.value - 1);

const reset = () => goTo(PT_STEPPER_FIRST_INDEX);

const onStepClick = (step: RenderStep) => {
  if (!step.isSelectable) return;

  emit('step-click', step.index, props.steps[step.index]);
  goTo(step.index);
};

watch(
  () => props.modelValue,
  (value) => {
    const clamped = clampStepIndex(value, total.value);

    if (clamped === activeIndex.value) return;

    internalIndex.value = clamped;
  }
);

watch(total, (count) => {
  internalIndex.value = clampStepIndex(internalIndex.value, count);
});

defineExpose({
  activeIndex,
  activeStep,
  total,
  canGoNext,
  canGoPrev,
  goTo,
  next,
  prev,
  reset
});
</script>

<template>
  <ol
    v-if="renderSteps.length > 0"
    :class="rootClass"
    :style="rootStyle"
    role="list"
    :aria-label="props.ariaLabel"
    v-bind="rootAttrs"
  >
    <li
      v-for="step in renderSteps"
      :key="step.index"
      :class="step.classes.item"
      :aria-current="step.isCurrent ? 'step' : undefined"
      :data-pt-step-state="step.state"
    >
      <span
        v-if="isHorizontal && !step.isFirst"
        :class="connectorClass(step, 'leading')"
        aria-hidden="true"
      />
      <span
        v-if="!step.isLast"
        :class="connectorClass(step, 'trailing')"
        aria-hidden="true"
      />

      <PtTooltip
        :data-pt-step-tooltip="step.index"
        :class="step.classes.tooltipRoot"
        :panel-class-name="step.classes.tooltipPanel"
        :placement="props.tooltipPlacement"
        :disabled="!step.hasTooltip"
        :trigger-props="{ className: step.classes.trigger }"
      >
        <template #trigger>
          <component
            :is="step.element"
            :class="step.classes.content"
            :type="step.element === 'button' ? 'button' : undefined"
            :tabindex="
              step.element === 'div' && step.hasTooltip ? 0 : undefined
            "
            @click="onStepClick(step)"
          >
            <span :class="step.classes.bullet" data-pt-step-bullet>
              <PtIcon
                v-if="step.bulletIcon"
                :name="step.bulletIcon"
                :size="iconSize"
                aria-hidden="true"
              />
              <template v-else-if="step.bulletLabel">
                {{ step.bulletLabel }}
              </template>
            </span>

            <span :class="step.classes.texts">
              <span :class="step.classes.title">{{ step.title }}</span>
              <span
                v-if="step.hasInlineDescription"
                :class="step.classes.description"
                data-pt-step-description
              >
                {{ step.description }}
              </span>
            </span>
          </component>
        </template>

        {{ step.description }}
      </PtTooltip>
    </li>
  </ol>
</template>
