const cssVar = (token: string) => `var(${token})`;

type TailwindPluginApi = {
  addUtilities: (utilities: Record<string, Record<string, string>>[]) => void;
  theme: (path: string) => unknown;
};

type ScaleValue = 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
type NeutralScaleValue =
  | ScaleValue
  | 50
  | 150
  | 250
  | 350
  | 450
  | 550
  | 650
  | 750
  | 850;

const toneScaleValues = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 950
] as const;
const neutralScaleValues = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
  800, 850, 900, 950
] as const;

const sizeScale = {
  'pt-xxs': '0.625rem',
  'pt-xs': '0.75rem',
  'pt-sm': '0.875rem',
  'pt-base': '1rem',
  'pt-md': '1.125rem',
  'pt-lg': '1.25rem',
  'pt-xl': '1.5rem',
  'pt-2xl': '1.875rem',
  'pt-3xl': '2.25rem',
  'pt-4xl': '3rem',
  'pt-5xl': '3.75rem',
  'pt-6xl': '4.5rem',
  'pt-7xl': '5rem'
} as const;

const spacingScale = {
  ...sizeScale,
  'pt-1': '8px',
  'pt-2': '16px',
  'pt-3': '24px',
  'pt-4': '32px',
  'pt-5': '40px',
  'pt-6': '48px',
  'pt-7': '56px',
  'pt-8': '64px',
  'pt-9': '72px',
  'pt-10': '80px',
  'pt-11': '88px',
  'pt-12': '96px',
  'pt-15': '120px',
  'pt-16': '128px',
  'pt-20': '160px',
  'pt-24': '192px',
  'pt-30': '240px',
  'pt-32': '256px',
  'pt-40': '320px',
  'pt-48': '384px',
  'pt-56': '448px',
  'pt-64': '512px',
  'pt-72': '584px',
  'pt-80': '640px',
  'pt-96': '768px',
  'pt-128': '1024px',
  'pt-144': '1152px',
  'pt-160': '1280px',
  'pt-168': '1344px',
  'pt-240': '1920px'
} as const;

const colorScalePrefixes = {
  'brand-primary': 'brand-primary',
  'brand-secondary': 'brand-secondary',
  crema: 'crema-color',
  info: 'info-color',
  system: 'system-color',
  positive: 'positive-color',
  attention: 'attention-color',
  negative: 'negative-color',
  blue: 'blue-color',
  ocean: 'ocean-color',
  green: 'green-color',
  yellow: 'yellow-color',
  orange: 'orange-color',
  red: 'red-color',
  pink: 'pink-color',
  purple: 'purple-color'
} as const;

const tokenObject = <const T extends Record<string, string>>(
  tokens: T
): { [K in keyof T]: string } =>
  Object.fromEntries(
    Object.entries(tokens).map(([key, token]) => [key, cssVar(token)])
  ) as { [K in keyof T]: string };

const scale = <const T extends readonly NeutralScaleValue[]>(
  prefix: string,
  values: T
): { [K in T[number]]: string } =>
  Object.fromEntries(
    values.map((value) => [value, cssVar(`--pt-${prefix}-${value}`)])
  ) as { [K in T[number]]: string };

const createScaleGroup = <
  const TPrefixes extends Record<string, string>,
  const TValues extends readonly ScaleValue[] = typeof toneScaleValues
>(
  prefixes: TPrefixes,
  values?: TValues
): { [K in keyof TPrefixes]: { [V in TValues[number]]: string } } => {
  const resolvedValues = (values ?? toneScaleValues) as TValues;

  return Object.fromEntries(
    Object.entries(prefixes).map(([key, prefix]) => [
      key,
      scale(prefix, resolvedValues)
    ])
  ) as { [K in keyof TPrefixes]: { [V in TValues[number]]: string } };
};

const textStyle = (
  fontSize: string,
  lineHeight: string,
  fontWeight: string,
  letterSpacing = '0'
) => [fontSize, { lineHeight, letterSpacing, fontWeight }] as const;

const createTextShadowUtilities = (shadows?: Record<string, string>) =>
  Object.entries(shadows ?? {}).map(([key, value]) => ({
    [`.text-shadow-${key}`]: {
      textShadow: value
    }
  }));

