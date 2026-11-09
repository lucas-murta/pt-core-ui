import type {
  ButtonClassProps,
  ButtonColor,
  ButtonSize,
  ButtonVariant
} from './PtButton.interface';
import { interactionsHoverPressed } from '../../../utils/compositions';

const sizeClasses: Record<
  ButtonSize,
  {
    container: string;
    iconOnly: string;
    contentPadding: string;
    contentGap: string;
  }
> = {
  small: {
    container: 'h-7 text-pt-xxs',
    iconOnly: 'w-7 px-0',
    contentPadding: 'px-2',
    contentGap: 'gap-1'
  },
  medium: {
    container: 'h-10 text-pt-base',
    iconOnly: 'w-10 px-0',
    contentPadding: 'px-pt-2',
    contentGap: 'gap-pt-1'
  },
  large: {
    container: 'h-12 text-pt-md',
    iconOnly: 'w-12 px-0',
    contentPadding: 'px-pt-2',
    contentGap: 'gap-pt-1'
  }
};

const solidClasses: Record<ButtonColor, string> = {
  primary: 'bg-pt-primary text-pt-content-bright border border-transparent',
  secondary: 'bg-pt-secondary text-pt-content-din border border-transparent',
  positive: 'bg-pt-positive text-pt-content-din border border-transparent',
  negative: 'bg-pt-negative text-pt-content-bright border border-transparent'
};

const outlineClasses: Record<ButtonColor, string> = {
  primary: 'bg-transparent text-pt-content-primary border border-pt-primary',
  secondary:
    'bg-transparent text-pt-content-secondary border border-pt-secondary',
  positive: 'bg-transparent text-pt-content-positive border border-pt-positive',
  negative: 'bg-transparent text-pt-content-negative border border-pt-negative'
};

const textClasses: Record<ButtonColor, string> = {
  primary: 'bg-transparent text-pt-content-primary border border-transparent',
  secondary:
    'bg-transparent text-pt-content-secondary border border-transparent',
  positive: 'bg-transparent text-pt-content-positive border border-transparent',
  negative: 'bg-transparent text-pt-content-negative border border-transparent'
};

/**
 * Mesmo comportamento do `text`, com uma superficie discreta por tras:
 * `--pt-color-shadow-1` e o mesmo tom nas quatro cores, entao so o texto
 * muda. O token nao tem utilitario de cor no tema, por isso vem como valor
 * arbitrario, no mesmo padrao ja usado em `utils/compositions`.
 */
const ghostClasses: Record<ButtonColor, string> = {
  primary:
    'bg-[--pt-color-shadow-1] text-pt-content-primary border border-transparent',
  secondary:
    'bg-[--pt-color-shadow-1] text-pt-content-secondary border border-transparent',
  positive:
    'bg-[--pt-color-shadow-1] text-pt-content-positive border border-transparent',
  negative:
    'bg-[--pt-color-shadow-1] text-pt-content-negative border border-transparent'
};

const variantClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: solidClasses,
  outline: outlineClasses,
  text: textClasses,
  ghost: ghostClasses
};

export const buildButtonClasses = (
  props: ButtonClassProps
): { container: string; content: string } => {
  const {
    variant = 'solid',
    size = 'medium',
    color = 'primary',
    disabled = false,
    fullWidth = false,
    isIconOnly = false,
    hasSideAdornment = false,
    className
  } = props;

  const s = sizeClasses[size];

  const base = [
    'relative inline-flex items-center rounded-pt-1 font-pt-body font-semibold transition-all duration-200 ease-in-out',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    // `justify-between` so faz sentido com adorno nas pontas. Sem adorno o
    // botao tem um filho unico, e `between` o joga para a esquerda — o que
    // so aparece quando o botao e `fullWidth`.
    isIconOnly || !hasSideAdornment ? 'justify-center' : 'justify-between',
    disabled ? undefined : interactionsHoverPressed
  ]
    .filter(Boolean)
    .join(' ');

  const disabledClasses =
    'bg-pt-surface-3 text-pt-content-disable border border-pt-border-2 opacity-80';

  const container = [
    base,
    s.container,
    isIconOnly ? s.iconOnly : undefined,
    !isIconOnly && fullWidth ? 'w-full' : undefined,
    disabled ? disabledClasses : variantClasses[variant][color],
    className
  ]
    .filter(Boolean)
    .join(' ');

  const content = [
    'relative z-20 inline-flex items-center',
    s.contentGap,
    isIconOnly ? 'px-0' : s.contentPadding
  ]
    .filter(Boolean)
    .join(' ');

  return { container, content };
};
