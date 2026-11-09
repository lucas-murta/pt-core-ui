import type { BannerClassProps, PtBannerStatus } from './PtBanner.interface';
import type { ButtonColor } from '../buttons/button/PtButton.interface';

export const PT_BANNER_DEFAULT_STATUS: PtBannerStatus = 'info';

type BannerStatusTokens = {
  surface: string;
  content: string;
  /** Circulo do icone, com as cores invertidas de novo: volta ao par do alerta. */
  iconBadge: string;
  action: ButtonColor;
};

/**
 * Cores invertidas em relacao ao `PtAlert`: o fundo e o `content` do status e
 * a frase usa a `surface`, entao o banner chama mais atencao sem borda.
 *
 * `action` escolhe a cor do `PtButton` que combina com o status. Os status sem
 * cor propria no botao (`info`, `system`, `warning`) usam o `primary`.
 */
const statusTokens: Record<PtBannerStatus, BannerStatusTokens> = {
  info: {
    surface: 'bg-pt-content-info',
    content: 'text-pt-surface-info',
    iconBadge: 'bg-pt-surface-info text-pt-content-info',
    action: 'primary'
  },
  system: {
    surface: 'bg-pt-content-system',
    content: 'text-pt-surface-system',
    iconBadge: 'bg-pt-surface-system text-pt-content-system',
    action: 'primary'
  },
  warning: {
    surface: 'bg-pt-content-warning',
    content: 'text-pt-surface-warning',
    iconBadge: 'bg-pt-surface-warning text-pt-content-warning',
    action: 'primary'
  },
  positive: {
    surface: 'bg-pt-content-positive',
    content: 'text-pt-surface-positive',
    iconBadge: 'bg-pt-surface-positive text-pt-content-positive',
    action: 'positive'
  },
  negative: {
    surface: 'bg-pt-content-negative',
    content: 'text-pt-surface-negative',
    iconBadge: 'bg-pt-surface-negative text-pt-content-negative',
    action: 'negative'
  },
  primary: {
    surface: 'bg-pt-content-primary',
    content: 'text-pt-surface-primary',
    iconBadge: 'bg-pt-surface-primary text-pt-content-primary',
    action: 'primary'
  },
  secondary: {
    surface: 'bg-pt-content-secondary',
    content: 'text-pt-surface-secondary',
    iconBadge: 'bg-pt-surface-secondary text-pt-content-secondary',
    action: 'secondary'
  }
};

/** Cor do `PtButton` de acao para o status. */
export const resolveBannerActionColor = (
  status: PtBannerStatus = PT_BANNER_DEFAULT_STATUS
): ButtonColor => statusTokens[status].action;

/** Erros e avisos interrompem a leitura (`alert`); os demais sao `status`. */
export const resolveBannerRole = (
  status: PtBannerStatus = PT_BANNER_DEFAULT_STATUS
): 'alert' | 'status' =>
  status === 'negative' || status === 'warning' ? 'alert' : 'status';

export const buildBannerClasses = (props: BannerClassProps) => {
  const {
    status = PT_BANNER_DEFAULT_STATUS,
    hasIcon = false,
    hasAction = false,
    closable = false,
    className
  } = props;

  const tokens = statusTokens[status];

  /**
   * Pill que cresce na horizontal com a frase (`w-fit`), ate a largura do
   * container (`max-w-full`). A altura minima de 40px acomoda o `PtButton`
   * `small` (28px) com 6px de respiro; o lado que termina em botao ou icone
   * encolhe o padding para a borda da pill abracar o elemento.
   */
  const container = [
    'inline-flex w-fit max-w-full min-h-pt-5 items-center gap-pt-1 rounded-full',
    'py-[6px] font-pt-body',
    hasIcon ? 'pl-[6px]' : 'pl-pt-2',
    hasAction || closable ? 'pr-[6px]' : 'pr-pt-2',
    tokens.surface,
    className
  ]
    .filter(Boolean)
    .join(' ');

  /** Circulo de 28px, a mesma altura do `PtButton` `small` e do fechar. */
  const icon = [
    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
    tokens.iconBadge
  ].join(' ');

  /** Uma frase, em uma linha: o que passar da largura vira reticencias. */
  const text = [
    'min-w-0 flex-1 truncate text-pt-body-small font-semibold',
    tokens.content
  ].join(' ');

  /**
   * O `PtButton` ja traz `rounded-pt-1`; o `!` garante a pill sem depender da
   * ordem do CSS gerado entre os dois utilitarios de raio.
   */
  const action = 'shrink-0 !rounded-full';

  const close = [
    'inline-flex h-7 w-7 shrink-0 items-center justify-center cursor-pointer rounded-full border-0 bg-transparent p-0',
    'transition-opacity duration-200 ease-out hover:opacity-70',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus',
    tokens.content
  ].join(' ');

  return { container, icon, text, action, close };
};
