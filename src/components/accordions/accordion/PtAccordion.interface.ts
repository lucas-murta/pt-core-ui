export type PtAccordionSize = 'small' | 'medium' | 'large';

export type PtAccordionSurface =
  | 'transparent'
  | 'surface-0'
  | 'surface-1'
  | 'surface-2'
  | 'surface-3'
  | 'surface-4'
  | 'surface-primary'
  | 'surface-secondary'
  | 'surface-info'
  | 'surface-system'
  | 'surface-warning'
  | 'surface-positive'
  | 'surface-negative';

export type PtAccordionValue = string | number;

export interface AccordionClassProps {
  size?: PtAccordionSize;
  headerSurface?: PtAccordionSurface;
  contentSurface?: PtAccordionSurface;
  open?: boolean;
  disabled?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export interface PtAccordionProps {
  /** Titulo do cabecalho; o slot `title` tem prioridade. */
  title?: string;
  /** Icone opcional a esquerda do titulo (nome aceito pelo `PtIcon`). */
  icon?: string;
  /** Identidade do item dentro de um `PtAccordionGroup`. */
  value?: PtAccordionValue;
  /** Estado aberto (`v-model`). Sem ele o item controla o proprio estado. */
  modelValue?: boolean;
  /** Abre o item na montagem quando nao ha `modelValue`. */
  defaultOpen?: boolean;
  /** Bloqueia a abertura e o fechamento. */
  disabled?: boolean;
  /** Escala do item; por padrao herda do grupo. */
  size?: PtAccordionSize;
  /** Superficie do cabecalho; por padrao herda do grupo. */
  headerSurface?: PtAccordionSurface;
  /** Superficie da area expansivel; por padrao herda do grupo. */
  contentSurface?: PtAccordionSurface;
  /** Icone indicador de expansao. */
  expandIcon?: string;
  /** Remove o icone indicador de expansao. */
  hideExpandIcon?: boolean;
  /** Classes extras no container. */
  className?: string;
  /** Classes extras no cabecalho. */
  headerClassName?: string;
  /** Classes extras na area expansivel. */
  contentClassName?: string;
}

export interface PtAccordionContext {
  multiple: boolean;
  size?: PtAccordionSize;
  headerSurface?: PtAccordionSurface;
  contentSurface?: PtAccordionSurface;
  disabled: boolean;
  isOpen: (value: PtAccordionValue) => boolean;
  toggle: (value: PtAccordionValue) => void;
  requestDefaultOpen: (value: PtAccordionValue) => void;
}
