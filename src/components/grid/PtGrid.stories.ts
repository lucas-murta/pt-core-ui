import type { Meta, StoryObj } from '@storybook/vue3';

import PtGrid from './PtGrid.vue';

const spacingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const gridItems = [
  'Pedidos',
  'Produtos',
  'Promocoes',
  'Notificacoes',
  'Historico',
  'Preferencias'
] as const;

const meta = {
  title: 'Components/PtGrid',
  component: PtGrid,
  tags: ['autodocs'],
  args: {
    cols: 2,
    gap: 2,
    gapX: undefined,
    gapY: undefined,
    smCols: undefined,
    mdCols: undefined,
    lgCols: undefined,
    padding: undefined,
    smPadding: undefined,
    mdPadding: undefined,
    lgPadding: undefined,
    margin: undefined,
    smMargin: undefined,
    mdMargin: undefined,
    lgMargin: undefined,
    className: ''
  },
  argTypes: {
    cols: {
      control: 'select',
      options: spacingOptions
    },
    gap: {
      control: 'select',
      options: spacingOptions
    },
    gapX: {
      control: 'select',
      options: spacingOptions
    },
    gapY: {
      control: 'select',
      options: spacingOptions
    },
    smCols: {
      control: 'select',
      options: spacingOptions
    },
    mdCols: {
      control: 'select',
      options: spacingOptions
    },
    lgCols: {
      control: 'select',
      options: spacingOptions
    },
    padding: {
      control: 'text'
    },
    smPadding: {
      control: 'text'
    },
    mdPadding: {
      control: 'text'
    },
    lgPadding: {
      control: 'text'
    },
    margin: {
      control: 'text'
    },
    smMargin: {
      control: 'text'
    },
    mdMargin: {
      control: 'text'
    },
    lgMargin: {
      control: 'text'
    },
    className: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtGrid },
    setup() {
      return { args, gridItems };
    },
    template: `
      <PtGrid v-bind="args">
        <div
          v-for="item in gridItems"
          :key="item"
          class="rounded-pt-1 border border-pt-border-2 bg-pt-surface-1 p-pt-3 text-pt-body-small text-pt-content-default"
        >
          {{ item }}
        </div>
      </PtGrid>
    `
  })
} satisfies Meta<typeof PtGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ResponsiveColumns: Story = {
  args: {
    cols: 1,
    smCols: 2,
    mdCols: 3,
    lgCols: 4,
    gap: 3
  }
};

export const GapVariations: Story = {
  render: () => ({
    components: { PtGrid },
    template: `
      <div class="flex flex-col gap-pt-4">
        <PtGrid :cols="3" :gap="2">
          <div
            v-for="item in 6"
            :key="'gap-' + item"
            class="rounded-pt-1 bg-pt-surface-2 p-pt-3 text-pt-body-small text-pt-content-default"
          >
            gap={{ 2 }} / item {{ item }}
          </div>
        </PtGrid>

        <PtGrid :cols="3" :gap-x="4" :gap-y="1">
          <div
            v-for="item in 6"
            :key="'axis-' + item"
            class="rounded-pt-1 bg-pt-surface-2 p-pt-3 text-pt-body-small text-pt-content-default"
          >
            gapX={{ 4 }} / gapY={{ 1 }} / item {{ item }}
          </div>
        </PtGrid>
      </div>
    `
  })
};

export const SpacingShortcuts: Story = {
  args: {
    cols: 2,
    gap: 2,
    padding: '2 4',
    mdPadding: '3 6',
    margin: '4 auto',
    className:
      'max-w-pt-64 rounded-pt-2 border border-pt-border-2 bg-pt-surface-0'
  }
};

export const DashboardLayout: Story = {
  render: () => ({
    components: { PtGrid },
    template: `
      <div class="flex flex-col gap-pt-4">
        <PtGrid :cols="1" :md-cols="3" gap="3">
          <div class="rounded-pt-2 bg-pt-surface-primary p-pt-4 text-pt-content-default">
            Receita do mes
          </div>
          <div class="rounded-pt-2 bg-pt-surface-1 p-pt-4 text-pt-content-default">
            Pedidos em aberto
          </div>
          <div class="rounded-pt-2 bg-pt-surface-1 p-pt-4 text-pt-content-default">
            Alertas da conta
          </div>
        </PtGrid>

        <PtGrid :cols="1" :lg-cols="2" gap="3">
          <div class="rounded-pt-2 bg-pt-surface-1 p-pt-4 text-pt-content-default">
            Grafico de desempenho
          </div>
          <div class="rounded-pt-2 bg-pt-surface-1 p-pt-4 text-pt-content-default">
            Resumo de campanhas
          </div>
        </PtGrid>
      </div>
    `
  })
};
