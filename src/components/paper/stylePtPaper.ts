import type {
  PaperBorder,
  PaperBorderRadius,
  PaperClassProps,
  PaperElevation,
  PaperVariant
} from './PtPaper.interface';
import {
  sizeHeightClasses,
  sizeWidthClasses,
  spacingShorthandToClasses
} from '../../utils/spacingShorthand';

const variantClasses: Record<PaperVariant, string> = {
  'surface-0': 'bg-pt-surface-0',
  'surface-1': 'bg-pt-surface-1',
  'surface-2': 'bg-pt-surface-2',
  'surface-3': 'bg-pt-surface-3',
  'surface-4': 'bg-pt-surface-4',
  'surface-info': 'bg-pt-surface-info',
  'surface-system': 'bg-pt-surface-system',
  'surface-warning': 'bg-pt-surface-warning',
  'surface-positive': 'bg-pt-surface-positive',
  'surface-negative': 'bg-pt-surface-negative',
  'surface-primary': 'bg-pt-surface-primary',
  'surface-secondary': 'bg-pt-surface-secondary'
};

const borderClasses: Record<PaperBorder, string> = {
  none: 'border-0',
  '1': 'border border-pt-border-1',
  '2': 'border border-pt-border-2',
  '3': 'border border-pt-border-3',
  primary: 'border border-pt-primary',
  secondary: 'border border-pt-secondary',
  info: 'border border-pt-content-info',
  system: 'border border-pt-content-system',
  warning: 'border border-pt-content-warning',
  positive: 'border border-pt-content-positive',
  negative: 'border border-pt-content-negative'
};

const borderRadiusClasses: Record<PaperBorderRadius, string> = {
  none: 'rounded-none',
  '1': 'rounded-pt-1',
  '2': 'rounded-pt-2'
};

const elevationClasses: Record<PaperElevation, string> = {
  0: 'shadow-pt-paper-0',
  1: 'shadow-pt-paper-1',
  2: 'shadow-pt-paper-2',
  3: 'shadow-pt-paper-3',
  4: 'shadow-pt-paper-4'
};

const hoverElevationClasses: Record<Exclude<PaperElevation, 4>, string> = {
  0: 'hover:shadow-pt-paper-1',
  1: 'hover:shadow-pt-paper-2',
  2: 'hover:shadow-pt-paper-3',
  3: 'hover:shadow-pt-paper-4'
};

export const buildPaperStyle = (props: Pick<PaperClassProps, 'bgImage'>) => {
  const { bgImage } = props;

  if (!bgImage) return undefined;

  return {
    backgroundImage: `url(${bgImage})`
  } satisfies Record<string, string>;
};

export const buildPaperClasses = (props: PaperClassProps) => {
  const {
    variant = 'surface-1',
    border = 'none',
    borderRadius = '1',
    elevation = 1,
    interactive = false,
    bgImage,
    width,
    height,
    padding,
    paddingSm,
    paddingMd,
    paddingLg,
    margin,
    marginSm,
    marginMd,
    marginLg,
    className
  } = props;

  return [
    'relative block transition-all duration-200 ease-in-out',
    variantClasses[variant],
    borderClasses[border],
    borderRadiusClasses[borderRadius],
    elevationClasses[elevation],
    bgImage ? 'bg-cover bg-center bg-no-repeat' : undefined,
    interactive ? 'cursor-pointer active:translate-y-px' : undefined,
    interactive && elevation !== 4
      ? hoverElevationClasses[elevation]
      : undefined,
    width ? sizeWidthClasses[width] : undefined,
    height ? sizeHeightClasses[height] : undefined,
    ...spacingShorthandToClasses(padding, 'p'),
    ...spacingShorthandToClasses(paddingSm, 'p', 'sm'),
    ...spacingShorthandToClasses(paddingMd, 'p', 'md'),
    ...spacingShorthandToClasses(paddingLg, 'p', 'lg'),
    ...spacingShorthandToClasses(margin, 'm'),
    ...spacingShorthandToClasses(marginSm, 'm', 'sm'),
    ...spacingShorthandToClasses(marginMd, 'm', 'md'),
    ...spacingShorthandToClasses(marginLg, 'm', 'lg'),
    className
  ]
    .filter(Boolean)
    .join(' ');
};
