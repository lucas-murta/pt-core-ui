import { computed, inject, ref } from 'vue';

import type {
  PtThemeContext,
  PtThemeSetting
} from '../components/theme-provider/PtThemeProvider.interface';
import {
  PT_THEME_ATTRIBUTE,
  readDocumentTheme,
  ptThemeContextKey
} from '../components/theme-provider/stylePtThemeProvider';

let detachedContext: PtThemeContext | null = null;

/**
 * Contexto usado fora de um `PtThemeProvider`: espelha o `data-theme` do
 * `<html>` em modo leitura. E um singleton porque observa um estado global -
 * um unico `MutationObserver` atende todos os consumidores sem provider.
 */
const useDetachedThemeContext = (): PtThemeContext => {
  if (detachedContext) return detachedContext;

  const documentTheme = ref(readDocumentTheme());

  if (
    typeof MutationObserver !== 'undefined' &&
    typeof document !== 'undefined'
  ) {
    const observer = new MutationObserver(() => {
      documentTheme.value = readDocumentTheme();
    });

    observer.observe(document.documentElement, {
      attributeFilter: [PT_THEME_ATTRIBUTE]
    });
  }

  detachedContext = {
    theme: computed<PtThemeSetting>(() => 'inherit'),
    resolvedTheme: computed(() => documentTheme.value),
    systemTheme: computed(() => null),
    setTheme: () => undefined,
    toggle: () => undefined
  };

  return detachedContext;
};

/**
 * Le o tema do `PtThemeProvider` mais proximo.
 *
 * Sem provider na arvore, `resolvedTheme` acompanha o `data-theme` do `<html>`
 * e `setTheme`/`toggle` nao fazem nada - nao ha escopo para alterar.
 */
export const useTheme = (): PtThemeContext =>
  inject(ptThemeContextKey, null) ?? useDetachedThemeContext();
