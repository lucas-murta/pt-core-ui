import type {
  AvatarClassProps,
  PtAvatarColor,
  PtAvatarContent,
  PtAvatarSize
} from './PtAvatar.interface';
import type { PtIconSize } from '../../icon/PtIcon.interface';

export const PT_AVATAR_FALLBACK_COLOR: PtAvatarColor = 'blue';

export const PT_AVATAR_PLACEHOLDER_ICON = 'user';

/**
 * Cor fixa por inicial: o mesmo nome sempre gera o mesmo avatar, em qualquer
 * sessao e em qualquer tela. Nao ha sorteio em tempo de execucao.
 */
export const ptAvatarLetterColors: Record<string, PtAvatarColor> = {
  A: 'blue',
  B: 'ocean',
  C: 'green',
  D: 'yellow',
  E: 'orange',
  F: 'red',
  G: 'pink',
  H: 'purple',
  I: 'blue',
  J: 'ocean',
  K: 'green',
  L: 'yellow',
  M: 'orange',
  N: 'red',
  O: 'pink',
  P: 'purple',
  Q: 'blue',
  R: 'ocean',
  S: 'green',
  T: 'yellow',
  U: 'orange',
  V: 'red',
  W: 'pink',
  X: 'purple',
  Y: 'blue',
  Z: 'ocean'
};

const stripDiacritics = (value: string) =>
  value.normalize('NFD').replace(/\p{M}/gu, '');

/**
 * Primeira letra do primeiro nome + primeira letra do ultimo nome.
 * `Uncle` -> `U`, `Arthur Morgan` -> `AM`, `Dutch van der Linde` -> `DL`.
 */
export const resolveAvatarInitials = (name?: string) => {
  const words = stripDiacritics(name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return '';

  const first = words[0].charAt(0);
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';

  return `${first}${last}`.toUpperCase();
};

/** Cor da paleta derivada da inicial do primeiro nome. */
export const resolveAvatarColor = (name?: string): PtAvatarColor =>
  ptAvatarLetterColors[resolveAvatarInitials(name).charAt(0)] ??
  PT_AVATAR_FALLBACK_COLOR;

/** Imagem quando existe e carrega; senao as iniciais; senao o icone neutro. */
export const resolveAvatarContent = (args: {
  src?: string;
  name?: string;
  hasImageError?: boolean;
}): PtAvatarContent => {
  const { src, name, hasImageError = false } = args;

  if (src && !hasImageError) return 'image';
  if (resolveAvatarInitials(name)) return 'initials';

  return 'placeholder';
};

type AvatarSizeTokens = {
  container: string;
  text: string;
  icon: PtIconSize;
  containPadding: string;
  overlap: string;
};

const sizeTokens: Record<PtAvatarSize, AvatarSizeTokens> = {
  small: {
    container: 'h-pt-4 w-pt-4',
    text: 'text-pt-xs',
    icon: 3,
    containPadding: 'p-[3px]',
    overlap: '-ml-[6px]'
  },
  medium: {
    container: 'h-pt-5 w-pt-5',
    text: 'text-pt-base',
    icon: 5,
    containPadding: 'p-[5px]',
    overlap: '-ml-[8px]'
  },
  large: {
    container: 'h-pt-7 w-pt-7',
    text: 'text-pt-lg',
    icon: 7,
    containPadding: 'p-[7px]',
    overlap: '-ml-[11px]'
  }
};

export const resolveAvatarSizeTokens = (
  size: PtAvatarSize = 'medium'
): AvatarSizeTokens => sizeTokens[size];

/** Tamanho do `PtIcon` usado no placeholder. */
export const resolveAvatarIconSize = (
  size: PtAvatarSize = 'medium'
): PtIconSize => sizeTokens[size].icon;

export const PT_AVATAR_BASE_CLASS = [
  'relative inline-flex shrink-0 select-none items-center justify-center',
  'overflow-hidden rounded-full align-middle font-pt-body'
].join(' ');

/** Fundo denso da paleta com o texto em um tom mais claro da mesma cor. */
const colorClasses: Record<PtAvatarColor, string> = {
  blue: 'bg-pt-blue-700 text-pt-blue-100',
  ocean: 'bg-pt-ocean-700 text-pt-ocean-100',
  green: 'bg-pt-green-700 text-pt-green-100',
  yellow: 'bg-pt-yellow-700 text-pt-yellow-100',
  orange: 'bg-pt-orange-700 text-pt-orange-100',
  red: 'bg-pt-red-700 text-pt-red-100',
  pink: 'bg-pt-pink-700 text-pt-pink-100',
  purple: 'bg-pt-purple-700 text-pt-purple-100'
};

export const buildAvatarClasses = (props: AvatarClassProps) => {
  const {
    size = 'medium',
    fit = 'cover',
    color = PT_AVATAR_FALLBACK_COLOR,
    content = 'placeholder',
    className
  } = props;

  const tokens = sizeTokens[size];
  const isContain = fit === 'contain';

  const surfaceClasses: Record<PtAvatarContent, string> = {
    image: isContain
      ? 'border border-pt-border-2 bg-pt-surface-1'
      : 'bg-pt-surface-2',
    initials: colorClasses[color],
    placeholder:
      'border border-pt-border-2 bg-pt-surface-2 text-pt-content-ghost'
  };

  const container = [
    PT_AVATAR_BASE_CLASS,
    tokens.container,
    tokens.text,
    content === 'initials' ? 'font-bold' : undefined,
    surfaceClasses[content],
    content === 'image' && isContain ? tokens.containPadding : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const image = [
    'h-full w-full',
    isContain ? 'object-contain' : 'object-cover'
  ].join(' ');

  const initials = 'leading-none';

  return { container, image, initials };
};
