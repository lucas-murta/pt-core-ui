import type { InjectionKey } from 'vue';

import type {
  PtTabsAlign,
  PtTabsColor,
  PtTabsContext,
  PtTabsIconPosition,
  PtTabsSize,
  PtTabsVariant,
  TabClassProps,
  TabsClassProps
} from './PtTabs.interface';
import type { PtIconSize } from '../../icon/PtIcon.interface';

export const ptTabsContextKey: InjectionKey<PtTabsContext> =
  Symbol('pt-tabs-context');

export const PT_TABS_DEFAULT_VARIANT: PtTabsVariant = 'underline';

export const PT_TABS_DEFAULT_SIZE: PtTabsSize = 'medium';

export const PT_TABS_DEFAULT_COLOR: PtTabsColor = 'primary';

export const PT_TABS_DEFAULT_ICON_POSITION: PtTabsIconPosition = 'start';

/** Teclas que movem o foco dentro da lista, no padrao ARIA de tabs. */
export const PT_TABS_NAV_KEYS = [
  'ArrowRight',
  'ArrowLeft',
  'Home',
  'End'
] as const;

/** Proximo indice habilitado, circulando nas pontas. */
export const resolveNextTabIndex = (
  current: number,
  total: number,
  key: string
) => {
  if (total <= 0) return -1;
  if (key === 'Home') return 0;
  if (key === 'End') return total - 1;

  const step = key === 'ArrowLeft' ? -1 : 1;
  const base = current < 0 ? 0 : current;

  return (base + step + total) % total;
};

type TabsSizeTokens = {
  tab: string;
  /** Altura livre e respiro vertical quando o icone fica acima do texto. */
  stackedTab: string;
  text: string;
  /** Texto menor no empilhado, para o rotulo nao disputar com o icone. */
  stackedText: string;
  icon: PtIconSize;
  /** Icone maior no empilhado, onde ele vira o destaque da aba. */
  stackedIcon: PtIconSize;
  gap: string;
};

const sizeTokens: Record<PtTabsSize, TabsSizeTokens> = {
  small: {
    tab: 'h-pt-4 px-pt-2',
    stackedTab: 'min-h-pt-4 px-pt-2 py-[4px]',
    text: 'text-pt-body-small',
    stackedText: 'text-pt-xxs',
    icon: 2,
    stackedIcon: 6,
    gap: 'gap-[6px]'
  },
  medium: {
    tab: 'h-pt-5 px-pt-2',
    stackedTab: 'min-h-pt-5 px-pt-2 py-pt-1',
    text: 'text-pt-body-medium',
    stackedText: 'text-pt-xs',
    icon: 3,
    stackedIcon: 6,
    gap: 'gap-pt-1'
  },
  large: {
    tab: 'h-pt-6 px-pt-3',
    stackedTab: 'min-h-pt-6 px-pt-3 py-pt-1',
    text: 'text-pt-body-large',
    stackedText: 'text-pt-sm',
    icon: 4,
    stackedIcon: 7,
    gap: 'gap-pt-1'
  }
};

export const resolveTabIconSize = (
  size: PtTabsSize = PT_TABS_DEFAULT_SIZE,
  iconPosition: PtTabsIconPosition = PT_TABS_DEFAULT_ICON_POSITION
): PtIconSize =>
  iconPosition === 'top' ? sizeTokens[size].stackedIcon : sizeTokens[size].icon;

const alignClasses: Record<PtTabsAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end'
};

/**
 * Cada variante declara a forma e os dois estados sem repetir o mesmo
 * utilitario: `bg-transparent` e `border-b-transparent` so aparecem no estado
 * que precisa deles. Emitir os dois na mesma classe deixaria a decisao para a
 * ordem do CSS gerado, e o destaque do ativo se perderia.
 */
const variantClasses: Record<
  PtTabsVariant,
  { shape: string; active: Record<PtTabsColor, string>; idle: string }
