import {
  buildFieldBareIconClasses,
  buildFieldMessageClasses,
  getFieldBorderClass,
  resolveFieldState
} from '../fieldState';
import type { PtInputProps } from './PtInput.interface';

export const buildInputClasses = (props: {
  disabled?: boolean;
  isValid?: boolean;
  hasIcon?: boolean;
  hasCounter?: boolean;
  hasSuccess?: boolean;
  className?: string;
}) => {
  const {
    disabled = false,
    isValid = true,
    hasIcon = false,
    hasCounter = false,
    hasSuccess = false,
    className
  } = props;

  const state = resolveFieldState({ disabled, isValid, hasSuccess });

  const wrapper = 'flex flex-col gap-pt-1';

  const label = [
    'font-pt-body text-pt-body-small',
    'text-pt-content-default'
  ].join(' ');

  const inputContainer = 'relative';

  const iconContainer = buildFieldBareIconClasses(state);

  const inputBase = [
    'h-pt-5 w-full rounded-pt-1 border bg-pt-surface-1 px-pt-2 text-pt-content-default',
    hasIcon ? 'pl-pt-5' : undefined,
    hasCounter ? 'pr-pt-5' : undefined,
    'outline-none transition-[border-color,box-shadow] duration-200 ease-in-out',
    'placeholder:text-pt-content-ghost',
    'focus:border-pt-focus focus:ring-2 focus:ring-pt-focus',
    disabled
      ? 'cursor-not-allowed bg-pt-surface-3 text-pt-content-disable'
      : undefined,
    getFieldBorderClass(state),
    className
  ]
    .filter(Boolean)
    .join(' ');

  const { messageInfo, messageDanger, messageSuccess } =
    buildFieldMessageClasses();

  const counterBase = [
    'pointer-events-none absolute right-pt-2 top-1/2 -translate-y-1/2',
    'text-pt-xs text-pt-content-ghost'
  ].join(' ');

  const counterWarn = [counterBase, 'text-pt-content-warning'].join(' ');
  const counterNegative = [counterBase, 'text-pt-content-negative'].join(' ');

  return {
    state,
    wrapper,
    label,
    inputContainer,
    iconContainer,
    input: inputBase,
    messageInfo,
    messageDanger,
    messageSuccess,
    counterBase,
    counterWarn,
    counterNegative
  };
};

export const getCounterClassName = (
  maxLength: number,
  charCount: number,
  classes: ReturnType<typeof buildInputClasses>
) => {
  const remaining = Math.max(0, maxLength - charCount);
  if (remaining === 0) return classes.counterNegative;
  if (remaining <= 3) return classes.counterWarn;
  return classes.counterBase;
};

export const resolveInputType = (type: PtInputProps['type']) =>
  type === 'datetime' ? 'datetime-local' : (type ?? 'text');
