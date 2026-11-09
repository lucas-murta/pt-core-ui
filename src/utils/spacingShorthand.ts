import type { SizeValue } from '../types';

type ResponsivePrefix = 'sm' | 'md' | 'lg';
type SpacingRule = 'p' | 'm';

const toValueSuffix = (value: string) => {
  const resolved = value.trim();

  if (resolved === '0') return '0';
  if (resolved === 'auto') return 'auto';

  return `pt-${resolved}`;
};

export const sizeClassSuffixes: Record<SizeValue, string> = {
  auto: 'auto',
  full: 'full',
  'fit-content': 'fit',
  'min-content': 'min',
  'max-content': 'max',
  '1': 'pt-1',
  '2': 'pt-2',
  '3': 'pt-3',
  '4': 'pt-4',
  '5': 'pt-5',
  '6': 'pt-6',
  '7': 'pt-7',
  '8': 'pt-8',
  '9': 'pt-9',
  '10': 'pt-10',
  '11': 'pt-11',
  '12': 'pt-12',
  '16': 'pt-16',
  '20': 'pt-20',
  '24': 'pt-24',
  '32': 'pt-32',
  '40': 'pt-40',
  '48': 'pt-48',
  '56': 'pt-56',
  '64': 'pt-64',
  '72': 'pt-72',
  '80': 'pt-80',
  '96': 'pt-96',
  '128': 'pt-128',
  '144': 'pt-144',
  '160': 'pt-160',
  '168': 'pt-168',
  '240': 'pt-240'
};

export const createSizeClasses = (prefix: 'w' | 'h') =>
  Object.fromEntries(
    Object.entries(sizeClassSuffixes).map(([key, suffix]) => [
      key,
      `${prefix}-${suffix}`
    ])
  ) as Record<SizeValue, string>;

export const sizeWidthClasses = createSizeClasses('w');
export const sizeHeightClasses = createSizeClasses('h');

export const spacingShorthandToClasses = (
  value: string | undefined,
  rule: SpacingRule,
  responsivePrefix?: ResponsivePrefix
) => {
  if (!value) return [];

  const normalizedValue = value.trim();

  if (!normalizedValue) return [];

  const values = normalizedValue.split(/\s+/).map(toValueSuffix);
  const prefix = responsivePrefix ? `${responsivePrefix}:` : '';

  if (values.length === 1) return [`${prefix}${rule}-${values[0]}`];

  if (values.length === 2) {
    return [`${prefix}${rule}y-${values[0]}`, `${prefix}${rule}x-${values[1]}`];
  }

  if (values.length === 3) {
    return [
      `${prefix}${rule}t-${values[0]}`,
      `${prefix}${rule}x-${values[1]}`,
      `${prefix}${rule}b-${values[2]}`
    ];
  }

  return [
    `${prefix}${rule}t-${values[0]}`,
    `${prefix}${rule}r-${values[1]}`,
    `${prefix}${rule}b-${values[2]}`,
    `${prefix}${rule}l-${values[3]}`
  ];
};
