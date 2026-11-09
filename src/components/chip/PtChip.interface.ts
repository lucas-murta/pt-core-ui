export type PtChipVariant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'system'
  | 'warning'
  | 'positive'
  | 'negative';

export interface ChipClassProps {
  variant?: PtChipVariant;
  clickable?: boolean;
  className?: string;
}
