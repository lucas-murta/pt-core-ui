import type { Component } from 'vue';

export interface PtBreadcrumbItem {
  /** Texto do nivel. */
  label: string;
  /** Destino do nivel. Sem ele, o nivel e so texto (a pagina atual, em geral). */
  href?: string | null;
}

export interface BreadcrumbClassProps {
  className?: string;
}

export interface PtBreadcrumbProps {
  /** Niveis do caminho, do mais amplo para a pagina atual. */
  items: PtBreadcrumbItem[];
  /**
   * Componente dos links. `a` por padrao; passe `NuxtLink` para navegar sem
   * recarregar a pagina. O destino e entregue sempre como `href`.
   */
  linkAs?: string | Component;
  /** Quantidade minima de niveis para o breadcrumb aparecer. */
  minItems?: number;
  /** Rotulo da navegacao. */
  ariaLabel?: string;
  /** Classes extras no `nav`. */
  className?: string;
}

export interface PtBreadcrumbSchemaOptions {
  /** Origem absoluta do site, como `https://pauta.io`. */
  origin: string;
  /** Caminho da pagina atual, usado nos niveis sem `href`. */
  currentPath: string;
}
