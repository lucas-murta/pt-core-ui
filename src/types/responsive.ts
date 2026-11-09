export type PtBreakpoint = 'sm' | 'md' | 'lg';

export type ResponsiveValue<T> = {
  base: T;
} & Partial<Record<PtBreakpoint, T>>;

export type ActiveBreakpoints = Record<PtBreakpoint, boolean>;
