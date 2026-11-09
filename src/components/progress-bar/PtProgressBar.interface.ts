export type PtProgressBarVariant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'system'
  | 'warning'
  | 'positive'
  | 'negative';

export type PtProgressBarSize = 'small' | 'large';

export interface ProgressBarClassProps {
  variant?: PtProgressBarVariant;
  size?: PtProgressBarSize;
  className?: string;
}

export interface PtProgressBarProps extends ProgressBarClassProps {
  percent?: number;
  text?: string;
}
