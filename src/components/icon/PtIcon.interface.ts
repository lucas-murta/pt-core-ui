export type PtIconLibrary = 'fa' | 'fab';

export type PtIconSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IconClassProps {
  name: string;
  lib?: PtIconLibrary;
  size?: PtIconSize;
  ariaLabel?: string;
  className?: string;
}
