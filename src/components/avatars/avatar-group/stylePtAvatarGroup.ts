import type { AvatarGroupClassProps } from './PtAvatarGroup.interface';
import {
  resolveAvatarSizeTokens,
  PT_AVATAR_BASE_CLASS
} from '../avatar/stylePtAvatar';

export const PT_AVATAR_GROUP_DEFAULT_MAX = 5;

/** Garante pelo menos um avatar visivel antes do contador. */
export const clampAvatarGroupMax = (max: number | undefined) => {
  if (typeof max !== 'number' || Number.isNaN(max)) {
    return PT_AVATAR_GROUP_DEFAULT_MAX;
  }

  const rounded = Math.trunc(max);

  return rounded < 1 ? 1 : rounded;
};

/** Quantos usuarios ficaram de fora da lista visivel. */
export const resolveAvatarGroupOverflow = (total: number, max: number) =>
  total > max ? total - max : 0;

export const buildAvatarGroupClasses = (props: AvatarGroupClassProps) => {
  const { size = 'medium', className } = props;

  const tokens = resolveAvatarSizeTokens(size);

  const container = ['inline-flex items-center', className]
    .filter(Boolean)
    .join(' ');

  /** Anel na cor da superficie base para separar avatares sobrepostos. */
  const ring = 'ring-2 ring-pt-surface-0';

  const item = ring;

  const overlap = tokens.overlap;

  const overflow = [
    PT_AVATAR_BASE_CLASS,
    tokens.container,
    tokens.text,
    'border border-pt-border-2 bg-pt-surface-3 font-bold text-pt-content-default',
    ring,
    overlap
  ].join(' ');

  return { container, item, overlap, overflow };
};
