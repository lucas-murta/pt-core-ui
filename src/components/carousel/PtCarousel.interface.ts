import type { UsualSizeValue } from '../../types';

export type PtCarouselNavigation = 'outside' | 'inside' | 'none';

export type PtCarouselBulletsPosition = 'left' | 'center' | 'right';

export type PtCarouselGap =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '0'
  | UsualSizeValue;

export type PtCarouselPeek =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6';

export type PtCarouselSlideAlign = 'left' | 'center';

export interface CarouselClassProps {
  autoHeight?: boolean;
  peek?: boolean;
  slideAlign?: PtCarouselSlideAlign;
  hasFreeSpace?: boolean;
  arrows?: PtCarouselNavigation;
  bullets?: PtCarouselNavigation;
  bulletsPosition?: PtCarouselBulletsPosition;
  grab?: boolean;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
}

export interface PtCarouselProps {
  autoplay?: boolean;
  autoplayTimeout?: number;
  autoplayHoverPause?: boolean;
  autoHeight?: boolean;
  infiniteLoop?: boolean;

  bullets?: PtCarouselNavigation;
  smBullets?: PtCarouselNavigation;
  mdBullets?: PtCarouselNavigation;
  lgBullets?: PtCarouselNavigation;
  bulletsPosition?: PtCarouselBulletsPosition;

  arrows?: PtCarouselNavigation;
  smArrows?: PtCarouselNavigation;
  mdArrows?: PtCarouselNavigation;
  lgArrows?: PtCarouselNavigation;

  slidePerPage?: number;
  smSlidePerPage?: number;
  mdSlidePerPage?: number;
  lgSlidePerPage?: number;

  peek?: PtCarouselPeek;
  smPeek?: PtCarouselPeek;
  mdPeek?: PtCarouselPeek;
  lgPeek?: PtCarouselPeek;

  slideAlign?: PtCarouselSlideAlign;
  smSlideAlign?: PtCarouselSlideAlign;
  mdSlideAlign?: PtCarouselSlideAlign;
  lgSlideAlign?: PtCarouselSlideAlign;

  gap?: PtCarouselGap;
  smGap?: PtCarouselGap;
  mdGap?: PtCarouselGap;
  lgGap?: PtCarouselGap;

  grab?: boolean;
  smGrab?: boolean;
  mdGrab?: boolean;
  lgGrab?: boolean;

  highlight?: boolean;
  smHighlight?: boolean;
  mdHighlight?: boolean;
  lgHighlight?: boolean;

  modelValue?: number;
  transitionDuration?: number;

  ariaLabel?: string;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
}

export interface PtCarouselSlideDescriptor {
  key: string;
  logicalIndex: number;
  isClone: boolean;
}
