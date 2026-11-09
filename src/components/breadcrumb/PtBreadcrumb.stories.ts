import type { Meta, StoryObj } from '@storybook/vue3';

import PtBreadcrumb from './PtBreadcrumb.vue';

const categoria = [
  { label: 'Inicio', href: '/' },
  { label: 'Eletronicos', href: '/eletronicos' },
  { label: 'Notebooks', href: '/eletronicos/notebooks' },
  { label: 'Ultrabook Pro 14' }
];

const meta = {
  title: 'Components/PtBreadcrumb',
  component: PtBreadcrumb,
  tags: ['autodocs'],
  args: {
    items: categoria,
    minItems: 2,
    ariaLabel: 'Breadcrumb',
    className: ''
  },
  argTypes: {
    items: { control: 'object' },
    minItems: { control: { type: 'number', min: 1 } },
    ariaLabel: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtBreadcrumb },
    setup() {
      return { args };
    },
    template: `
      <div class="w-full max-w-pt-128 p-pt-3">
        <PtBreadcrumb v-bind="args" />
      </div>
    `
  })
} satisfies Meta<typeof PtBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Paths: Story = {
  name: 'Caminhos da plataforma',
  render: () => ({
    components: { PtBreadcrumb },
    setup() {
      return {
        caminhos: [
          categoria,
          [
            { label: 'Inicio', href: '/' },
            { label: 'Eletronicos', href: '/eletronicos' },
            { label: 'Notebooks' }
          ],
          [
            { label: 'Moda', href: '/moda' },
            { label: 'Calcados', href: '/moda/calcados' },
            { label: 'Tenis corrida', href: '/moda/calcados/tenis' },
            { label: 'Performance X1' }
          ],
          [
            { label: 'Inicio', href: '/' },
            { label: 'Institucional', href: '/' },
            { label: 'Termos de uso' }
          ]
        ]
      };
    },
    template: `
      <div class="flex w-full max-w-pt-128 flex-col gap-pt-3 p-pt-3">
        <PtBreadcrumb
          v-for="(items, index) in caminhos"
          :key="index"
          :items="items"
        />
      </div>
    `
  })
};

export const LongLabels: Story = {
  name: 'Rotulos longos e rolagem',
  render: () => ({
    components: { PtBreadcrumb },
    setup() {
      return {
        items: [
          { label: 'Inicio', href: '/' },
          { label: 'Eletronicos', href: '/eletronicos' },
          { label: 'Marcas', href: '/marcas' },
          {
            label: 'Ultrabook Pro 14 Polegadas Edicao Especial',
            href: '/marcas/ultrabook'
          },
          { label: 'Ultrabook Pro 14 Polegadas Edicao Especial com 32GB' }
        ]
      };
    },
    template: `
      <div class="w-full max-w-pt-64 p-pt-3">
        <PtBreadcrumb :items="items" />
      </div>
    `
  })
};

export const CustomSeparator: Story = {
  name: 'Separador proprio',
  render: () => ({
    components: { PtBreadcrumb },
    setup() {
      return { items: categoria };
    },
    template: `
      <div class="w-full max-w-pt-128 p-pt-3">
        <PtBreadcrumb :items="items">
          <template #separator>/</template>
        </PtBreadcrumb>
      </div>
    `
  })
};
