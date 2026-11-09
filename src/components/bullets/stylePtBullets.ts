import type {
  BulletsClassProps,
  PtBulletsAlign,
  PtBulletsSize
} from './PtBullets.interface';

type BulletSizeTokens = {
  height: string;
  idleWidth: string;
  activeWidth: string;
};

const sizeTokens: Record<PtBulletsSize, BulletSizeTokens> = {
  small: {
    height: 'h-[3px]',
    idleWidth: 'w-[6px]',
    activeWidth: 'w-[18px]'
  },
  medium: {
    height: 'h-[4px]',
    idleWidth: 'w-[8px]',
    activeWidth: 'w-[24px]'
  },
  large: {
    height: 'h-[6px]',
    idleWidth: 'w-[10px]',
    activeWidth: 'w-[32px]'
  }
};

const alignClasses: Record<PtBulletsAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
};

const gapClasses: Record<PtBulletsSize, string> = {
  small: 'gap-[4px]',
  medium: 'gap-[6px]',
  large: 'gap-[8px]'
};

export const buildBulletsClasses = (props: BulletsClassProps) => {
  const {
    size = 'medium',
    align = 'center',
    interactive = true,
    className
  } = props;

  const tokens = sizeTokens[size];

  const container = [
    'flex w-full items-center',
    gapClasses[size],
    alignClasses[align],
    className
  ]
    .filter(Boolean)
    .join(' ');

  const bulletBase = [
    'block shrink-0 rounded-full border-0 p-0',
    tokens.height,
    'transition-[width,background-color] duration-200 ease-out',
    interactive
      ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pt-focus focus-visible:ring-offset-2 focus-visible:ring-offset-pt-surface-0'
      : undefined
  ]
    .filter(Boolean)
    .join(' ');

  const bulletActive = [tokens.activeWidth, 'bg-pt-secondary'].join(' ');

  const bulletIdle = [
    tokens.idleWidth,
    'bg-pt-primary',
    interactive ? 'hover:bg-pt-secondary' : undefined
  ]
    .filter(Boolean)
    .join(' ');

  return { container, bulletBase, bulletActive, bulletIdle };
};

export const resolveBulletState = (index: number, activeIndex: number) =>
  index === activeIndex ? 'active' : 'idle';
