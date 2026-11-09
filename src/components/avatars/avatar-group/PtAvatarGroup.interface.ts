import type {
  PtAvatarColor,
  PtAvatarFit,
  PtAvatarSize
} from '../avatar/PtAvatar.interface';

export interface PtAvatarGroupItem {
  /** Nome do usuario: gera as iniciais e a cor quando nao existe imagem. */
  name?: string;
  /** URL da imagem do usuario. */
  src?: string;
  /** Texto alternativo da imagem; por padrao usa `name`. */
  alt?: string;
  /** Forca uma cor da paleta neste avatar. */
  color?: PtAvatarColor;
  /** Sobrescreve o `fit` do grupo neste avatar. */
  fit?: PtAvatarFit;
}

export interface AvatarGroupClassProps {
  size?: PtAvatarSize;
  className?: string;
}

export interface PtAvatarGroupProps extends AvatarGroupClassProps {
  /** Usuarios exibidos, na ordem informada. */
  avatars: PtAvatarGroupItem[];
  /** Quantidade maxima de avatares visiveis antes do contador. */
  max?: number;
  /** Escala aplicada a todos os avatares. */
  size?: PtAvatarSize;
  /** `fit` padrao dos avatares do grupo. */
  fit?: PtAvatarFit;
  /** Icone exibido nos avatares sem imagem e sem nome. */
  placeholderIcon?: string;
  /** Rotulo do grupo. */
  ariaLabel?: string;
  /** Rotulo do contador de excedentes. */
  overflowAriaLabel?: (count: number) => string;
  /** Classes extras em cada avatar. */
  avatarClassName?: string;
}
