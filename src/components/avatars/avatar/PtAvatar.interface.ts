export type PtAvatarSize = 'small' | 'medium' | 'large';

export type PtAvatarFit = 'cover' | 'contain';

export type PtAvatarColor =
  | 'blue'
  | 'ocean'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple';

export type PtAvatarContent = 'image' | 'initials' | 'placeholder';

export interface AvatarClassProps {
  size?: PtAvatarSize;
  fit?: PtAvatarFit;
  color?: PtAvatarColor;
  content?: PtAvatarContent;
  className?: string;
}

export interface PtAvatarProps {
  /** Nome do usuario: gera as iniciais e a cor quando nao existe imagem. */
  name?: string;
  /** URL da imagem do usuario. */
  src?: string;
  /** Texto alternativo da imagem; por padrao usa `name`. */
  alt?: string;
  /** Escala do avatar. */
  size?: PtAvatarSize;
  /** `cover` preenche o circulo; `contain` deixa respiro para imagens vazadas. */
  fit?: PtAvatarFit;
  /** Forca uma cor da paleta, ignorando a cor derivada do nome. */
  color?: PtAvatarColor;
  /** Icone exibido quando nao ha imagem nem nome. */
  placeholderIcon?: string;
  /** Classes extras no container. */
  className?: string;
}
