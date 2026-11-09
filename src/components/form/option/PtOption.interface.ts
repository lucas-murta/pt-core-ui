export type PtOptionProps = {
  value?: string | number;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
};

export type OptionClassProps = Pick<PtOptionProps, 'selected' | 'className'>;
