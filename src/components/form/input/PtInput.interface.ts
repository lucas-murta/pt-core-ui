export type PtInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  setInvalidity: () => void;
  setValidity: () => void;
  reportValidity: () => void;
};

export type PtInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'datetime'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'time';

export type PtInputMask = 'phone-br' | 'cpf';

export type PtInputMode =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';

export type PtInputProps = {
  value?: string | number;
  defaultValue?: string | number;
  icon?: string;
  label?: string;
  type?: PtInputType;
  mask?: PtInputMask;
  messageInfo?: string;
  messageDanger?: string;
  messageSuccess?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  autoComplete?: string;
  required?: boolean;
  pattern?: string;
  inputMode?: PtInputMode;
  className?: string;
};
