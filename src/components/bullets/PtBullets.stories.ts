import type { Meta, StoryObj } from '@storybook/vue3';

import PtBullets from './PtBullets.vue';

const sizeOptions = ['small', 'medium', 'large'] as const;
const alignOptions = ['left', 'center', 'right'] as const;

const meta = {
  title: 'Components/PtBullets',
  component: PtBullets,
  tags: ['autodocs'],
  args: {
    total: 5,
    modelValue: 1,
    size: 'medium',
    align: 'center',
    interactive: true
  },
  argTypes: {
    size: { control: 'inline-radio', options: sizeOptions },
    align: { control: 'inline-radio', options: alignOptions },
    total: { control: { type: 'number', min: 0, max: 12 } },
    modelValue: { control: { type: 'number', min: 0, max: 11 } }
  },
  render: (args) => ({
    components: { PtBullets },
    setup() {
      return { args };
    },
    template: `
      <div class="rounded-pt-2 bg-pt-surface-1 p-pt-3">
        <PtBullets v-bind="args" />
      </div>
    `
  })
} satisfies Meta<typeof PtBullets>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { PtBullets },
    template: `
      <div class="flex flex-col gap-pt-3 rounded-pt-2 bg-pt-surface-1 p-pt-3">
        <PtBullets
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :total="5"
          :model-value="2"
          :size="size"
        />
      </div>
    `
  })
};

export const Interativo: Story = {
  render: () => ({
    components: { PtBullets },
    setup() {
      return {};
    },
    data: () => ({ current: 0 }),
    template: `
      <div class="flex flex-col items-center gap-pt-2 rounded-pt-2 bg-pt-surface-1 p-pt-3">
        <span class="text-pt-body-small text-pt-content-default">
          Slide ativo: {{ current + 1 }}
        </span>
        <PtBullets v-model="current" :total="6" />
      </div>
    `
  })
};

export const Decorativo: Story = {
  args: {
    interactive: false,
    total: 4,
    modelValue: 3
  }
};
