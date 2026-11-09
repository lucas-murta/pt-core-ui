export type PtRadioProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export type RadioClassProps = Pick<PtRadioProps, 'disabled' | 'className'>;
