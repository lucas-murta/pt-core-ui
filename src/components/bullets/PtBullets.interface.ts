export type PtBulletsSize = 'small' | 'medium' | 'large';

export type PtBulletsAlign = 'left' | 'center' | 'right';

export interface BulletsClassProps {
  size?: PtBulletsSize;
  align?: PtBulletsAlign;
  interactive?: boolean;
  className?: string;
}

export interface PtBulletsProps extends BulletsClassProps {
  /** Quantidade de bullets renderizados. */
  total: number;
  /** Indice ativo (`v-model`). */
  modelValue?: number;
  /** Rotulo do grupo de navegacao. */
  ariaLabel?: string;
  /** Rotulo de cada bullet; recebe o indice iniciado em 1. */
  itemAriaLabel?: (position: number, total: number) => string;
}
