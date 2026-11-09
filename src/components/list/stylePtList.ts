import type { InjectionKey } from 'vue';

import { interactionsHoverPressed } from '../../utils/compositions';
import type {
  PtListContextValue,
  PtListItemProps,
  PtOrderedListProps,
  PtUnorderedListProps
} from './PtList.interface';

export const ptListContextKey: InjectionKey<PtListContextValue> =
  Symbol('PtListContext');

export const buildUnorderedListClasses = (
  props: PtUnorderedListProps,
  renderOrientation: string
) => {
  const { dense = false, className } = props;

  const base = ['!m-0 list-none p-0 flex', className].filter(Boolean).join(' ');
  const gap = dense ? 'gap-0' : 'gap-pt-1';
  const orientation =
    renderOrientation === 'horizontal'
      ? 'flex-row flex-wrap items-center'
      : 'flex-col items-stretch';

  return [base, orientation, gap].filter(Boolean).join(' ');
};

export const buildOrderedListClasses = (
  props: PtOrderedListProps,
  renderOrientation: string
) => {
  const { dense = false, className } = props;

  const base = ['!m-0 flex', className].filter(Boolean).join(' ');

  let gap = 'gap-pt-1';
  if (dense) {
    gap = 'gap-0';
  } else if (renderOrientation === 'horizontal') {
    gap = 'gap-pt-2';
  }

  const orientation =
    renderOrientation === 'horizontal'
      ? 'flex-row flex-wrap items-center list-none'
      : 'flex-col items-stretch list-decimal';

  return [base, orientation, gap].filter(Boolean).join(' ');
};

const getListItemSizeClass = (size: PtListItemProps['size']) => {
  if (size === 'small') return 'p-pt-1 text-pt-sm';
  if (size === 'large') return 'p-pt-2 text-pt-md';
  return 'px-pt-1 py-pt-1 text-pt-base';
};

const getListItemMainClass = (
  divider: boolean,
  selected: boolean,
  clickable: boolean
) => {
  const base = 'relative flex items-center';

  if (!divider) return base;

  let scaleClass = '';
  if (selected) {
    scaleClass = 'before:scale-x-100';
  } else if (clickable) {
    scaleClass = 'hover:before:scale-x-100';
  }

  const dividerClasses = [
    'border-b border-pt-border-3',
    "before:content-[''] before:absolute before:bottom-[-1px] before:left-0 before:h-[2px] before:w-full",
    'before:origin-center before:scale-x-0 before:bg-pt-secondary',
    'before:transition-transform before:duration-300 before:ease-in-out',
    scaleClass
  ]
    .filter(Boolean)
    .join(' ');

  return `${base} ${dividerClasses}`;
};

const getListItemSubListClass = (
  hasSubItems: boolean,
  navOrientation: string,
  expanded: boolean
) => {
  if (!hasSubItems || navOrientation === 'horizontal') return '';
  return expanded ? 'block' : 'hidden';
};

export const buildListItemClasses = (
  props: PtListItemProps,
  options: {
    hasSubItems: boolean;
    expanded: boolean;
    navOrientation: string;
  }
) => {
  const {
    dense = false,
    divider = false,
    selected = false,
    disabled = false,
    clickable = false,
    size = 'medium',
    className
  } = props;

  const sizeClass = getListItemSizeClass(size);
  const denseClass = dense ? 'px-[12px] py-pt-1' : undefined;
  const disabledClass = disabled ? 'opacity-60' : undefined;

  const listItem = [
    'relative flex flex-col items-stretch text-pt-content-default',
    disabledClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const main = getListItemMainClass(divider, selected, clickable);
  const actionSelectedClass = selected ? 'bg-pt-pressed' : undefined;

  const mainActionBase = [
    'relative flex min-w-0 flex-1 items-center gap-[var(--pt-list-item-gap,theme(spacing.pt-1))]',
    'rounded-[10px]',
    sizeClass,
    denseClass,
    actionSelectedClass
  ]
    .filter(Boolean)
    .join(' ');

  const mainActionInteractive = [
    mainActionBase,
    'm-0 appearance-none border-0 bg-transparent',
    'cursor-pointer select-none text-left font-inherit text-inherit',
    divider ? 'rounded-b-none' : undefined,
    options.hasSubItems
      ? 'rounded-r-none before:rounded-r-none after:rounded-r-none'
      : undefined,
    disabled ? 'pointer-events-none' : undefined,
    interactionsHoverPressed
  ]
    .filter(Boolean)
    .join(' ');

  const startAdornment = 'relative z-20 inline-flex shrink-0';
  const endAdornment = 'relative z-20 inline-flex shrink-0';
  const content = 'relative z-20 flex-1 min-w-0';

  const subMenuButton = [
    'shrink-0 rounded-l-none',
    '[&_svg]:transition-transform',
    'data-[open=true]:[&_svg]:rotate-180'
  ].join(' ');

  const subList = getListItemSubListClass(
    options.hasSubItems,
    options.navOrientation,
    options.expanded
  );

  const subMenuPanel = 'p-0';

  return {
    listItem,
    main,
    mainActionBase,
    mainActionInteractive,
    startAdornment,
    endAdornment,
    content,
    subMenuButton,
    subList,
    subMenuPanel
  };
};
