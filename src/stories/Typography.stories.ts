import type { Meta, StoryObj } from '@storybook/vue3';

const fontFamilies = [
  {
    token: 'font-pt-heading',
    family: 'Afacad',
    note: 'Usada para headings do Design System.',
    previewClass: 'font-pt-heading'
  },
  {
    token: 'font-pt-highlight',
    family: 'Space Grotesk',
    note: 'Usada para textos de destaque e titulos com mais personalidade.',
    previewClass: 'font-pt-highlight'
  },
  {
    token: 'font-pt-body',
    family: 'Space Grotesk',
    note: 'Usada para textos corridos, descricoes e apoio.',
    previewClass: 'font-pt-body'
  }
] as const;

const typographyVariantDefs = [
  [
    'text-pt-hero-title',
    'Hero Title',
    '3rem / 1.5 / 800',
    'font-pt-heading text-pt-hero-title'
  ],
  [
    'text-pt-heading-1',
    'Heading 1',
    '3rem / 1.1 / 800',
    'font-pt-heading text-pt-heading-1'
  ],
  [
    'text-pt-heading-2',
    'Heading 2',
    '2.25rem / 1.1 / 800',
    'font-pt-heading text-pt-heading-2'
  ],
  [
    'text-pt-heading-3',
    'Heading 3',
    '1.875rem / 1.25 / 800',
    'font-pt-heading text-pt-heading-3'
  ],
  [
    'text-pt-heading-4',
    'Heading 4',
    '1.5rem / 1.25 / 800',
    'font-pt-heading text-pt-heading-4'
  ],
  [
    'text-pt-highlight-large',
    'Highlight Large',
    '1.5rem / 1.5 / 800',
    'font-pt-highlight text-pt-highlight-large'
  ],
  [
    'text-pt-highlight-medium',
    'Highlight Medium',
    '1.125rem / 1.5 / 800',
    'font-pt-highlight text-pt-highlight-medium'
  ],
  [
    'text-pt-body-large',
    'Body Large',
    '1.125rem / 1.75 / 400',
    'font-pt-body text-pt-body-large'
  ],
  [
    'text-pt-body-medium',
    'Body Medium',
    '1rem / 1.75 / 400',
    'font-pt-body text-pt-body-medium'
  ],
  [
    'text-pt-body-small',
    'Body Small',
    '0.875rem / 1.5 / 400',
    'font-pt-body text-pt-body-small'
  ]
] as const;

const typographyVariants = typographyVariantDefs.map(
  ([token, sample, meta, className]) => ({
    token,
    sample,
    meta,
    className
  })
);

const meta = {
  title: 'Typography',
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
        afacadImport: "import '@pauta/pt-core-ui/afacad.css';",
        spaceGroteskImport: "import '@pauta/pt-core-ui/space-grotesk.css';",
        usageExample: `<h1 class="font-pt-highlight text-pt-heading-2">
  Titulo de destaque
</h1>

<p class="font-pt-body text-pt-body-medium">
  Texto de apoio com a tipografia base da biblioteca.
</p>`,
        fontFamilies,
        typographyVariants
      };
    },
    template: `
      <main class="min-h-screen bg-pt-surface-3 px-pt-6 py-pt-8 text-pt-content-default">
        <div class="mx-auto flex w-full max-w-5xl flex-col gap-pt-6">
          <header class="flex flex-col gap-pt-2">
            <p class="m-0 text-pt-body-small font-medium uppercase tracking-[0.12em] text-pt-content-secondary">
              Typography
            </p>
            <h1 class="m-0 font-pt-highlight text-pt-3xl font-extrabold leading-pt-tight text-pt-content-default">
              Tipografia da biblioteca
            </h1>
            <p class="m-0 max-w-3xl text-pt-body-medium text-pt-content-default">
              Esta pagina documenta as familias e variacoes tipograficas expostas pelo tema Tailwind da lib, alem dos imports publicos necessarios para carregar as fontes nos projetos consumidores.
            </p>
          </header>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              1. Import das fontes
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Importe os arquivos de fonte publicos antes de consumir os tokens tipograficos:
            </p>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ afacadImport }}</code></pre>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ spaceGroteskImport }}</code></pre>
          </section>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              2. Familias disponiveis
            </h2>
            <div class="mt-pt-3 grid gap-pt-3">
              <article
                v-for="family in fontFamilies"
                :key="family.token"
                class="rounded-pt-1 border border-pt-border-1 bg-pt-surface-3 p-pt-3"
              >
                <div class="flex flex-col gap-pt-2">
                  <div class="flex flex-wrap items-center gap-pt-2">
                    <code class="text-pt-body-small text-pt-content-secondary">{{ family.token }}</code>
                    <span class="text-pt-body-small text-pt-content-default">{{ family.family }}</span>
                  </div>
                  <p class="m-0 text-pt-body-small text-pt-content-default">
                    {{ family.note }}
                  </p>
                  <p :class="family.previewClass" class="m-0 text-pt-2xl text-pt-content-default">
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              3. Escala tipografica
            </h2>
            <div class="mt-pt-3 flex flex-col gap-pt-3">
              <article
                v-for="variant in typographyVariants"
                :key="variant.token"
                class="rounded-pt-1 border border-pt-border-1 bg-pt-surface-3 p-pt-3"
              >
                <div class="flex flex-col gap-pt-2">
                  <div class="flex flex-wrap items-center gap-pt-2">
                    <code class="text-pt-body-small text-pt-content-secondary">{{ variant.token }}</code>
                    <span class="text-pt-body-small text-pt-content-default">{{ variant.meta }}</span>
                  </div>
                  <p :class="variant.className" class="m-0 text-pt-content-default">
                    {{ variant.sample }}
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-4">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              4. Exemplo de uso
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Combine as classes de familia e tamanho semantico diretamente nos componentes do projeto consumidor.
            </p>
            <pre class="mb-0 mt-pt-2 overflow-x-auto rounded-pt-1 bg-pt-surface-3 p-pt-3 text-pt-body-small text-pt-content-default"><code>{{ usageExample }}</code></pre>
          </section>
        </div>
      </main>
    `
  })
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = {};
