import type { PtCheckboxProps } from './PtCheckbox.interface';

export const buildCheckboxClasses = (props: PtCheckboxProps) => {
  const { disabled = false, className } = props;

  const wrapper = [
    'relative inline-flex items-center gap-pt-1 select-none text-pt-content-default',
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const input = 'pointer-events-none absolute m-0 h-px w-px opacity-0 peer';

  const control = [
    'inline-flex h-pt-2 w-pt-2 shrink-0 items-center justify-center rounded-[4px] border border-pt-border-1 bg-pt-surface-0',
    'transition-[border-color,box-shadow,background-color] duration-200 ease-in-out',
    'peer-focus-visible:border-pt-focus peer-focus-visible:ring-2 peer-focus-visible:ring-pt-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-pt-surface-0',
    'peer-checked:[&>span]:scale-100'
  ].join(' ');

  const mark = [
    'h-[8px] w-[5px] -translate-x-px -translate-y-px rotate-45 scale-0 border-b-[3px] border-r-[3px] border-current border-solid',
    'text-pt-content-primary transition-transform duration-150 ease-in-out'
  ].join(' ');

  const label = 'font-pt-body text-pt-body-small';

  return { wrapper, input, control, mark, label };
};
