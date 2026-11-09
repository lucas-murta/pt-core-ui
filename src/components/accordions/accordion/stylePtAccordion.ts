import type { InjectionKey } from 'vue';

import type {
  AccordionClassProps,
  PtAccordionContext,
  PtAccordionSize,
  PtAccordionSurface
} from './PtAccordion.interface';
import type { PtIconSize } from '../../icon/PtIcon.interface';

export const ptAccordionContextKey: InjectionKey<PtAccordionContext> = Symbol(
  'pt-accordion-context'
);

export const PT_ACCORDION_EXPAND_ICON = 'chevron-down';

export const PT_ACCORDION_DEFAULT_HEADER_SURFACE: PtAccordionSurface =
  'surface-1';

export const PT_ACCORDION_DEFAULT_CONTENT_SURFACE: PtAccordionSurface =
  'surface-0';

type AccordionSizeTokens = {
  header: string;
  content: string;
  gap: string;
  text: string;
  icon: PtIconSize;
};

const sizeTokens: Record<PtAccordionSize, AccordionSizeTokens> = {
  small: {
    header: 'px-pt-2 py-pt-1',
    content: 'px-pt-2 py-pt-1',
    gap: 'gap-pt-1',
    text: 'text-pt-body-small',
    icon: 2
  },
  medium: {
    header: 'px-pt-2 py-pt-2',
    content: 'px-pt-2 py-pt-2',
    gap: 'gap-pt-2',
    text: 'text-pt-body-medium',
    icon: 3
  },
  large: {
    header: 'px-pt-3 py-pt-3',
    content: 'px-pt-3 py-pt-3',
    gap: 'gap-pt-2',
    text: 'text-pt-body-large',
    icon: 4
  }
};

/** Tamanho do `PtIcon` usado no cabecalho. */
export const resolveAccordionIconSize = (
  size: PtAccordionSize = 'medium'
): PtIconSize => sizeTokens[size].icon;

const surfaceClasses: Record<PtAccordionSurface, string> = {
  transparent: 'bg-transparent',
  'surface-0': 'bg-pt-surface-0',
  'surface-1': 'bg-pt-surface-1',
  'surface-2': 'bg-pt-surface-2',
  'surface-3': 'bg-pt-surface-3',
  'surface-4': 'bg-pt-surface-4',
  'surface-primary': 'bg-pt-surface-primary',
  'surface-secondary': 'bg-pt-surface-secondary',
  'surface-info': 'bg-pt-surface-info',
  'surface-system': 'bg-pt-surface-system',
  'surface-warning': 'bg-pt-surface-warning',
  'surface-positive': 'bg-pt-surface-positive',
  'surface-negative': 'bg-pt-surface-negative'
};

export const buildAccordionClasses = (props: AccordionClassProps) => {
  const {
    size = 'medium',
    headerSurface = PT_ACCORDION_DEFAULT_HEADER_SURFACE,
    contentSurface = PT_ACCORDION_DEFAULT_CONTENT_SURFACE,
    open = false,
    disabled = false,
    className,
    headerClassName,
    contentClassName
  } = props;

  const tokens = sizeTokens[size];

  const root = ['w-full overflow-hidden rounded-pt-1 font-pt-body', className]
    .filter(Boolean)
    .join(' ');

  /**
   * A linha do cabecalho carrega o padding e a ordem visual; o gatilho e uma
   * camada sobre ela. Assim o chevron fecha a linha, o `endAdornment` aparece
   * antes dele e continua fora do botao — sem botao dentro de botao.
   */
  const header = [
    'relative flex w-full items-center',
    tokens.header,
    tokens.gap,
    surfaceClasses[headerSurface],
    disabled ? 'opacity-60' : undefined,
    headerClassName
  ]
    .filter(Boolean)
    .join(' ');

  const trigger = [
    'absolute inset-0 m-0 border-0 bg-transparent p-0',
    'transition-colors duration-200 ease-out',
    disabled
      ? 'cursor-not-allowed'
      : 'cursor-pointer hover:bg-pt-hover/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pt-focus'
  ].join(' ');

  const icon = 'shrink-0 text-pt-content-default';

  const title = [
    'min-w-0 flex-1 text-left font-semibold text-pt-content-default',
    tokens.text
  ].join(' ');

  /**
   * `pointer-events-none` e obrigatorio: o `rotate-*` cria um stacking context
   * que pintaria o icone acima da camada do gatilho e engoliria o clique.
   */
  const expandIcon = [
    'pointer-events-none shrink-0 text-pt-content-ghost',
    'transition-transform duration-300 ease-out motion-reduce:transition-none',
    open ? 'rotate-180' : 'rotate-0'
  ].join(' ');

  /** Acima da camada do gatilho: elementos interativos seguem clicaveis. */
  const adornment = 'relative z-[1] flex shrink-0 items-center';

  /**
   * `grid-template-rows` de `0fr` para `1fr` anima ate a altura automatica do
   * conteudo, sem medir nada em JavaScript e sem altura fixa.
   */
  const region = [
    'grid transition-[grid-template-rows] duration-300 ease-out',
    'motion-reduce:transition-none',
    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
    surfaceClasses[contentSurface]
  ].join(' ');

  const regionInner = 'overflow-hidden';

  const content = [
    tokens.content,
    tokens.text,
    'text-pt-content-default',
    contentClassName
  ]
    .filter(Boolean)
    .join(' ');

  return {
    root,
    header,
    trigger,
    icon,
    title,
    expandIcon,
    adornment,
    region,
    regionInner,
    content
  };
};
