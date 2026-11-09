import type { OptionClassProps } from './PtOption.interface';

export const buildOptionClasses = (props: OptionClassProps) => {
  const { selected = false, className } = props;

  const option = [
    'relative m-0 flex cursor-pointer appearance-none items-center justify-start gap-pt-1 overflow-hidden rounded-pt-1 border-0 p-pt-1 text-left font-pt-body text-pt-body-small text-pt-content-default select-none',
    'transition-colors duration-200 ease-in-out',
    selected
      ? 'bg-pt-surface-1 hover:bg-pt-surface-2 active:bg-pt-surface-1'
      : 'hover:bg-pt-surface-2 active:bg-pt-surface-1',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-pt-surface-0',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const startAdornment = 'inline-flex shrink-0 text-pt-content-primary';
  const content = 'min-w-0 flex-1';
  const endAdornment = 'inline-flex shrink-0 text-pt-content-primary';

  return { option, startAdornment, content, endAdornment };
};
