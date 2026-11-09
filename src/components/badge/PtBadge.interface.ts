export type PtBadgeVariant =
  | 'info'
  | 'system'
  | 'warning'
  | 'positive'
  | 'negative';

export type PtBadgeSize = 'small' | 'medium';

export interface BadgeClassProps {
  variant?: PtBadgeVariant;
  size?: PtBadgeSize;
  value?: number | string;
  pulse?: boolean;
  className?: string;
}
