import type { PtTooltipPlacement } from '../tooltip/PtTooltip.interface';

export type PtStepperOrientation = 'horizontal' | 'vertical';

export type PtStepperSize = 'small' | 'medium';

export type PtStepperVariant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'system'
  | 'warning'
  | 'positive'
  | 'negative';

export type PtStepperState = 'completed' | 'active' | 'upcoming';

export type PtStepperTone = 'variant' | 'muted' | 'idle';

export interface PtStepperStep {
  /** Titulo exibido ao lado (vertical) ou abaixo (horizontal) do bullet. */
  title: string;
  /** Texto de apoio: tooltip na horizontal e texto corrido na vertical. */
  description?: string;
  /** Conteudo do bullet; sobrescreve a posicao numerica. */
  label?: string;
  /** Icone do bullet (nome aceito pelo `PtIcon`); tem prioridade sobre `label`. */
  icon?: string;
  /** Cor de feedback exclusiva do passo (ex.: `negative` para erro). */
  variant?: PtStepperVariant;
  /** Bloqueia a selecao do passo. */
  disabled?: boolean;
}

export interface StepperClassProps {
  orientation?: PtStepperOrientation;
  className?: string;
}

export interface StepperStepClassProps {
  orientation?: PtStepperOrientation;
  size?: PtStepperSize;
  tone: PtStepperTone;
  variant?: PtStepperVariant;
  interactive?: boolean;
  disabled?: boolean;
  clampDescription?: boolean;
  stepClassName?: string;
}

export interface PtStepperProps extends StepperClassProps {
  /** Passos renderizados na ordem informada. */
  steps: PtStepperStep[];
  /** Indice do passo ativo (`v-model`), iniciando em `0`. */
  modelValue?: number;
  /** Cor de feedback do passo ativo. */
  variant?: PtStepperVariant;
  /** Orientacao do stepper. */
  orientation?: PtStepperOrientation;
  /** Escala do bullet e das fontes. */
  size?: PtStepperSize;
  /** `false` deixa o stepper apenas visual, sem navegacao nem status. */
  interactive?: boolean;
  /** Icone exibido nos passos concluidos; `''` mantem a posicao numerica. */
  completedIcon?: string;
  /**
   * Corta a descricao com reticencias em vez de deixa-la crescer: uma linha
   * na vertical, onde ela e texto corrido, e duas no tooltip da horizontal.
   * Use quando a altura do stepper precisa ser previsivel.
   */
  clampDescription?: boolean;
  /** Posicao do tooltip de descricao na orientacao horizontal. */
  tooltipPlacement?: PtTooltipPlacement;
  /** Rotulo do grupo de passos. */
  ariaLabel?: string;
  /** Classes extras em cada passo. */
  stepClassName?: string;
}

export interface PtStepperBulletContent {
  icon?: string;
  label?: string;
}

export interface PtStepperRenderStep extends PtStepperStep {
  index: number;
  position: number;
  state: PtStepperState;
  tone: PtStepperTone;
  isCurrent: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSelectable: boolean;
  hasTooltip: boolean;
  hasInlineDescription: boolean;
  bulletIcon?: string;
  bulletLabel?: string;
  leadingDone: boolean;
  trailingDone: boolean;
}
