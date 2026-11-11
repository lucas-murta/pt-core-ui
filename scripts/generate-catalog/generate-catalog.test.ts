import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { extractReadme } from './extract-readme';
import { extractStories } from './extract-stories';
import { resolveRepoRoot, runGenerateCatalog } from './generate-catalog';
import type { Catalog } from './types';

const readmeFixture = `# PtFixture

Resumo do componente de teste.

## Import

\`\`\`ts
import { PtFixture } from '@pauta/pt-core-ui';
\`\`\`

## Props principais

- \`variant\`: define o estilo. Default: \`solid\`.

## Exemplo basico

\`\`\`vue
<template>
  <PtFixture />
</template>
\`\`\`
`;

const storiesFixture = `import type { Meta, StoryObj } from '@storybook/vue3';

import PtFixture from './PtFixture.vue';

const variantOptions = ['solid', 'outline'] as const;

const meta = {
  title: 'Components/PtFixture',
  component: PtFixture,
  args: {
    variant: 'solid',
    disabled: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions
    },
    size: {
      control: 'radio',
      options: ['small', 'large']
    }
  }
} satisfies Meta<typeof PtFixture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Basic: Story = {
  render: () => ({
    components: { PtFixture },
    template: \`
      <PtFixture variant="outline" />
    \`
  })
};
`;

describe('extract-readme', () => {
  it('extrai o summary a partir do primeiro paragrafo', () => {
    expect(extractReadme(readmeFixture).summary).toBe(
      'Resumo do componente de teste.'
    );
  });

  it('extrai as descricoes da secao "Props principais"', () => {
    expect(extractReadme(readmeFixture).propDescriptions).toEqual({
      variant: 'define o estilo. Default: `solid`.'
    });
  });

  it('extrai os exemplos ignorando a secao "Import"', () => {
    const { examples } = extractReadme(readmeFixture);

    expect(examples).toHaveLength(1);
    expect(examples[0].title).toBe('Exemplo basico');
    expect(examples[0].source).toBe('README');
    expect(examples[0].code).toContain('<PtFixture />');
  });

  it('remove o H1 e a secao "Import" da descricao', () => {
    const { description } = extractReadme(readmeFixture);

    expect(description).not.toContain('# PtFixture');
    expect(description).not.toContain('## Import');
    expect(description).toContain('## Props principais');
  });
});

describe('extract-stories', () => {
  it('extrai o title do meta', () => {
    expect(extractStories(storiesFixture).title).toBe('Components/PtFixture');
  });

  it('extrai os args do meta', () => {
    expect(extractStories(storiesFixture).args).toEqual({
      variant: 'solid',
      disabled: false
    });
  });

  it('resolve as options de argTypes por constante e inline', () => {
    expect(extractStories(storiesFixture).argTypesOptions).toEqual({
      variant: ['solid', 'outline'],
      size: ['small', 'large']
    });
  });

  it('extrai apenas as stories com template', () => {
    const { examples } = extractStories(storiesFixture);

    expect(examples).toHaveLength(1);
    expect(examples[0].title).toBe('Basic');
    expect(examples[0].source).toBe('Storybook');
    expect(examples[0].code).toContain('<PtFixture variant="outline" />');
  });
});

describe('catalog.json (repositorio real)', () => {
  const repoRoot = resolveRepoRoot();
  const catalog = JSON.parse(
    readFileSync(path.join(repoRoot, 'catalog.json'), 'utf8')
  ) as Catalog;

  const componentNamed = (name: string) =>
    catalog.components.find((component) => component.name === name);

  it('possui schemaVersion e package', () => {
    expect(catalog.schemaVersion).toBe('1.0.0');
    expect(catalog.package.name).toBe('@pauta/pt-core-ui');
    expect(catalog.generator).toBe('pt-core-ui/build:catalog');
  });

  it('captura pelo menos 25 componentes', () => {
    expect(catalog.components.length).toBeGreaterThanOrEqual(25);
  });

  it('nao possui nomes de componente duplicados', () => {
    const names = catalog.components.map((component) => component.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('descreve o PtButton com variant/size/color e enum de variant', () => {
    const button = componentNamed('PtButton');

    expect(button).toBeDefined();

    const propNames = button?.props.map((prop) => prop.name) ?? [];
    expect(propNames).toEqual(
      expect.arrayContaining(['variant', 'size', 'color'])
    );

    const variant = button?.props.find((prop) => prop.name === 'variant');
    expect(variant?.enumValues).toContain('solid');

    expect(button?.examples.length ?? 0).toBeGreaterThanOrEqual(1);
  });

  it('expoe value, label e type no PtInput', () => {
    const input = componentNamed('PtInput');
    const propNames = input?.props.map((prop) => prop.name) ?? [];

    expect(propNames).toEqual(
      expect.arrayContaining(['value', 'label', 'type'])
    );
  });
});

describe('runGenerateCatalog --check', () => {
  const repoRoot = resolveRepoRoot();
  const catalogPath = path.join(repoRoot, 'catalog.json');
  const readFile = (filePath: string): string => readFileSync(filePath, 'utf8');

  it('sai com 0 quando o catalog.json esta atualizado', () => {
    const exit = vi.fn<(code: number) => void>();
    const logError = vi.fn<(message: string) => void>();

    runGenerateCatalog({
      argv: ['--check'],
      repoRoot,
      readFile,
      exit,
      logError,
      log: () => undefined
    });

    expect(logError).not.toHaveBeenCalled();
    expect(exit).toHaveBeenCalledWith(0);
  }, 60000);

  it('sai com 1 quando o catalog.json esta desatualizado', () => {
    const exit = vi.fn<(code: number) => void>();
    const logError = vi.fn<(message: string) => void>();

    runGenerateCatalog({
      argv: ['--check'],
      repoRoot,
      readFile: (filePath) =>
        filePath === catalogPath
          ? `${readFile(filePath)}\n`
          : readFile(filePath),
      exit,
      logError,
      log: () => undefined
    });

    expect(exit).toHaveBeenCalledWith(1);
    expect(logError).toHaveBeenCalled();
  }, 60000);
});
