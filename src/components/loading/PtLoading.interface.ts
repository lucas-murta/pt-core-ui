export type PtLoadingVariant = 'primary' | 'secondary' | 'tertiary';

export type PtLoadingType = 'arrow' | 'cyclical' | 'spinner';

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type PtLoadingValue = Enumerate<101>;

export type PtLoadingSize = '3' | '4' | '6' | '8';

export interface PtLoadingProps {
  type?: PtLoadingType;
  variant?: PtLoadingVariant;
  size?: PtLoadingSize;
  value?: PtLoadingValue;
  className?: string;
}
