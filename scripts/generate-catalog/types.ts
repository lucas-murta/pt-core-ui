export type CatalogProp = {
  name: string;
  type: string;
  typeName?: string;
  required: boolean;
  default?: unknown;
  enumValues?: Array<string | number>;
  description?: string;
};

export type CatalogSlot = {
  name: string;
  description?: string;
};

export type CatalogEvent = {
  name: string;
  payload?: string;
};

export type CatalogModel = {
  prop: string;
  event: string;
};

export type CatalogExample = {
  title: string;
  source: 'README' | 'Storybook';
  code: string;
};

export type CatalogStorybook = {
  title: string;
};

export type CatalogComponent = {
  name: string;
  import: string;
  sourcePath: string;
  category: string;
  internal?: boolean;
  summary?: string;
  description?: string;
  props: CatalogProp[];
  slots: CatalogSlot[];
  events: CatalogEvent[];
  models: CatalogModel[];
  examples: CatalogExample[];
  storybook?: CatalogStorybook;
};

export type CatalogTokens = {
  fontFamily: Record<string, unknown>;
  fontSize: Record<string, unknown>;
  spacing: Record<string, unknown>;
  borderRadius: Record<string, unknown>;
  boxShadow: Record<string, unknown>;
  colors: Record<string, unknown>;
  semanticCssVariables: string[];
};

export type Catalog = {
  schemaVersion: string;
  generator: string;
  package: {
    name: string;
    version: string;
  };
  generatedAt?: string;
  components: CatalogComponent[];
  tokens: CatalogTokens;
};