> = {
  underline: {
    shape: 'border-b-2 border-solid bg-transparent -mb-px',
    active: {
      primary: 'border-b-pt-primary text-pt-content-primary',
      secondary: 'border-b-pt-secondary text-pt-content-secondary'
    },
    idle: 'border-b-transparent text-pt-content-ghost'
  },
  pill: {
    shape: 'rounded-full',
    active: {
      primary: 'bg-pt-primary text-pt-content-bright',
      secondary: 'bg-pt-secondary text-pt-content-din'
    },
    idle: 'bg-transparent text-pt-content-ghost'
  }
};

export const buildTabsClasses = (props: TabsClassProps) => {
  const {
    variant = PT_TABS_DEFAULT_VARIANT,
    align = 'start',
    fullWidth = false,
    iconPosition = PT_TABS_DEFAULT_ICON_POSITION,
    className,
    listClassName
  } = props;

  const root = ['flex w-full flex-col font-pt-body', className]
    .filter(Boolean)
    .join(' ');

  /**
   * A lista rola na horizontal quando as abas nao cabem, entao muitas abas em
   * tela estreita nao quebram o layout.
   */
  /**
   * No empilhado as abas esticam ate a mais alta: uma aba so com icone, sem
   * rotulo, fica com a mesma altura das demais.
   */
  const listBase = [
    'flex w-full overflow-x-auto',
    iconPosition === 'top' ? 'items-stretch' : 'items-center',
    '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    fullWidth ? 'justify-stretch' : alignClasses[align]
  ].join(' ');

  /**
   * Trilho da pill em `surface-2`, e nao `surface-1`: no tema escuro e o tom
   * que mais separa a pilula ativa do fundo sem escurecer demais a barra.
   */
  const listVariant =
    variant === 'underline'
      ? 'border-b border-pt-border-2'
      : 'gap-[4px] rounded-full bg-pt-surface-2 p-[4px]';

  const list = [listBase, listVariant, listClassName].filter(Boolean).join(' ');

  return { root, list };
};

export const buildTabClasses = (props: TabClassProps) => {
  const {
    variant = PT_TABS_DEFAULT_VARIANT,
    size = PT_TABS_DEFAULT_SIZE,
    color = PT_TABS_DEFAULT_COLOR,
    active = false,
    disabled = false,
    fullWidth = false,
    iconPosition = PT_TABS_DEFAULT_ICON_POSITION,
    className
  } = props;

  const tokens = sizeTokens[size];

  const stacked = iconPosition === 'top';

  const tokensVariant = variantClasses[variant];

  const base = [
    'relative inline-flex shrink-0 items-center justify-center whitespace-nowrap',
    'm-0 font-semibold',
    'transition-colors duration-200 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-pt-surface-0',
    stacked ? 'flex-col' : undefined,
    stacked ? tokens.stackedTab : tokens.tab,
    stacked ? tokens.stackedText : tokens.text,
    stacked ? 'gap-[4px]' : tokens.gap,
    fullWidth ? 'flex-1' : undefined,
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  ]
    .filter(Boolean)
    .join(' ');

  const idleHover = disabled
    ? undefined
    : variant === 'underline'
      ? 'hover:text-pt-content-default'
      : 'hover:bg-pt-surface-2 hover:text-pt-content-default';

  const state = active
    ? tokensVariant.active[color]
    : [tokensVariant.idle, idleHover].filter(Boolean).join(' ');

  const tab = [base, tokensVariant.shape, state, className]
    .filter(Boolean)
    .join(' ');

  /** O icone fica sempre em `content-secondary`, em qualquer disposicao e estado. */
  const icon = 'shrink-0 text-pt-content-secondary';

  return { tab, icon };
};

export const buildTabPanelClasses = (props: { className?: string }) =>
  ({
    panel: [
      'w-full pt-pt-2 font-pt-body text-pt-content-default',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus',
      props.className
    ]
      .filter(Boolean)
      .join(' ')
  }) as const;
