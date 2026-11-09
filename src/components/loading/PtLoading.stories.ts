import type { Meta, StoryObj } from '@storybook/vue3';

import PtLoading from './PtLoading.vue';

const typeOptions = ['arrow', 'spinner', 'cyclical'] as const;
const variantOptions = ['primary', 'secondary', 'tertiary'] as const;
const sizeOptions = ['3', '4', '6', '8'] as const;

const meta = {
  title: 'Components/PtLoading',
  component: PtLoading,
  tags: ['autodocs'],
  args: {
    type: 'arrow',
    variant: 'primary',
    size: '8',
    value: 72,
    className: ''
  },
  argTypes: {
    type: {
      control: 'radio',
      options: typeOptions
    },
    variant: {
      control: 'radio',
      options: variantOptions
    },
    size: {
      control: 'select',
      options: sizeOptions
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    className: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtLoading },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-pt-3">
        <PtLoading v-bind="args" />
        <span class="text-pt-body-small text-pt-content-default">
          Use os controles para validar tipo, tamanho, variante e progresso.
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  render: () => ({
    components: { PtLoading },
    template: `
      <div class="flex flex-wrap items-center gap-pt-4">
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="arrow" size="8" />
          <span class="text-pt-body-small text-pt-content-default">arrow</span>
        </div>
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="spinner" size="8" />
          <span class="text-pt-body-small text-pt-content-default">spinner</span>
        </div>
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="cyclical" size="8" :value="72" />
          <span class="text-pt-body-small text-pt-content-default">cyclical</span>
        </div>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { PtLoading },
    setup() {
      return { sizeOptions };
    },
    template: `
      <div class="flex flex-wrap items-end gap-pt-4">
        <div
          v-for="size in sizeOptions"
          :key="size"
          class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3"
        >
          <PtLoading type="spinner" :size="size" />
          <span class="text-pt-body-small text-pt-content-default">{{ size }}</span>
        </div>
      </div>
    `
  })
};

export const Variants: Story = {
  render: () => ({
    components: { PtLoading },
    template: `
      <div class="flex flex-wrap items-center gap-pt-4">
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="arrow" variant="primary" size="8" />
          <span class="text-pt-body-small text-pt-content-default">primary</span>
        </div>
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="arrow" variant="secondary" size="8" />
          <span class="text-pt-body-small text-pt-content-default">secondary</span>
        </div>
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="arrow" variant="tertiary" size="8" />
          <span class="text-pt-body-small text-pt-content-default">tertiary</span>
        </div>
      </div>
    `
  })
};

export const Progress: Story = {
  render: () => ({
    components: { PtLoading },
    template: `
      <div class="flex flex-wrap items-center gap-pt-4">
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="cyclical" size="8" :value="15" />
          <span class="text-pt-body-small text-pt-content-default">15%</span>
        </div>
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="cyclical" size="8" :value="45" />
          <span class="text-pt-body-small text-pt-content-default">45%</span>
        </div>
        <div class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-3 py-pt-3">
          <PtLoading type="cyclical" size="8" :value="85" />
          <span class="text-pt-body-small text-pt-content-default">85%</span>
        </div>
      </div>
    `
  })
};
