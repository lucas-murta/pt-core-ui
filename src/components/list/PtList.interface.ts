export type PtListNavOrientation = 'vertical' | 'horizontal';

export type PtListContextValue = {
  navOrientation: PtListNavOrientation;
  level: number;
};

export type PtListItemSize = 'small' | 'medium' | 'large';

export type PtListItemProps = {
  className?: string;
  dense?: boolean;
  divider?: boolean;
  selected?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  size?: PtListItemSize;
  onClick?: (event: MouseEvent) => void;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

export type PtOrderedListProps = {
  className?: string;
  dense?: boolean;
  orientation?: PtListNavOrientation;
};

export type PtUnorderedListProps = {
  className?: string;
  dense?: boolean;
  orientation?: PtListNavOrientation;
};
