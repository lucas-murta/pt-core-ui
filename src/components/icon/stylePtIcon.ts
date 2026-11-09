import type { PtIconSize } from './PtIcon.interface';

const sizeClasses: Record<PtIconSize, string> = {
  1: 'w-pt-xs h-pt-xs',
  2: 'w-pt-sm h-pt-sm',
  3: 'w-pt-base h-pt-base',
  4: 'w-pt-md h-pt-md',
  5: 'w-pt-lg h-pt-lg',
  6: 'w-pt-xl h-pt-xl',
  7: 'w-pt-2xl h-pt-2xl',
  8: 'w-pt-3xl h-pt-3xl',
  9: 'w-pt-4xl h-pt-4xl',
  10: 'w-pt-5xl h-pt-5xl',
  11: 'w-pt-6xl h-pt-6xl',
  12: 'w-pt-7xl h-pt-7xl'
};

export const buildIconClasses = (props: {
  size?: PtIconSize;
  className?: string;
}) => {
  const { size, className } = props;

  const container = [
    'inline-flex shrink-0 items-center justify-center overflow-hidden leading-none',
    size ? sizeClasses[size] : 'w-pt-base h-pt-base',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const glyph = ['block text-current', 'h-[90%] w-[90%]'].join(' ');

  return { container, glyph };
};
