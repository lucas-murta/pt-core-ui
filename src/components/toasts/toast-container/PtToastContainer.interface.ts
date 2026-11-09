export type PtToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type PtToastContainerGap = 1 | 2 | 3;

export interface ToastContainerClassProps {
  position?: PtToastPosition;
  gap?: PtToastContainerGap;
  className?: string;
}

export interface PtToastContainerProps extends ToastContainerClassProps {
  /** Canto da tela onde a pilha aparece. */
  position?: PtToastPosition;
  /** Espaco entre os toasts, na escala `pt-*`. */
  gap?: PtToastContainerGap;
  /** Congela a contagem enquanto o ponteiro esta sobre a pilha. */
  pauseOnHover?: boolean;
  /** Destino do `Teleport`; `false` renderiza no lugar. */
  to?: string | false;
  /** Rotulo da regiao de avisos. */
  ariaLabel?: string;
  /** Classes extras no container. */
  className?: string;
}
