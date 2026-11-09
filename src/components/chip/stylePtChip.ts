import type { ChipClassProps, PtChipVariant } from './PtChip.interface';

const variantClasses: Record<PtChipVariant, string> = {
  primary:
    'bg-pt-content-primary border-pt-content-primary text-pt-surface-primary',
  secondary:
    'bg-pt-content-secondary border-pt-content-secondary text-pt-surface-secondary',
  info: 'bg-pt-content-info border-pt-content-info text-pt-surface-info',
  system:
    'bg-pt-content-system border-pt-content-system text-pt-surface-system',
  warning:
    'bg-pt-content-warning border-pt-content-warning text-pt-surface-warning',
  positive:
    'bg-pt-content-positive border-pt-content-positive text-pt-surface-positive',
  negative:
    'bg-pt-content-negative border-pt-content-negative text-pt-surface-negative'
};

export const buildChipClasses = (props: ChipClassProps) => {
  const { variant = 'primary', clickable = false, className } = props;

  const container = [
    'inline-flex h-pt-3 items-center gap-pt-1 rounded-pt-1 border border-transparent px-pt-1',
    'whitespace-nowrap font-pt-body text-pt-xs font-semibold',
    variantClasses[variant],
    clickable
      ? [
          'relative cursor-pointer select-none overflow-hidden',
          'transition-opacity duration-200 ease-in-out',
          'hover:opacity-90 active:opacity-80',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-pt-surface-0'
        ].join(' ')
      : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const closeButton = [
    'inline-flex items-center justify-center rounded-full bg-transparent p-0 text-current',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-pt-surface-0'
  ].join(' ');

  return { container, closeButton };
};
