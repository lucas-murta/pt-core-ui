import type { SizeValue } from '../../types';

export type PtDropdownPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right';

export interface DropdownClassProps {
  className?: string;
  panelClassName?: string;
  width?: SizeValue;
}

export interface DropdownProps {
  className?: string;
  panelClassName?: string;
  placement?: PtDropdownPlacement;
  width?: SizeValue;
  offset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOutsideClick?: boolean;
  triggerAsChild?: boolean;
}
