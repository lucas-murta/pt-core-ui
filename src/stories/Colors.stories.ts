import type { Meta, StoryObj } from '@storybook/vue3';

const toneSteps = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950'
] as const;
const neutralSteps = [
  '0',
  '50',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '750',
  '800',
  '850',
  '900',
  '950'
] as const;

const tokenValue = (token: string) => `var(${token})`;

const createScaleSwatches = (prefix: string, steps: readonly string[]) =>
  steps.map((step) => ({
    label: step,
    token: `--pt-${prefix}-${step}`,
    value: tokenValue(`--pt-${prefix}-${step}`)
  }));

const createSystemicToken = (token: string, example: string) => ({
  token,
  example,
  previewStyle: {
    backgroundColor: tokenValue(token)
  }
});

const primaryPaletteDefs = [
  [
    'Brand Primary',
    'brand-primary',
    'Escala principal da identidade da biblioteca.',
    toneSteps
  ],
  [
    'Brand Secondary',
    'brand-secondary',
    'Escala secundaria usada como apoio e contraste.',
    toneSteps
  ],
  [
    'Neutral',
    'neutral-color',
    'Escala neutra para fundos, textos e composicao.',
    neutralSteps
  ],
  [
    'Neutral Tint',
    'neutral-tint-color',
    'Escala neutra com leve tom do roxo da marca.',
    neutralSteps
  ],
  ['Crema', 'crema-color', 'Escala crema de apoio.', toneSteps],
  ['Info', 'info-color', 'Escala base de informacao.', toneSteps],
  ['System', 'system-color', 'Escala sistemica de apoio.', toneSteps],
  ['Positive', 'positive-color', 'Escala de confirmacao e sucesso.', toneSteps],
  ['Attention', 'attention-color', 'Escala de alerta e atencao.', toneSteps],
  ['Negative', 'negative-color', 'Escala de erro e risco.', toneSteps],
  [
    'Shadow Scale',
    'shadow-scale',
    'Escala translucida para profundidade e sombra.',
    toneSteps
  ],
  [
    'Light Scale',
    'light-scale',
    'Escala translucida clara para contraste e brilho.',
    toneSteps
  ],
  [
    'Bright Scale',
    'bright-scale',
    'Escala translucida clara derivada do branco.',
    toneSteps
  ],
  [
    'Din Scale',
    'din-scale',
    'Escala translucida escura derivada do preto.',
    toneSteps
  ],
  [
    'Neutral Tint Bright Scale',
    'neutral-tint-bright-scale',
    'Escala translucida clara derivada da Neutral Tint 300.',
    toneSteps
  ],
  [
    'Neutral Tint Din Scale',
    'neutral-tint-din-scale',
    'Escala translucida escura derivada da Neutral Tint 950.',
    toneSteps
  ],
  ['Blue', 'blue-color', 'Escala cromatica azul.', toneSteps],
  ['Ocean', 'ocean-color', 'Escala cromatica ocean.', toneSteps],
  ['Green', 'green-color', 'Escala cromatica verde.', toneSteps],
  ['Yellow', 'yellow-color', 'Escala cromatica amarela.', toneSteps],
  ['Orange', 'orange-color', 'Escala cromatica laranja.', toneSteps],
  ['Red', 'red-color', 'Escala cromatica vermelha.', toneSteps],
  ['Pink', 'pink-color', 'Escala cromatica rosa.', toneSteps],
  ['Purple', 'purple-color', 'Escala cromatica roxa.', toneSteps]
] as const;

const primaryPalettes = primaryPaletteDefs.map(
  ([name, prefix, description, steps]) => ({
    name,
    prefix: `--pt-${prefix}-*`,
    description,
    swatches: createScaleSwatches(prefix, steps)
  })
);

