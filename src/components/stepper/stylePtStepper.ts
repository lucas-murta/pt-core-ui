import type {
  StepperClassProps,
  StepperStepClassProps,
  PtStepperBulletContent,
  PtStepperOrientation,
  PtStepperSize,
  PtStepperState,
  PtStepperStep,
  PtStepperTone,
  PtStepperVariant
} from './PtStepper.interface';
import type { PtIconSize } from '../icon/PtIcon.interface';

export const PT_STEPPER_FIRST_INDEX = 0;

export const PT_STEPPER_COMPLETED_ICON = 'check';

export const clampStepIndex = (index: number | undefined, total: number) => {
  if (total <= 0) return PT_STEPPER_FIRST_INDEX;

  if (typeof index !== 'number' || Number.isNaN(index)) {
    return PT_STEPPER_FIRST_INDEX;
  }

  const rounded = Math.trunc(index);

  if (rounded < PT_STEPPER_FIRST_INDEX) return PT_STEPPER_FIRST_INDEX;
  if (rounded > total - 1) return total - 1;

  return rounded;
};

export const resolveStepState = (
  index: number,
  activeIndex: number
): PtStepperState => {
  if (index < activeIndex) return 'completed';
  if (index === activeIndex) return 'active';

  return 'upcoming';
};

export const resolveStepTone = (
  state: PtStepperState,
  hasOwnVariant = false,
  interactive = true
): PtStepperTone => {
  if (!interactive || hasOwnVariant || state === 'active') return 'variant';
  if (state === 'completed') return 'muted';

  return 'idle';
};

export const resolveStepBulletContent = (args: {
  step: PtStepperStep;
  state: PtStepperState;
  position: number;
  size?: PtStepperSize;
  interactive?: boolean;
  completedIcon?: string;
}): PtStepperBulletContent => {
  const {
    step,
    state,
    position,
    size = 'medium',
    interactive = true,
    completedIcon = PT_STEPPER_COMPLETED_ICON
  } = args;

  if (size === 'small') return {};

  if (step.icon) return { icon: step.icon };

  if (interactive && state === 'completed' && completedIcon) {
    return { icon: completedIcon };
  }

  if (step.label) return { label: step.label };

  return { label: String(position) };
};

type StepperSizeTokens = {
  bullet: string;
  icon: PtIconSize;
  text: string;
  horizontalGap: string;
  verticalGap: string;
  verticalStepGap: string;
  verticalTextGap: string;
  verticalBulletOffset: string;
  verticalTextOffset: string;
  connectorHorizontal: string;
  connectorVertical: string;
};

const sizeTokens: Record<PtStepperSize, StepperSizeTokens> = {
  small: {
    bullet: 'h-pt-1 w-pt-1',
    icon: 2,
    text: 'text-pt-xs',
    horizontalGap: 'gap-[4px]',
    verticalGap: 'gap-pt-1',
    verticalStepGap: 'pb-pt-1',
    verticalTextGap: 'gap-[2px]',
    verticalBulletOffset: 'mt-[5px]',
    verticalTextOffset: 'pt-0',
    connectorHorizontal: 'top-[3px]',
    connectorVertical: 'bottom-[-5px] left-[3px] top-[13px]'
  },
  medium: {
    bullet: 'h-pt-4 w-pt-4',
    icon: 3,
    text: 'text-pt-base',
    horizontalGap: 'gap-pt-1',
    verticalGap: 'gap-pt-2',
    verticalStepGap: 'pb-pt-3',
    verticalTextGap: 'gap-[4px]',
    verticalBulletOffset: 'mt-0',
    verticalTextOffset: 'pt-[4px]',
    connectorHorizontal: 'top-[15px]',
    connectorVertical: 'bottom-0 left-[15px] top-pt-4'
  }
};

export const resolveStepperIconSize = (
  size: PtStepperSize = 'medium'
): PtIconSize => sizeTokens[size].icon;

const bulletVariantClasses: Record<PtStepperVariant, string> = {
  primary: 'bg-pt-primary text-pt-content-bright',
  secondary: 'bg-pt-secondary text-pt-content-din',
  info: 'bg-pt-info text-pt-content-bright',
  system: 'bg-pt-system text-pt-content-bright',
  warning: 'bg-pt-warning text-pt-content-din',
  positive: 'bg-pt-positive text-pt-content-din',
  negative: 'bg-pt-negative text-pt-content-bright'
};

const titleVariantClasses: Record<PtStepperVariant, string> = {
  primary: 'text-pt-content-primary',
  secondary: 'text-pt-content-secondary',
  info: 'text-pt-content-info',
  system: 'text-pt-content-system',
  warning: 'text-pt-content-warning',
  positive: 'text-pt-content-positive',
  negative: 'text-pt-content-negative'
};

const rootOrientationClasses: Record<PtStepperOrientation, string> = {
  horizontal: 'flex-row items-start',
  vertical: 'flex-col'
};

