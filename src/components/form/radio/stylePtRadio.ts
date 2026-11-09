import type { RadioClassProps } from './PtRadio.interface';

export const buildRadioClasses = (props: RadioClassProps) => {
  const { disabled = false, className } = props;

  const wrapper = [
    'inline-flex items-center gap-pt-1 select-none text-pt-content-default',
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const input = 'pointer-events-none absolute m-0 h-px w-px opacity-0 peer';

  const control = [
    'inline-flex h-pt-2 w-pt-2 items-center justify-center rounded-full border border-pt-border-2 bg-pt-surface-0',
    'transition-[border-color,box-shadow,background-color] duration-200 ease-in-out',
    'peer-focus-visible:border-pt-focus peer-focus-visible:ring-2 peer-focus-visible:ring-pt-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-pt-surface-0',
    'peer-checked:[&>span]:scale-100'
  ].join(' ');

  const dot = [
    'h-pt-1 w-pt-1 scale-0 rounded-full bg-pt-content-primary',
    'transition-transform duration-150 ease-in-out'
  ].join(' ');

  const label = 'font-pt-body text-pt-body-small';

  return { wrapper, input, control, dot, label };
};
