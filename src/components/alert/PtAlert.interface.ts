import type { SizeValue } from '../../types';
import type { PtToastStatus } from '../toasts/toast/PtToast.interface';

/** Mesmos status semanticos do `PtToast`. */
export type PtAlertStatus = PtToastStatus;

export interface AlertClassProps {
  status?: PtAlertStatus;
  width?: SizeValue;
  hasTitle?: boolean;
  className?: string;
}

export interface PtAlertProps {
  /** Titulo do alerta. */
  title?: string;
  /** Texto de apoio; o alerta cresce em altura conforme o conteudo. */
  description?: string;
  /** Status do alerta, na paleta semantica da lib. */
  status?: PtAlertStatus;
  /** Sobrescreve o icone padrao do status. */
  icon?: string;
  /** Remove o icone do status. */
  hideIcon?: boolean;
  /** Renderiza o botao de fechar. */
  closable?: boolean;
  /** Rotulo do botao de fechar. */
  closeAriaLabel?: string;
  /**
   * Visibilidade (`v-model:open`). Sem a prop, o alerta controla o proprio
   * estado e some ao ser fechado.
   */
  open?: boolean;
  /** Largura do alerta, na mesma escala do `PtPaper`. */
  width?: SizeValue;
  /** Classes extras no container. */
  className?: string;
}
