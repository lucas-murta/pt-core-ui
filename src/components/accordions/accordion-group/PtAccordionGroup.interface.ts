import type {
  PtAccordionSize,
  PtAccordionSurface,
  PtAccordionValue
} from '../accordion/PtAccordion.interface';

export type PtAccordionGroupModelValue =
  | PtAccordionValue
  | PtAccordionValue[]
  | null;

export type PtAccordionGroupGap = 0 | 1 | 2 | 3;

export interface AccordionGroupClassProps {
  gap?: PtAccordionGroupGap;
  className?: string;
}

export interface PtAccordionGroupProps extends AccordionGroupClassProps {
  /** `true` permite varios itens abertos; `false` abre um de cada vez. */
  multiple?: boolean;
  /**
   * Itens abertos (`v-model`). `null` ou `[]` deixa tudo colapsado.
   * Com `multiple` o payload e um array; sem ele, um valor unico ou `null`.
   */
  modelValue?: PtAccordionGroupModelValue;
  /** Escala herdada por todos os itens. */
  size?: PtAccordionSize;
  /** Superficie do cabecalho herdada por todos os itens. */
  headerSurface?: PtAccordionSurface;
  /** Superficie da area expansivel herdada por todos os itens. */
  contentSurface?: PtAccordionSurface;
  /** Bloqueia todos os itens do grupo. */
  disabled?: boolean;
  /** Espaco entre os itens, na escala `pt-*`. */
  gap?: PtAccordionGroupGap;
  /** Rotulo do grupo. */
  ariaLabel?: string;
  /** Classes extras no container. */
  className?: string;
}
