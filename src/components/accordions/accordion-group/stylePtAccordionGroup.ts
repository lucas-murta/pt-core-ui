import type {
  AccordionGroupClassProps,
  PtAccordionGroupGap,
  PtAccordionGroupModelValue
} from './PtAccordionGroup.interface';
import type { PtAccordionValue } from '../accordion/PtAccordion.interface';

/** Converte o `modelValue` recebido na lista interna de itens abertos. */
export const normalizeOpenValues = (
  value: PtAccordionGroupModelValue | undefined,
  multiple = false
): PtAccordionValue[] => {
  if (value === undefined || value === null) return [];

  const list = Array.isArray(value)
    ? value.filter((item) => item != null)
    : [value];

  return multiple ? [...list] : list.slice(0, 1);
};

/** Abre ou fecha um item respeitando o modo do grupo. */
export const toggleOpenValue = (
  current: PtAccordionValue[],
  value: PtAccordionValue,
  multiple = false
): PtAccordionValue[] => {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }

  return multiple ? [...current, value] : [value];
};

/** Devolve o payload no mesmo formato aceito pelo `modelValue`. */
export const toModelValue = (
  values: PtAccordionValue[],
  multiple = false
): PtAccordionGroupModelValue => (multiple ? [...values] : (values[0] ?? null));

const gapClasses: Record<PtAccordionGroupGap, string> = {
  0: 'gap-0',
  1: 'gap-pt-1',
  2: 'gap-pt-2',
  3: 'gap-pt-3'
};

export const buildAccordionGroupClasses = (props: AccordionGroupClassProps) => {
  const { gap = 1, className } = props;

  const container = ['flex w-full flex-col', gapClasses[gap], className]
    .filter(Boolean)
    .join(' ');

  return { container };
};
