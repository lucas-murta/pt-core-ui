import type { Meta, StoryObj } from '@storybook/vue3';

import PtBadge from './PtBadge.vue';

const variantOptions = [
  'info',
  'system',
  'warning',
  'positive',
  'negative'
] as const;

const meta = {
  title: 'Components/PtBadge',
  component: PtBadge,
  tags: ['autodocs'],
  args: {
    variant: 'info',
    size: 'small',
    value: undefined,
    pulse: false,
    className: ''
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions
    },
    size: {
      control: 'radio',
      options: ['small', 'medium']
    },
    value: {
      control: 'text'
    },
    pulse: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtBadge },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-pt-3">
        <PtBadge v-bind="args" />
        <span class="text-pt-body-small text-pt-content-default">
          Use os controles para validar variante, tamanho, valor e pulse.
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Dots: Story = {
  render: () => ({
    components: { PtBadge },
    setup() {
      return { variantOptions };
    },
    template: `
      <div class="flex flex-wrap items-center gap-pt-3">
        <div
          v-for="variant in variantOptions"
          :key="variant"
          class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-1"
        >
          <PtBadge :variant="variant" />
          <span class="text-pt-body-small text-pt-content-default">{{ variant }}</span>
        </div>
      </div>
    `
  })
};

export const Values: Story = {
  render: () => ({
    components: { PtBadge },
    template: `
      <div class="flex flex-wrap items-center gap-pt-3">
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-1">
          <PtBadge variant="info" :value="7" />
          <span class="text-pt-body-small text-pt-content-default">Numero</span>
        </div>
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-1">
          <PtBadge variant="negative" :value="120" />
          <span class="text-pt-body-small text-pt-content-default">99+</span>
        </div>
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-1">
          <PtBadge variant="system" value="LIVE" />
          <span class="text-pt-body-small text-pt-content-default">String</span>
        </div>
      </div>
    `
  })
};

export const Pulse: Story = {
  render: () => ({
    components: { PtBadge },
    template: `
      <div class="flex flex-wrap items-center gap-pt-4">
        <div class="flex items-center gap-pt-2">
          <PtBadge variant="positive" pulse />
          <span class="text-pt-body-small text-pt-content-default">Dot com pulse</span>
        </div>
        <div class="flex items-center gap-pt-2">
          <PtBadge variant="warning" size="medium" :value="3" pulse />
          <span class="text-pt-body-small text-pt-content-default">Value com pulse</span>
        </div>
      </div>
    `
  })
};
