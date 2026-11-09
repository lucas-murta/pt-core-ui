import type { Meta, StoryObj } from '@storybook/vue3';

import packageJson from '../../package.json';

const meta = {
  title: 'Get Started',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      disable: true,
      exclude: /.*/
    },
    actions: {
      disable: true
    },
    a11y: {
      disable: true
    }
  },
  render: () => ({
    setup() {
      return {
        packageName: packageJson.name,
        installCommand: 'npm install @pauta/pt-core-ui',
        quickStartCss: "import '@pauta/pt-core-ui/style.css';",
        quickStartComponent: `<script setup lang="ts">
import { PtTypography } from '@pauta/pt-core-ui';
</script>

<template>
  <PtTypography as="h2" variant="heading-3">
    Titulo da secao
  </PtTypography>
</template>`,
        tailwindConfig: `import { ptTailwindPlugins, ptTailwindTheme } from '@pauta/pt-core-ui';

export default {
  theme: {
    extend: {
      ...ptTailwindTheme
    }
  },
  plugins: [...ptTailwindPlugins]
};`,
        tokensImport: `@import '@pauta/pt-core-ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;`
      };
    },
    template: `
      <main class="min-h-screen bg-pt-surface-3 px-pt-6 py-pt-8 text-pt-content-default">
        <div class="mx-auto flex w-full max-w-5xl flex-col gap-pt-6">
          <header class="flex flex-col gap-pt-2">
            <p class="m-0 text-pt-body-small font-medium uppercase tracking-[0.12em] text-pt-content-secondary">
              Get Started
            </p>
            <h1 class="m-0 font-pt-highlight text-pt-3xl font-extrabold leading-pt-tight text-pt-content-default">
              Configure {{ packageName }}
            </h1>
            <p class="m-0 max-w-3xl text-pt-body-medium text-pt-content-default">
              Use esta pagina como referencia rápida para instalar a biblioteca, carregar os estilos base e integrar os tokens do Design System ao projeto que vai consumir a lib.
            </p>
          </header>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              1. Instalacao
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Instale o pacote publicado:
            </p>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ installCommand }}</code></pre>
          </section>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              2. Projeto novo ou simples
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Para uma integracao rapida, importe o CSS principal da biblioteca e comece a consumir os componentes.
            </p>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ quickStartCss }}</code></pre>
            <pre class="mb-0 mt-pt-3 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ quickStartComponent }}</code></pre>
          </section>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              3. Projeto existente com Tailwind
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Se o projeto ja possui um Tailwind configurado, faca merge do tema exportado pela lib em vez de substituir a configuracao local.
            </p>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ tailwindConfig }}</code></pre>
            <p class="mb-0 mt-pt-3 text-pt-body-small text-pt-content-default">
              Carregue tambem os tokens CSS no arquivo global principal da aplicacao:
            </p>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ tokensImport }}</code></pre>
          </section>
        </div>
      </main>
    `
  })
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const GetStarted: Story = {};
