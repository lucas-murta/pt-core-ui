import type { Meta, StoryObj } from '@storybook/vue3';

import packageJson from '../../package.json';

const meta = {
  title: 'Overview',
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
        description:
          'Biblioteca de componentes Vue 3 com Vite, Tailwind CSS e Storybook. O pacote foi pensado para ser consumido em projetos Vue/Nuxt e também expõe tokens de design, estilos CSS e configuração Tailwind reutilizável.',
        packageName: packageJson.name,
        packageVersion: packageJson.version
      };
    },
    template: `
      <main
        class="min-h-screen bg-pt-surface-3 px-pt-6 py-pt-8 text-pt-content-default flex flex-col gap-pt-2"
      >
        <h1 class="relative z-20 m-0 max-w-[75%] overflow-hidden p-0 px-1 font-pt-heading text-pt-3xl font-extrabold italic leading-pt-tight text-pt-content-default text-shadow-pt-large [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          <span>@pauta/</span>
          <br>
          <span class="relative pr-1 text-pt-content-secondary [text-shadow:none] bg-[linear-gradient(140deg,transparent_45%,var(--pt-bright-scale-700)_45%,var(--pt-bright-scale-700)_65%,transparent_65%),linear-gradient(0deg,var(--pt-color-content-secondary)_0%,var(--pt-color-content-secondary)_100%)] bg-clip-text text-transparent drop-shadow-[-4px_4px_0px_var(--pt-color-shadow-1)]">
            pt-core-ui</span>
        </h1>
        <p class="max-w-2xl text-pt-body-medium">
          {{ description }}
        </p>
        <p class="text-pt-content-secondary text-pt-body-small font-medium">
          v{{ packageVersion }}
        </p>
      </main>
    `
  })
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
