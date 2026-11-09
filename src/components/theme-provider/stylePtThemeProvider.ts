import type { InjectionKey } from 'vue';

import type {
  PtThemeContext,
  PtThemeMode,
  PtThemeSetting,
  ThemeProviderClassProps
} from './PtThemeProvider.interface';

export const ptThemeContextKey: InjectionKey<PtThemeContext> =
  Symbol('pt-theme-context');

/** Tema do `:root`, usado quando nao ha provider nem preferencia conhecida. */
export const PT_THEME_DEFAULT_MODE: PtThemeMode = 'light';

export const PT_THEME_ATTRIBUTE = 'data-theme';

type ResolveThemeOptions = {
  parentTheme?: PtThemeMode | null;
  systemTheme?: PtThemeMode | null;
};

/**
 * Resolve o tema pedido em um modo concreto.
 * `system` cai para o tema do pai quando a preferencia ainda nao foi medida,
 * evitando um flash de tema errado antes da hidratacao.
 */
export const resolveThemeMode = (
  setting: PtThemeSetting,
  options: ResolveThemeOptions = {}
): PtThemeMode => {
  const { parentTheme = null, systemTheme = null } = options;

  if (setting === 'light' || setting === 'dark') return setting;

  if (setting === 'system') {
    return systemTheme ?? parentTheme ?? PT_THEME_DEFAULT_MODE;
  }

  return parentTheme ?? PT_THEME_DEFAULT_MODE;
};

export const toggleThemeMode = (mode: PtThemeMode): PtThemeMode =>
  mode === 'dark' ? 'light' : 'dark';

/** Le o tema aplicado no `<html>`; fora do browser assume o tema do `:root`. */
export const readDocumentTheme = (): PtThemeMode => {
  if (typeof document === 'undefined') return PT_THEME_DEFAULT_MODE;

  return document.documentElement.getAttribute(PT_THEME_ATTRIBUTE) === 'dark'
    ? 'dark'
    : PT_THEME_DEFAULT_MODE;
};

export const buildThemeProviderClasses = (props: ThemeProviderClassProps) => {
  const { inline = false, className } = props;

  return [inline ? 'contents' : undefined, className].filter(Boolean).join(' ');
};
