import type { InjectionKey } from 'vue';

import type {
  PtRadioGroupContext,
  PtRadioGroupOrientation,
  PtRadioGroupProps
} from './PtRadioGroup.interface';

export const radioGroupContextKey: InjectionKey<PtRadioGroupContext> =
  Symbol('PtRadioGroup');

export const buildRadioGroupClasses = (
  props: Pick<PtRadioGroupProps, 'orientation' | 'dense' | 'className'>
) => {
  const { orientation = 'vertical', dense = false, className } = props;

  const base = 'flex';
  const orientationClasses: Record<PtRadioGroupOrientation, string> = {
    vertical: 'flex-col items-start gap-pt-2',
    horizontal: 'flex-row flex-wrap items-center gap-pt-3'
  };

  return [
    base,
    orientationClasses[orientation],
    dense ? 'gap-pt-1' : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ');
};