const systemicGroups = [
  {
    name: 'Base',
    description:
      'Tokens semanticos principais com mesma nomenclatura entre light e dark. Podem ser usados em bg- ou text-.',
    items: [
      createSystemicToken('--pt-color-brand', 'bg-pt-brand / text-pt-brand'),
      createSystemicToken(
        '--pt-color-primary',
        'bg-pt-primary / text-pt-primary'
      ),
      createSystemicToken(
        '--pt-color-secondary',
        'bg-pt-secondary / text-pt-secondary'
      ),
      createSystemicToken('--pt-color-info', 'bg-pt-info / text-pt-info'),
      createSystemicToken('--pt-color-system', 'bg-pt-system / text-pt-system'),
      createSystemicToken(
        '--pt-color-warning',
        'bg-pt-warning / text-pt-warning'
      ),
      createSystemicToken(
        '--pt-color-positive',
        'bg-pt-positive / text-pt-positive'
      ),
      createSystemicToken(
        '--pt-color-negative',
        'bg-pt-negative / text-pt-negative'
      )
    ]
  },
  {
    name: 'Surface',
    description:
      'Tokens de superficie para composicao de fundo. Use apenas com bg-.',
    items: [
      createSystemicToken('--pt-color-surface-0', 'bg-pt-surface-0'),
      createSystemicToken('--pt-color-surface-1', 'bg-pt-surface-1'),
      createSystemicToken('--pt-color-surface-2', 'bg-pt-surface-2'),
      createSystemicToken('--pt-color-surface-3', 'bg-pt-surface-3'),
      createSystemicToken('--pt-color-surface-4', 'bg-pt-surface-4'),
      createSystemicToken(
        '--pt-color-surface-primary',
        'bg-pt-surface-primary'
      ),
      createSystemicToken(
        '--pt-color-surface-secondary',
        'bg-pt-surface-secondary'
      ),
      createSystemicToken('--pt-color-surface-info', 'bg-pt-surface-info'),
      createSystemicToken('--pt-color-surface-system', 'bg-pt-surface-system'),
      createSystemicToken(
        '--pt-color-surface-warning',
        'bg-pt-surface-warning'
      ),
      createSystemicToken(
        '--pt-color-surface-positive',
        'bg-pt-surface-positive'
      ),
      createSystemicToken(
        '--pt-color-surface-negative',
        'bg-pt-surface-negative'
      )
    ]
  },
  {
    name: 'Content',
    description:
      'Tokens de conteudo para tipografia e leitura. O uso recomendado e text-.',
    items: [
      createSystemicToken(
        '--pt-color-content-default',
        'text-pt-content-default'
      ),
      createSystemicToken(
        '--pt-color-content-disable',
        'text-pt-content-disable'
      ),
      createSystemicToken('--pt-color-content-ghost', 'text-pt-content-ghost'),
      createSystemicToken(
        '--pt-color-content-bright',
        'text-pt-content-bright'
      ),
      createSystemicToken('--pt-color-content-din', 'text-pt-content-din'),
      createSystemicToken(
        '--pt-color-content-primary',
        'text-pt-content-primary'
      ),
      createSystemicToken(
        '--pt-color-content-secondary',
        'text-pt-content-secondary'
      ),
      createSystemicToken('--pt-color-content-info', 'text-pt-content-info'),
      createSystemicToken(
        '--pt-color-content-system',
        'text-pt-content-system'
      ),
      createSystemicToken(
        '--pt-color-content-warning',
        'text-pt-content-warning'
      ),
      createSystemicToken(
        '--pt-color-content-positive',
        'text-pt-content-positive'
      ),
      createSystemicToken(
        '--pt-color-content-negative',
        'text-pt-content-negative'
      )
    ]
  },
  {
    name: 'Border',
    description: 'Tokens para contorno. O uso recomendado e border-.',
    items: [
      createSystemicToken('--pt-color-border-1', 'border-pt-border-1'),
      createSystemicToken('--pt-color-border-2', 'border-pt-border-2'),
      createSystemicToken('--pt-color-border-3', 'border-pt-border-3')
    ]
  },
  {
    name: 'States',
    description: 'Tokens de estado visual. Neste contexto, use com bg-.',
    items: [
      createSystemicToken('--pt-color-focus', 'bg-pt-focus'),
      createSystemicToken('--pt-color-pressed', 'bg-pt-pressed'),
      createSystemicToken(
        '--pt-color-shadow-pressed',
        'var(--pt-color-shadow-pressed)'
      ),
      createSystemicToken('--pt-color-hover', 'bg-pt-hover'),
      createSystemicToken(
        '--pt-color-shadow-hover',
        'var(--pt-color-shadow-hover)'
      )
    ]
  },
  {
    name: 'Shadow',
    description:
      'Tokens de apoio para composicao de sombra e brilho. A documentacao continua no contexto de shadow.',
    items: [
      createSystemicToken(
        '--pt-color-shadow-0',
        'box-shadow com var(--pt-color-shadow-0)'
      ),
      createSystemicToken(
        '--pt-color-shadow-1',
        'box-shadow com var(--pt-color-shadow-1)'
      ),
      createSystemicToken(
        '--pt-color-shadow-2',
        'box-shadow com var(--pt-color-shadow-2)'
      ),
      createSystemicToken(
        '--pt-color-shadow-3',
        'box-shadow com var(--pt-color-shadow-3)'
      ),
      createSystemicToken(
        '--pt-color-light-0',
        'glow com var(--pt-color-light-0)'
      ),
      createSystemicToken(
        '--pt-color-light-1',
        'glow com var(--pt-color-light-1)'
      ),
      createSystemicToken(
        '--pt-color-light-2',
        'glow com var(--pt-color-light-2)'
      ),
      createSystemicToken(
        '--pt-color-light-3',
        'glow com var(--pt-color-light-3)'
      )
    ]
  }
] as const;