export const buildStepperClasses = (props: StepperClassProps) => {
  const { orientation = 'horizontal', className } = props;

  const root = [
    '!m-0 flex w-full list-none p-0 font-pt-body',
    rootOrientationClasses[orientation],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return { root };
};

export const buildStepperStepClasses = (props: StepperStepClassProps) => {
  const {
    orientation = 'horizontal',
    size = 'medium',
    tone,
    variant = 'primary',
    interactive = true,
    disabled = false,
    clampDescription = false,
    stepClassName
  } = props;

  const isHorizontal = orientation === 'horizontal';
  const tokens = sizeTokens[size];

  const item = [
    'relative flex min-w-0',
    isHorizontal
      ? 'flex-1 flex-col items-center px-[2px]'
      : `flex-col last:pb-0 ${tokens.verticalStepGap}`,
    stepClassName
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipRoot = ['w-full', isHorizontal ? 'justify-center' : undefined]
    .filter(Boolean)
    .join(' ');

  const trigger = 'w-full';

  const content = [
    'relative z-[1] m-0 flex w-full rounded-pt-1 border-0 bg-transparent p-0',
    'transition-colors duration-200 ease-out',
    isHorizontal
      ? `flex-col items-center text-center ${tokens.horizontalGap}`
      : `flex-row items-start text-left ${tokens.verticalGap}`,
    interactive && !disabled
      ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-pt-surface-0'
      : undefined,
    interactive && disabled ? 'cursor-not-allowed opacity-60' : undefined,
    interactive ? undefined : 'cursor-default'
  ]
    .filter(Boolean)
    .join(' ');

  const bulletToneClasses: Record<PtStepperTone, string> = {
    variant: `border-transparent ${bulletVariantClasses[variant]}`,
    muted: 'border-transparent bg-pt-content-disable text-pt-surface-0',
    idle: 'border-pt-border-2 bg-pt-surface-2 text-pt-content-ghost'
  };

  const bullet = [
    'relative z-[1] flex shrink-0 items-center justify-center rounded-full border',
    'font-bold leading-none transition-colors duration-200 ease-out',
    tokens.bullet,
    tokens.text,
    isHorizontal ? undefined : tokens.verticalBulletOffset,
    bulletToneClasses[tone]
  ]
    .filter(Boolean)
    .join(' ');

  const titleToneClasses: Record<PtStepperTone, string> = {
    variant: `font-bold ${titleVariantClasses[variant]}`,
    muted: 'font-normal text-pt-content-disable',
    idle: 'font-normal text-pt-content-ghost'
  };

  const texts = [
    'flex min-w-0 flex-col',
    isHorizontal
      ? 'items-center gap-0'
      : `items-start ${tokens.verticalTextGap} ${tokens.verticalTextOffset}`
  ].join(' ');

  const title = [
    'block leading-pt-normal transition-colors duration-200 ease-out',
    tokens.text,
    titleToneClasses[tone]
  ].join(' ');

  const descriptionToneClasses: Record<PtStepperTone, string> = {
    variant: 'text-pt-content-default',
    muted: 'text-pt-content-disable',
    idle: 'text-pt-content-ghost'
  };

  /**
   * `line-clamp-*` troca o `display` para `-webkit-box`, entao ele entra no
   * lugar do `block` e nao junto: as duas utilidades disputam a mesma
   * propriedade e quem venceria seria a ordem da folha, nao a da string.
   */
  const description = [
    clampDescription ? 'line-clamp-1' : 'block',
    'font-normal leading-pt-normal',
    tokens.text,
    descriptionToneClasses[tone]
  ].join(' ');

  const connectorBase = [
    'absolute z-0 rounded-full transition-colors duration-200 ease-out',
    isHorizontal
      ? `h-[2px] w-1/2 ${tokens.connectorHorizontal}`
      : `w-[2px] ${tokens.connectorVertical}`
  ].join(' ');

  const connectorLeading = [connectorBase, isHorizontal ? 'left-0' : undefined]
    .filter(Boolean)
    .join(' ');

  const connectorTrailing = [
    connectorBase,
    isHorizontal ? 'right-0' : undefined
  ]
    .filter(Boolean)
    .join(' ');

  const connectorDone = 'bg-pt-content-disable';
  const connectorPending = 'bg-pt-border-2';

  /** Na horizontal a descricao so existe dentro do tooltip, dai as duas linhas. */
  const tooltipPanel = [
    'max-w-pt-56 font-normal',
    clampDescription ? 'line-clamp-2' : undefined,
    tokens.text
  ]
    .filter(Boolean)
    .join(' ');

  return {
    item,
    tooltipRoot,
    trigger,
    content,
    bullet,
    texts,
    title,
    description,
    connectorLeading,
    connectorTrailing,
    connectorDone,
    connectorPending,
    tooltipPanel
  };
};
