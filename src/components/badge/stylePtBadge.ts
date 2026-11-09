import type {
  BadgeClassProps,
  PtBadgeSize,
  PtBadgeVariant
} from './PtBadge.interface';

const hasValue = (value: number | string | undefined) =>
  typeof value === 'number' || (typeof value === 'string' && value.length > 0);

export const formatBadgeValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return value > 99 ? '99+' : String(value);
  if (typeof value === 'string')
    return value.length > 4 ? `${value.slice(0, 4)}…` : value;
  return undefined;
};

const sizeClasses: Record<
  PtBadgeSize,
  {
    valueContainer: string;
    dotContainer: string;
    minWidth: string;
    text: string;
  }
> = {
  small: {
    valueContainer: 'h-[12px] px-[6px]',
    dotContainer: 'h-2.5 w-2.5 p-0',
    minWidth: 'min-w-2.5',
    text: 'text-pt-xs'
  },
  medium: {
    valueContainer: 'h-[16px] px-[8px]',
    dotContainer: 'h-3 w-3 p-0',
    minWidth: 'min-w-3',
    text: 'text-pt-sm'
  }
};

const variantClasses: Record<
  PtBadgeVariant,
  { container: string; ring: string; text: string }
> = {
  info: {
    container: 'bg-pt-info',
    ring: 'border-pt-info',
    text: 'text-pt-content-din'
  },
  system: {
    container: 'bg-pt-system',
    ring: 'border-pt-system',
    text: 'text-pt-content-bright'
  },
  warning: {
    container: 'bg-pt-warning',
    ring: 'border-pt-warning',
    text: 'text-pt-content-din'
  },
  positive: {
    container: 'bg-pt-positive',
    ring: 'border-pt-positive',
    text: 'text-pt-content-din'
  },
  negative: {
    container: 'bg-pt-negative',
    ring: 'border-pt-negative',
    text: 'text-pt-content-bright'
  }
};

export const buildBadgeClasses = (props: BadgeClassProps) => {
  const {
    variant = 'info',
    size = 'small',
    value,
    pulse = false,
    className
  } = props;

  const isDot = !hasValue(value);
  const variantConfig = variantClasses[variant];
  const sizeConfig = sizeClasses[size];

  const sizeContainer = isDot
    ? sizeConfig.dotContainer
    : sizeConfig.valueContainer;
  const text = isDot ? undefined : sizeConfig.text;

  const container = [
    'relative inline-flex items-center justify-center rounded-full whitespace-nowrap font-pt-body font-semibold',
    sizeContainer,
    sizeConfig.minWidth,
    variantConfig.container,
    isDot ? undefined : variantConfig.text,
    text,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const ring = [
    'pointer-events-none absolute inset-0 rounded-full border',
    variantConfig.ring,
    pulse ? 'animate-ping' : undefined
  ]
    .filter(Boolean)
    .join(' ');

  return { container, ring, isDot };
};
