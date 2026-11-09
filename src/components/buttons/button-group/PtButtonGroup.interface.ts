import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant
} from '../button/PtButton.interface';

export type PtButtonGroupOrientation = 'horizontal' | 'vertical';

export type PtButtonGroupValue = string | string[];

export interface ButtonGroupClassProps {
  className?: string;
  orientation?: PtButtonGroupOrientation;
}

export interface ButtonGroupProps {
  value?: PtButtonGroupValue;
  defaultValue?: PtButtonGroupValue;
  onValueChange?: (value: PtButtonGroupValue) => void;
  multiple?: boolean;
  orientation?: PtButtonGroupOrientation;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
}
