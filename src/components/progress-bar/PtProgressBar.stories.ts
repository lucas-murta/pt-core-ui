import type { Meta, StoryObj } from '@storybook/vue3';

import PtProgressBar from './PtProgressBar.vue';

const variantOptions = [
  'primary',
  'secondary',
  'info',
  'system',
  'warning',
  'positive',
  'negative'
] as const;

const meta = {
  title: 'Components/PtProgressBar',
  component: PtProgressBar,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'small',
    percent: 40,
    text: '',
    className: ''
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions
    },
    size: {
      control: 'radio',
      options: ['small', 'large']
    },
    percent: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    text: {
      control: 'text'
    },
    className: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtProgressBar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2">
        <PtProgressBar v-bind="args" />
        <span class="text-pt-body-small text-pt-content-default">
          Use os controles para validar variante, tamanho, percentual e texto.
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { PtProgressBar },
    setup() {
      return { variantOptions };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3">
        <PtProgressBar
          v-for="variant in variantOptions"
          :key="variant"
          :variant="variant"
          :percent="65"
          :text="variant"
        />
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { PtProgressBar },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3">
        <PtProgressBar size="small" :percent="45" text="Small" />
        <PtProgressBar size="large" :percent="45" text="Large" />
      </div>
    `
  })
};

export const Steps: Story = {
  render: () => ({
    components: { PtProgressBar },
    setup() {
      return { steps: [0, 25, 50, 75, 100] };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3">
        <PtProgressBar
          v-for="step in steps"
          :key="step"
          variant="positive"
          size="large"
          :percent="step"
          :text="step + '%'"
        />
      </div>
    `
  })
};

export const WithoutText: Story = {
  render: () => ({
    components: { PtProgressBar },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3">
        <PtProgressBar variant="info" :percent="30" />
        <PtProgressBar variant="warning" size="large" :percent="80" />
      </div>
    `
  })
};
