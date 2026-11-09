import type {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextAlign,
  TypographyClassProps,
  TypographyVariant
} from './PtTypography.interface';

const variantClasses: Record<TypographyVariant, string> = {
  'heading-1': 'font-pt-heading text-pt-heading-1 text-shadow-pt-large',
  'heading-2': 'font-pt-heading text-pt-heading-2 text-shadow-pt-medium',
  'heading-3': 'font-pt-heading text-pt-heading-3 text-shadow-pt-small',
  'heading-4': 'font-pt-heading text-pt-heading-4 text-shadow-pt-small',
  'highlight-large':
    'font-pt-highlight text-pt-highlight-large text-shadow-pt-small',
  'highlight-medium':
    'font-pt-highlight text-pt-highlight-medium text-shadow-pt-small',
  'body-large': 'font-pt-body text-pt-body-large',
  'body-medium': 'font-pt-body text-pt-body-medium',
  'body-small': 'font-pt-body text-pt-body-small',
  'hero-title': 'font-pt-heading text-pt-hero-title text-shadow-pt-large'
};

const sizeClasses: Record<FontSize, string> = {
  1: 'text-pt-xs',
  2: 'text-pt-sm',
  3: 'text-pt-base',
  4: 'text-pt-md',
  5: 'text-pt-lg',
  6: 'text-pt-xl',
  7: 'text-pt-2xl',
  8: 'text-pt-3xl',
  9: 'text-pt-4xl',
  10: 'text-pt-5xl',
  11: 'text-pt-6xl',
  12: 'text-pt-7xl'
};

const weightClasses: Record<FontWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black'
};

const familyClasses: Record<FontFamily, string> = {
  body: 'font-pt-body',
  heading: 'font-pt-heading',
  highlight: 'font-pt-highlight',
  display: 'font-pt-highlight'
};

const lineHeightClasses: Record<LineHeight, string> = {
  tight: 'leading-pt-tight',
  snug: 'leading-pt-snug',
  normal: 'leading-pt-normal',
  relaxed: 'leading-pt-relaxed',
  loose: 'leading-pt-loose'
};

const letterSpacingClasses: Record<LetterSpacing, string> = {
  tighter: 'tracking-pt-tight',
  tight: 'tracking-pt-tight',
  normal: 'tracking-pt-normal',
  wide: 'tracking-pt-wide',
  wider: 'tracking-pt-wider',
  widest: 'tracking-pt-wider'
};

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
};

const clampClasses: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [line-clamp:1]',
  2: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [line-clamp:2]',
  3: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [line-clamp:3]',
  4: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] [line-clamp:4]',
  5: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] [line-clamp:5]',
  6: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] [line-clamp:6]'
};

const normalizeClamp = (
  value: number | undefined
): 1 | 2 | 3 | 4 | 5 | 6 | undefined => {
  if (!value) return undefined;
  if (value <= 1) return 1;
  if (value === 2) return 2;
  if (value === 3) return 3;
  if (value === 4) return 4;
  if (value === 5) return 5;
  return 6;
};

export const buildTypographyClasses = (props: TypographyClassProps) => {
  const {
    variant = 'body-medium',
    size,
    weight,
    family,
    lineHeight,
    letterSpacing,
    align,
    italic = false,
    underline = false,
    strikethrough = false,
    uppercase = false,
    lowercase = false,
    capitalize = false,
    truncate = false,
    maxLines,
    className
  } = props;

  const clamp = normalizeClamp(maxLines);

  const heroTitleEffectClasses = [
    'text-pt-content-secondary relative pr-1',
    '[text-shadow:none]',
    'bg-[linear-gradient(140deg,transparent_45%,var(--pt-bright-scale-700)_45%,var(--pt-bright-scale-700)_65%,transparent_65%),linear-gradient(0deg,var(--pt-color-content-secondary)_0%,var(--pt-color-content-secondary)_100%)] bg-blend-soft-light',
    'bg-clip-text text-transparent',
    'drop-shadow-[-4px_4px_0px_var(--pt-color-shadow-1)]'
  ]
    .filter(Boolean)
    .join(' ');

  const base = [
    'm-0 p-0 text-pt-content-default',
    variantClasses[variant],
    size ? sizeClasses[size] : undefined,
    weight ? weightClasses[weight] : undefined,
    family ? familyClasses[family] : undefined,
    lineHeight ? lineHeightClasses[lineHeight] : undefined,
    letterSpacing ? letterSpacingClasses[letterSpacing] : undefined,
    align ? alignClasses[align] : undefined,
    italic ? 'italic' : undefined,
    underline ? 'underline' : undefined,
    strikethrough ? 'line-through' : undefined,
    uppercase ? 'uppercase' : undefined,
    lowercase ? 'lowercase' : undefined,
    capitalize ? 'capitalize' : undefined,
    truncate ? 'truncate' : undefined,
    clamp ? clampClasses[clamp] : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return {
    base,
    heroTitleEffectClasses
  };
};