export const ptTailwindTheme = {
  colors: {
    ...tokenObject({
      'pt-brand': '--pt-color-brand',
      'pt-primary': '--pt-color-primary',
      'pt-secondary': '--pt-color-secondary',
      'pt-info': '--pt-color-info',
      'pt-system': '--pt-color-system',
      'pt-warning': '--pt-color-warning',
      'pt-positive': '--pt-color-positive',
      'pt-negative': '--pt-color-negative'
    }),
    'pt-surface': {
      ...tokenObject({
        0: '--pt-color-surface-0',
        1: '--pt-color-surface-1',
        2: '--pt-color-surface-2',
        3: '--pt-color-surface-3',
        4: '--pt-color-surface-4',
        primary: '--pt-color-surface-primary',
        secondary: '--pt-color-surface-secondary',
        info: '--pt-color-surface-info',
        system: '--pt-color-surface-system',
        warning: '--pt-color-surface-warning',
        positive: '--pt-color-surface-positive',
        negative: '--pt-color-surface-negative'
      }),
      shadow: tokenObject({
        0: '--pt-color-surface-shadow-0',
        1: '--pt-color-surface-shadow-1',
        2: '--pt-color-surface-shadow-2',
        3: '--pt-color-surface-shadow-3'
      })
    },
    'pt-content': tokenObject({
      default: '--pt-color-content-default',
      disable: '--pt-color-content-disable',
      ghost: '--pt-color-content-ghost',
      bright: '--pt-color-content-bright',
      din: '--pt-color-content-din',
      primary: '--pt-color-content-primary',
      secondary: '--pt-color-content-secondary',
      info: '--pt-color-content-info',
      system: '--pt-color-content-system',
      warning: '--pt-color-content-warning',
      positive: '--pt-color-content-positive',
      negative: '--pt-color-content-negative'
    }),
    'pt-border': tokenObject({
      1: '--pt-color-border-1',
      2: '--pt-color-border-2',
      3: '--pt-color-border-3'
    }),
    ...tokenObject({
      'pt-focus': '--pt-color-focus',
      'pt-pressed': '--pt-color-pressed',
      'pt-hover': '--pt-color-hover'
    }),
    pt: {
      ...createScaleGroup(colorScalePrefixes),
      neutral: {
        ...scale('neutral-color', neutralScaleValues),
        0: cssVar('--pt-neutral-color-0')
      },
      'neutral-tint': scale('neutral-tint-color', neutralScaleValues),
      ...createScaleGroup({
        'shadow-scale': 'shadow-scale',
        'light-scale': 'light-scale',
        'neutral-tint-bright-scale': 'neutral-tint-bright-scale',
        'neutral-tint-din-scale': 'neutral-tint-din-scale'
      })
    }
  },
  fontFamily: {
    'pt-heading': ['"Afacad"', 'sans-serif'],
    'pt-highlight': ['"Space Grotesk"', 'sans-serif'],
    'pt-body': ['"Space Grotesk"', 'sans-serif']
  },
  fontSize: {
    ...sizeScale,
    'pt-heading-1': textStyle('3rem', '1.1', '800'),
    'pt-heading-2': textStyle('2.25rem', '1.1', '800'),
    'pt-heading-3': textStyle('1.875rem', '1.25', '800'),
    'pt-heading-4': textStyle('1.5rem', '1.25', '800'),
    'pt-highlight-large': textStyle('1.5rem', '1.5', '800'),
    'pt-highlight-medium': textStyle('1.125rem', '1.5', '800'),
    'pt-body-large': textStyle('1.125rem', '1.75', '400'),
    'pt-body-medium': textStyle('1rem', '1.75', '400'),
    'pt-body-small': textStyle('0.875rem', '1.5', '400'),
    'pt-hero-title': textStyle('3rem', '1.5', '800')
  },
  lineHeight: {
    'pt-tight': '1.1',
    'pt-snug': '1.25',
    'pt-normal': '1.5',
    'pt-relaxed': '1.75',
    'pt-loose': '2'
  },
  letterSpacing: {
    'pt-tight': '-0.025em',
    'pt-normal': '0',
    'pt-wide': '0.025em',
    'pt-wider': '0.05em'
  },
  borderRadius: {
    'pt-1': '8px',
    'pt-2': '16px'
  },
  boxShadow: {
    'pt-paper-0': '0 0 0 0 transparent',
    'pt-paper-1':
      '0 1px 3px 0 var(--pt-color-shadow-0), 0 1px 2px 0 var(--pt-color-shadow-1)',
    'pt-paper-2':
      '0 4px 6px -1px var(--pt-color-shadow-0), 0 2px 4px -1px var(--pt-color-shadow-1)',
    'pt-paper-3':
      '0 10px 15px -3px var(--pt-color-shadow-0), 0 4px 6px -2px var(--pt-color-shadow-1)',
    'pt-paper-4':
      '0 20px 25px -5px var(--pt-color-shadow-0), 0 10px 10px -5px var(--pt-color-shadow-1)',
    'pt-action-hover': '0 0 16px 2px var(--pt-color-shadow-hover)',
    'pt-action-pressed': '0 0 16px 4px var(--pt-color-shadow-pressed)'
  },
  dropShadow: {
    'pt-action-hover': [
      '0 0 8px var(--pt-color-shadow-hover)',
      '0 0 16px var(--pt-color-shadow-hover)'
    ],
    'pt-action-pressed': [
      '0 0 16px var(--pt-color-shadow-pressed)',
      '0 0 24px var(--pt-color-shadow-pressed)'
    ]
  },
  spacing: spacingScale,
  textShadow: {
    'pt-small': '-1px 1px transparent, -2px 2px var(--pt-color-shadow-1)',
    'pt-medium': '-1px 1px transparent, -3px 3px var(--pt-color-shadow-1)',
    'pt-large': '-2px 2px transparent, -4px 4px var(--pt-color-shadow-1)',
    'pt-action-hover': '0 0 16px var(--pt-color-shadow-hover)',
    'pt-action-pressed': '0 0 16px var(--pt-color-shadow-pressed)'
  },
  keyframes: {
    'pt-loading-arrow': {
      '0%': { transform: 'translateX(-200%)' },
      '33%': { transform: 'translateX(0%)' },
      '66%': { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(200%)' }
    },
    'pt-s10-1': {
      '0%': {
        clipPath: 'polygon(50% 50%,0 0,50% 0%,50% 0%,50% 0%,50% 0%,50% 0%)'
      },
      '12.5%': {
        clipPath: 'polygon(50% 50%,0 0,50% 0%,100% 0%,100% 0%,100% 0%,100% 0%)'
      },
      '25%': {
        clipPath:
          'polygon(50% 50%,0 0,50% 0%,100% 0%,100% 100%,100% 100%,100% 100%)'
      },
      '50%': {
        clipPath:
          'polygon(50% 50%,0 0,50% 0%,100% 0%,100% 100%,50% 100%,0% 100%)'
      },
      '62.5%': {
        clipPath:
          'polygon(50% 50%,100% 0,100% 0%,100% 0%,100% 100%,50% 100%,0% 100%)'
      },
      '75%': {
        clipPath:
          'polygon(50% 50%,100% 100%,100% 100%,100% 100%,100% 100%,50% 100%,0% 100%)'
      },
      '100%': {
        clipPath:
          'polygon(50% 50%,50% 100%,50% 100%,50% 100%,50% 100%,50% 100%,0% 100%)'
      }
    },
    'pt-s10-2': {
      '0%': { transform: 'scaleY(1) rotate(0deg)' },
      '49.9%': { transform: 'scaleY(1) rotate(135deg)' },
      '50%': { transform: 'scaleY(-1) rotate(0deg)' },
      '100%': { transform: 'scaleY(-1) rotate(-135deg)' }
    }
  },
  animation: {
    'pt-loading-arrow': 'pt-loading-arrow 1.5s ease-in-out infinite',
    'pt-spinner-infinite':
      'pt-s10-1 0.8s infinite linear alternate, pt-s10-2 1.6s linear infinite'
  }
} as const;

export const ptTailwindPlugins = [
  function ({ addUtilities, theme }: TailwindPluginApi) {
    addUtilities(
      createTextShadowUtilities(
        theme('textShadow') as Record<string, string> | undefined
      )
    );
  }
];

export const ptCssTokenImport = '@pauta/pt-core-ui/tokens.css';
