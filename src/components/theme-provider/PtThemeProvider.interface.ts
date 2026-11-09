import type { ComputedRef } from 'vue';

/** Tema efetivamente aplicado em um trecho da arvore. */
export type PtThemeMode = 'light' | 'dark';

/**
 * Tema pedido em um provider.
 * `system` segue `prefers-color-scheme`; `inherit` herda do provider acima.
 */
export type PtThemeSetting = PtThemeMode | 'system' | 'inherit';

export interface PtThemeContext {
  /** Tema pedido neste nivel da arvore. */
  theme: ComputedRef<PtThemeSetting>;
  /** Tema resolvido e aplicado no `data-theme`. */
  resolvedTheme: ComputedRef<PtThemeMode>;
  /** Preferencia do sistema, ou `null` quando indisponivel ou nao observada. */
  systemTheme: ComputedRef<PtThemeMode | null>;
  /** Troca o tema deste provider. */
  setTheme: (theme: PtThemeSetting) => void;
  /** Alterna entre claro e escuro a partir do tema resolvido. */
  toggle: () => void;
}

export interface ThemeProviderClassProps {
  inline?: boolean;
  className?: string;
}

export interface PtThemeProviderProps extends ThemeProviderClassProps {
  /**
   * Tema aplicado ao conteudo. Default: `inherit`.
   * Sem provider acima, `inherit` resolve para `light`, que e o tema do `:root`.
   */
  theme?: PtThemeSetting;
  /** Tag HTML renderizada no elemento que recebe o `data-theme`. Default: `div`. */
  as?: string;
  /**
   * Espelha o tema resolvido no `<html>`.
   * Use no provider de topo da aplicacao para que `body`, scrollbars da janela
   * e conteudo em `Teleport` acompanhem o tema.
   */
  root?: boolean;
  /**
   * Aplica `display: contents` no elemento, removendo-o do layout.
   * Util dentro de `flex`/`grid`, onde um wrapper extra quebraria o arranjo.
   */
  inline?: boolean;
  /** Classes extras no elemento raiz. */
  className?: string;
}
