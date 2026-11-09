import type {
  PtLoadingSize,
  PtLoadingType,
  PtLoadingVariant
} from './PtLoading.interface';

export const buildPtLoadingClasses = (props: {
  type?: PtLoadingType;
  variant?: PtLoadingVariant;
  size?: PtLoadingSize;
  className?: string;
}) => {
  const { type = 'arrow', size = '8', className } = props;

  const sizeBySize: Record<PtLoadingSize, string> = {
    '3': 'h-pt-3 w-pt-3',
    '4': 'h-pt-4 w-pt-4',
    '6': 'h-pt-6 w-pt-6',
    '8': 'h-pt-8 w-pt-8'
  };

  const arrowSizeByContainer: Record<PtLoadingSize, string> = {
    '3': 'h-pt-1 w-pt-1',
    '4': 'h-pt-1 w-pt-1',
    '6': 'h-pt-2 w-pt-2',
    '8': 'h-pt-3 w-pt-3'
  };

  const arrow = [
    'absolute inset-0 m-auto z-[2]',
    arrowSizeByContainer[size],
    type === 'arrow'
      ? 'animate-pt-loading-arrow drop-shadow-[-2px_2px_0px_var(--pt-shadow-scale-800)]'
      : undefined
  ]
    .filter(Boolean)
    .join(' ');

  const spinner = [
    'absolute inset-pt-1 m-auto z-[2] aspect-square rounded-full border-[2px] border-solid border-current',
    'animate-pt-spinner-infinite',
    'drop-shadow-[0px_0px_4px_var(--pt-light-scale-950)]'
  ].join(' ');

  const cyclical = [
    'absolute inset-pt-1 z-[2] -rotate-90',
    'drop-shadow-[0px_0px_4px_var(--pt-light-scale-950)]'
  ].join(' ');

  const content = [
    'relative overflow-hidden rounded-full',
    sizeBySize[size],
    'before:absolute before:inset-0 before:z-[1] before:rounded-full before:mix-blend-luminosity',
    'before:bg-[linear-gradient(225deg,_var(--pt-shadow-scale-800)_0%,_var(--pt-light-scale-800)_100%)]',
    'after:absolute after:inset-[4px] after:z-[3] after:rounded-full after:mix-blend-plus-lighter',
    'after:bg-[linear-gradient(225deg,_var(--pt-light-scale-800)_0%,_transparent_75%)]',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return { spinner, cyclical, content, arrow };
};
