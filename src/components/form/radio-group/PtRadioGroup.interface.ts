export type PtRadioGroupOrientation = 'vertical' | 'horizontal';

export type PtRadioGroupProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  dense?: boolean;
  orientation?: PtRadioGroupOrientation;
  className?: string;
};

export type PtRadioGroupContext = {
  name: { value: string };
  value: { value: string | undefined };
  disabled: { value: boolean };
};
