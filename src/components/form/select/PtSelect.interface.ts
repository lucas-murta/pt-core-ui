import type { PtDropdownPlacement } from '../../dropdown/PtDropdown.interface';

export type PtSelectValue = string | number;

export type PtSelectOptionItem = {
  name: string;
  value: PtSelectValue;
};

export type PtSelectRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  setInvalidity: () => void;
  setValidity: () => void;
  reportValidity: () => void;
};

export type PtSelectProps = {
  value?: PtSelectValue;
  defaultValue?: PtSelectValue;
  onValueChange?: (value: PtSelectValue) => void;
  options?: PtSelectOptionItem[];
  icon?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  messageInfo?: string;
  messageDanger?: string;
  messageSuccess?: string;
  className?: string;
  panelClassName?: string;
  placement?: PtDropdownPlacement;
  offset?: number;
  closeOnSelect?: boolean;
};

export type SelectClassProps = Pick<
  PtSelectProps,
  'className' | 'panelClassName' | 'required' | 'disabled' | 'readOnly'
> & {
  hasIcon: boolean;
  isOpen: boolean;
  isValid: boolean;
  hasSuccess?: boolean;
  hasValue: boolean;
};
