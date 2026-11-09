import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faCheck,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBan,
  faCheck,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faXmark
);

export type PtFieldState = 'default' | 'error' | 'success' | 'disabled';

const stateIcon: Record<PtFieldState, string | undefined> = {
  default: undefined,
  error: 'xmark',
  success: 'check',
  disabled: 'ban'
};

const stateBorder: Record<PtFieldState, string> = {
  default: 'border-pt-border-2',
  error: 'border-pt-negative',
  success: 'border-pt-positive',
  disabled: 'border-pt-border-2'
};

export const fieldMessageIcon = {
  info: 'circle-info',
  danger: 'circle-exclamation',
  success: 'circle-check'
} as const;

export const resolveFieldState = (props: {
  disabled?: boolean;
  isValid?: boolean;
  hasSuccess?: boolean;
}): PtFieldState => {
  if (props.disabled) return 'disabled';
  if (props.isValid === false) return 'error';
  if (props.hasSuccess) return 'success';
  return 'default';
};

export const resolveFieldIcon = (state: PtFieldState, icon?: string) =>
  stateIcon[state] ?? icon;

export const getFieldBorderClass = (state: PtFieldState) => stateBorder[state];

const stateIconColor: Record<PtFieldState, string> = {
  default: 'text-pt-secondary',
  error: 'text-pt-content-negative',
  success: 'text-pt-content-positive',
  disabled: 'text-pt-content-ghost'
};

export const buildFieldBareIconClasses = (state: PtFieldState) =>
  [
    'pointer-events-none absolute left-pt-xs top-1/2 flex -translate-y-1/2 items-center justify-center',
    stateIconColor[state]
  ].join(' ');

export const buildFieldMessageClasses = () => {
  const base = 'inline-flex items-center gap-pt-1 text-pt-xs';

  return {
    messageInfo: [base, 'text-pt-content-info'].join(' '),
    messageDanger: [base, 'text-pt-content-negative'].join(' '),
    messageSuccess: [base, 'text-pt-content-positive'].join(' ')
  };
};
