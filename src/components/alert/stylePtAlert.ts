import type { AlertClassProps, PtAlertStatus } from './PtAlert.interface';
import { sizeWidthClasses } from '../../utils/spacingShorthand';

export const PT_ALERT_DEFAULT_STATUS: PtAlertStatus = 'info';

type AlertStatusTokens = {
  surface: string;
  border: string;
  content: string;
  icon: string;
};

const statusTokens: Record<PtAlertStatus, AlertStatusTokens> = {
  info: {
    surface: 'bg-pt-surface-info',
    border: 'border-pt-content-info',
    content: 'text-pt-content-info',
    icon: 'circle-info'
  },
  system: {
    surface: 'bg-pt-surface-system',
    border: 'border-pt-content-system',
    content: 'text-pt-content-system',
    icon: 'gear'
  },
  warning: {
    surface: 'bg-pt-surface-warning',
    border: 'border-pt-content-warning',
    content: 'text-pt-content-warning',
    icon: 'triangle-exclamation'
  },
  positive: {
    surface: 'bg-pt-surface-positive',
    border: 'border-pt-content-positive',
    content: 'text-pt-content-positive',
    icon: 'circle-check'
  },
  negative: {
    surface: 'bg-pt-surface-negative',
    border: 'border-pt-content-negative',
    content: 'text-pt-content-negative',
    icon: 'circle-xmark'
  }
};

/** Icone padrao de cada status. */
export const resolveAlertIcon = (
  status: PtAlertStatus = PT_ALERT_DEFAULT_STATUS
) => statusTokens[status].icon;

/**
 * Erros e avisos interrompem a leitura (`alert`); os demais ficam como
 * informacao da pagina (`status`), sem roubar a vez do leitor de tela.
 */
export const resolveAlertRole = (
  status: PtAlertStatus = PT_ALERT_DEFAULT_STATUS
): 'alert' | 'status' =>
  status === 'negative' || status === 'warning' ? 'alert' : 'status';

export const buildAlertClasses = (props: AlertClassProps) => {
  const {
    status = PT_ALERT_DEFAULT_STATUS,
    width = 'full',
    hasTitle = true,
    className
  } = props;

  const tokens = statusTokens[status];

  /**
   * Alerta fica no fluxo da pagina, entao nao tem sombra: a separacao vem da
   * superficie e da borda de 1px do status.
   */
  const container = [
    'flex max-w-full items-start gap-pt-1 rounded-pt-1 p-pt-2',
    'border border-solid font-pt-body',
    sizeWidthClasses[width],
    tokens.surface,
    tokens.border,
    className
  ]
    .filter(Boolean)
    .join(' ');

  /**
   * Icone e botao de fechar tem 16px e sao centralizados na primeira linha do
   * texto. Com titulo, a linha mede 28px (`text-pt-body-medium`, leading 1.75):
   * (28 - 16) / 2 = 6px. So com descricao, 21px (`text-pt-body-small`,
   * leading 1.5): (21 - 16) / 2 = 2.5px, arredondado para 3px.
   */
  const iconOffset = hasTitle ? 'mt-[6px]' : 'mt-[3px]';

  const icon = [iconOffset, 'shrink-0', tokens.content].join(' ');

  const texts = 'flex min-w-0 flex-1 flex-col gap-[2px]';

  const title = [
    'block break-words text-pt-body-medium font-bold',
    tokens.content
  ].join(' ');

  const description =
    'block break-words text-pt-body-small text-pt-content-default';

  const close = [
    iconOffset,
    'inline-flex shrink-0 items-center cursor-pointer rounded-pt-1 border-0 bg-transparent p-0',
    'transition-opacity duration-200 ease-out hover:opacity-70',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus',
    tokens.content
  ].join(' ');

  return { container, icon, texts, title, description, close };
};
