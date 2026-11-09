export type PtToastStatus =
  | 'info'
  | 'system'
  | 'warning'
  | 'positive'
  | 'negative';

export interface ToastClassProps {
  status?: PtToastStatus;
  className?: string;
}

export interface PtToastProps {
  /** Titulo do feedback. */
  title: string;
  /** Texto de apoio; o toast cresce em altura conforme o conteudo. */
  description?: string;
  /** Status do feedback, na paleta semantica da lib. */
  status?: PtToastStatus;
  /** Sobrescreve o icone padrao do status. */
  icon?: string;
  /** Remove o icone do status. */
  hideIcon?: boolean;
  /** Renderiza o botao de fechar. */
  closable?: boolean;
  /** Rotulo do botao de fechar. */
  closeAriaLabel?: string;
  /** Classes extras no container. */
  className?: string;
}

export interface PtToastOptions extends Omit<
  PtToastProps,
  'className' | 'closeAriaLabel'
> {
  /** Tempo ate o fechamento automatico, em ms. `0` mantem na tela. */
  duration?: number;
}

export interface PtToastEntry extends PtToastOptions {
  id: string;
  duration: number;
}

/** Atalho que aceita so o titulo ou as opcoes completas, sem o `status`. */
export type PtToastShortcutOptions = string | Omit<PtToastOptions, 'status'>;
