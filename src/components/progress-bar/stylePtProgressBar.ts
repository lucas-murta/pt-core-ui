import type {
  ProgressBarClassProps,
  PtProgressBarSize,
  PtProgressBarVariant
} from './PtProgressBar.interface';

export const PT_PROGRESS_BAR_MIN_PERCENT = 0;
export const PT_PROGRESS_BAR_MAX_PERCENT = 100;

export const clampProgressPercent = (percent: number | undefined) => {
  if (typeof percent !== 'number' || Number.isNaN(percent)) {
    return PT_PROGRESS_BAR_MIN_PERCENT;
  }

  if (percent < PT_PROGRESS_BAR_MIN_PERCENT) return PT_PROGRESS_BAR_MIN_PERCENT;
  if (percent > PT_PROGRESS_BAR_MAX_PERCENT) return PT_PROGRESS_BAR_MAX_PERCENT;

  return percent;
};

const sizeClasses: Record<
  PtProgressBarSize,
  { track: string; text: string; gap: string }
> = {
  small: {
    track: 'h-[4px]',
    text: 'text-pt-body-small',
    gap: 'gap-[4px]'
  },
  large: {
    track: 'h-[8px]',
    text: 'text-pt-body-medium',
    gap: 'gap-pt-1'
  }
};

const variantClasses: Record<PtProgressBarVariant, string> = {
  primary: 'bg-pt-primary',
  secondary: 'bg-pt-secondary',
  info: 'bg-pt-info',
  system: 'bg-pt-system',
  warning: 'bg-pt-warning',
  positive: 'bg-pt-positive',
  negative: 'bg-pt-negative'
};

export const buildProgressBarClasses = (props: ProgressBarClassProps) => {
  const { variant = 'primary', size = 'small', className } = props;

  const sizeConfig = sizeClasses[size];

  const container = ['flex w-full flex-col', sizeConfig.gap, className]
    .filter(Boolean)
    .join(' ');

  const track = [
    'relative w-full overflow-hidden rounded-full bg-pt-surface-2',
    sizeConfig.track
  ].join(' ');

  const fill = [
    'h-full rounded-full transition-[width] duration-300 ease-out',
    variantClasses[variant]
  ].join(' ');

  const text = ['font-pt-body text-pt-content-default', sizeConfig.text].join(
    ' '
  );

  return { container, track, fill, text };
};
