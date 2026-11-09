import type { Meta, StoryObj } from '@storybook/vue3';

const spacingTokens = [
  { token: 'pt-xxs', value: '10px' },
  { token: 'pt-xs', value: '12px' },
  { token: 'pt-sm', value: '14px' },
  { token: 'pt-base', value: '16px' },
  { token: 'pt-md', value: '18px' },
  { token: 'pt-lg', value: '20px' },
  { token: 'pt-xl', value: '24px' },
  { token: 'pt-2xl', value: '30px' },
  { token: 'pt-3xl', value: '36px' },
  { token: 'pt-4xl', value: '48px' },
  { token: 'pt-5xl', value: '60px' },
  { token: 'pt-6xl', value: '72px' },
  { token: 'pt-7xl', value: '80px' },
  { token: 'pt-1', value: '8px' },
  { token: 'pt-2', value: '16px' },
  { token: 'pt-3', value: '24px' },
  { token: 'pt-4', value: '32px' },
  { token: 'pt-5', value: '40px' },
  { token: 'pt-6', value: '48px' },
  { token: 'pt-7', value: '56px' },
  { token: 'pt-8', value: '64px' },
  { token: 'pt-9', value: '72px' },
  { token: 'pt-10', value: '80px' },
  { token: 'pt-11', value: '88px' },
  { token: 'pt-12', value: '96px' },
  { token: 'pt-15', value: '120px' },
  { token: 'pt-16', value: '128px' },
  { token: 'pt-20', value: '160px' },
  { token: 'pt-24', value: '192px' },
  { token: 'pt-30', value: '240px' },
  { token: 'pt-32', value: '256px' },
  { token: 'pt-40', value: '320px' },
  { token: 'pt-48', value: '384px' },
  { token: 'pt-56', value: '448px' },
  { token: 'pt-64', value: '512px' },
  { token: 'pt-72', value: '584px' },
  { token: 'pt-80', value: '640px' },
  { token: 'pt-96', value: '768px' },
  { token: 'pt-128', value: '1024px' },
  { token: 'pt-144', value: '1152px' },
  { token: 'pt-160', value: '1280px' },
  { token: 'pt-168', value: '1344px' },
  { token: 'pt-240', value: '1920px' }
] as const;

const meta = {
  title: 'Spacing',
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
        spacingTokens
      };
    },
    template: `
      <main class="min-h-screen bg-pt-surface-3 px-pt-6 py-pt-8 text-pt-content-default">
        <div class="mx-auto flex w-full max-w-5xl flex-col gap-pt-6">
          <header class="flex flex-col gap-pt-2">
            <p class="m-0 text-pt-body-small font-medium uppercase tracking-[0.12em] text-pt-content-secondary">
              Spacing
            </p>
            <h1 class="m-0 font-pt-highlight text-pt-3xl font-extrabold leading-pt-tight text-pt-content-default">
              Escala de espacamentos
            </h1>
            <p class="m-0 max-w-3xl text-pt-body-medium text-pt-content-default">
              Esta pagina lista os tokens de espacamento expostos pelo tema Tailwind da biblioteca e seus valores finais em px.
            </p>
          </header>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              Tokens disponiveis
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              A escala segue o principio de eight-point sempre que aplicavel, com alguns tokens derivados de rem no tema e convertidos aqui para base de 16px.
              Esses valores podem ser utilizados nos padroes de espacamento do Tailwind, como margin, padding, gap e outras utilidades relacionadas, por exemplo 'm-pt-4'.
            </p>
            <div class="mt-pt-3 grid gap-pt-2 xl:grid-cols-8">
              <article
                v-for="item in spacingTokens"
                :key="item.token"
                class="flex flex-col gap-1 rounded-pt-1 bg-pt-surface-3 p-pt-3"
              >
                <code class="text-pt-body-small text-pt-content-secondary">{{ item.token }}</code>
                <span class="text-pt-body-small font-medium text-pt-content-default">{{ item.value }}</span>
              </article>
            </div>
          </section>
        </div>
      </main>
    `
  })
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {};