const meta = {
  title: 'Colors',
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
        primaryPalettes,
        systemicGroups
      };
    },
    template: `
      <main class="min-h-screen bg-pt-surface-3 px-pt-6 py-pt-8 text-pt-content-default">
        <div class="mx-auto flex w-full max-w-6xl flex-col gap-pt-6">
          <header class="flex flex-col gap-pt-2">
            <p class="m-0 text-pt-body-small font-medium uppercase tracking-[0.12em] text-pt-content-secondary">
              Colors
            </p>
            <h1 class="m-0 font-pt-highlight text-pt-3xl font-extrabold leading-pt-tight text-pt-content-default">
              Cores da biblioteca
            </h1>
            <p class="m-0 max-w-3xl text-pt-body-medium text-pt-content-default">
              Esta pagina usa como base o contrato real de src/css/tokens.css. As paletas primarias mostram as escalas base e as cores sistemicas mostram os aliases semanticos reutilizados entre light e dark.
            </p>
          </header>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-2">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              1. Cores sistemicas
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Aliases semanticos que mantem a mesma nomenclatura nos temas e devem ser aplicados conforme o contexto abaixo.
            </p>
            <div class="mt-pt-3 flex flex-col gap-pt-2">
              <article
                v-for="group in systemicGroups"
                :key="group.name"
                class="rounded-pt-1 border border-pt-border-1 bg-pt-surface-3 p-pt-3"
              >
                <div class="flex flex-col gap-pt-2">
                  <div class="flex flex-col gap-pt-1">
                    <h3 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
                      {{ group.name }}
                    </h3>
                    <p class="m-0 text-pt-body-small text-pt-content-default">
                      {{ group.description }}
                    </p>
                  </div>
                  <div class="grid gap-pt-2 md:grid-cols-3 xl:grid-cols-5">
                    <div
                      v-for="item in group.items"
                      :key="item.token"
                      class="rounded-pt-1 bg-pt-surface-2 p-pt-2"
                    >
                      <div class="flex flex-col gap-pt-2">
                        <div
                          class="flex h-24 items-end rounded-pt-1 p-pt-3"
                          :style="item.previewStyle"
                        >
                        </div>
                        <div class="flex flex-col gap-1">
                          <code class="text-pt-body-small text-pt-content-secondary">{{ item.token }}</code>
                          <p class="m-0 text-pt-body-small text-pt-content-default">
                            <code class="text-pt-content-secondary">{{ item.example }}</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-pt-2 bg-pt-surface-2 p-pt-2">
            <h2 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
              2. Cores primarias
            </h2>
            <p class="mb-0 mt-pt-2 text-pt-body-small text-pt-content-default">
              Escalas base publicadas em tokens.css e usadas como fundacao para o restante do sistema visual.
            </p>
            <div class="mt-pt-3 flex flex-col gap-pt-2">
              <article
                v-for="palette in primaryPalettes"
                :key="palette.name"
                class="rounded-pt-1 border border-pt-border-1 bg-pt-surface-3 p-pt-3"
              >
                <div class="flex flex-col gap-pt-2">
                  <div class="flex flex-col gap-pt-1">
                    <div class="flex flex-wrap items-center gap-pt-2">
                      <h3 class="m-0 text-pt-body-large font-semibold text-pt-content-default">
                        {{ palette.name }}
                      </h3>
                      <code class="text-pt-body-small text-pt-content-secondary">{{ palette.prefix }}</code>
                    </div>
                    <p class="m-0 text-pt-body-small text-pt-content-default">
                      {{ palette.description }}
                    </p>
                  </div>
                  <div class="grid grid-cols-2 gap-pt-2 md:grid-cols-5 xl:grid-cols-5">
                    <div
                      v-for="swatch in palette.swatches"
                      :key="swatch.token"
                      class="rounded-pt-1 bg-pt-surface-2 p-pt-2"
                    >
                      <div
                        class="h-20 rounded-pt-1 border border-pt-border-1"
                        :style="{ backgroundColor: swatch.value }"
                      />
                      <p class="mb-0 mt-pt-2 text-pt-body-small font-medium text-pt-content-default">
                        {{ swatch.label }}
                      </p>
                      <code class="text-pt-body-small text-pt-content-secondary">{{ swatch.token }}</code>
                    </div>
                  </div>
                </div>
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

export const Colors: Story = {};
