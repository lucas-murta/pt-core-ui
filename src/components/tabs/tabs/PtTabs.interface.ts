export type PtTabValue = string | number;

export type PtTabsVariant = 'underline' | 'pill';

export type PtTabsSize = 'small' | 'medium' | 'large';

export type PtTabsColor = 'primary' | 'secondary';

export type PtTabsAlign = 'start' | 'center' | 'end';

export type PtTabsIconPosition = 'start' | 'top';

export interface TabsClassProps {
  variant?: PtTabsVariant;
  size?: PtTabsSize;
  align?: PtTabsAlign;
  fullWidth?: boolean;
  iconPosition?: PtTabsIconPosition;
  className?: string;
  listClassName?: string;
}

export interface PtTabsProps extends TabsClassProps {
  /** Aba ativa (`v-model`). */
  modelValue?: PtTabValue;
  /** Estilo da lista de abas. */
  variant?: PtTabsVariant;
  /** Escala das abas. */
  size?: PtTabsSize;
  /** Cor de destaque da aba ativa. */
  color?: PtTabsColor;
  /** Alinhamento da lista quando as abas nao ocupam toda a largura. */
  align?: PtTabsAlign;
  /** Distribui as abas igualmente na largura disponivel. */
  fullWidth?: boolean;
  /** Posicao do icone em relacao ao texto: ao lado (`start`) ou acima (`top`). */
  iconPosition?: PtTabsIconPosition;
  /** Bloqueia todas as abas. */
  disabled?: boolean;
  /** Rotulo da lista de abas. */
  ariaLabel?: string;
  /** Classes extras no container. */
  className?: string;
  /** Classes extras na lista de abas. */
  listClassName?: string;
}

export interface TabClassProps {
  variant?: PtTabsVariant;
  size?: PtTabsSize;
  color?: PtTabsColor;
  active?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconPosition?: PtTabsIconPosition;
  className?: string;
}

export interface PtTabProps {
  /** Identidade da aba; casa com o `value` do `PtTabPanel`. */
  value: PtTabValue;
  /** Texto da aba; o slot padrao tem prioridade. */
  label?: string;
  /** Icone opcional ao lado ou acima do texto, conforme `iconPosition`. */
  icon?: string;
  /** Bloqueia esta aba. */
  disabled?: boolean;
  /** Classes extras na aba. */
  className?: string;
}

export interface PtTabPanelProps {
  /** Identidade do painel; casa com o `value` do `PtTab`. */
  value: PtTabValue;
  /** Mantem o painel montado quando inativo, apenas escondido. */
  keepAlive?: boolean;
  /** Classes extras no painel. */
  className?: string;
}

export interface PtTabsContext {
  activeValue: PtTabValue | undefined;
  variant: PtTabsVariant;
  size: PtTabsSize;
  color: PtTabsColor;
  fullWidth: boolean;
  iconPosition: PtTabsIconPosition;
  disabled: boolean;
  isActive: (value: PtTabValue) => boolean;
  select: (value: PtTabValue) => void;
  tabId: (value: PtTabValue) => string;
  panelId: (value: PtTabValue) => string;
}
