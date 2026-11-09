import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtChip from './PtChip.vue';

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
  title: 'Components/PtChip',
  component: PtChip,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    clickable: false,
    closable: false,
    className: ''
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions
    },
    clickable: {
      control: 'boolean'
    },
    closable: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    },
    onClose: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtChip },
    setup() {
      const clickCount = ref(0);
      const closeCount = ref(0);

      const handleClick = () => {
        clickCount.value += 1;
      };

      const handleClose = () => {
        closeCount.value += 1;
      };

      return { args, clickCount, closeCount, handleClick, handleClose };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <div class="flex items-center gap-pt-3">
          <PtChip
            v-bind="args"
            :on-close="handleClose"
            @click="handleClick"
          >
            Chip
          </PtChip>
          <span class="text-pt-body-small text-pt-content-default">
            Use os controles para validar variante, click e close.
          </span>
        </div>
        <span class="text-pt-body-small text-pt-content-default">
          Clicks: {{ clickCount }} | Closes: {{ closeCount }}
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { PtChip },
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
          <PtChip :variant="variant">{{ variant }}</PtChip>
        </div>
      </div>
    `
  })
};

export const Clickable: Story = {
  args: {
    clickable: true,
    variant: 'secondary'
  },
  render: (args) => ({
    components: { PtChip },
    setup() {
      const count = ref(0);
      const handleClick = () => {
        count.value += 1;
      };

      return { args, count, handleClick };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtChip v-bind="args" @click="handleClick">Clicavel</PtChip>
        <span class="text-pt-body-small text-pt-content-default">
          Clique ou use Enter/Space: {{ count }}
        </span>
      </div>
    `
  })
};

export const Closable: Story = {
  args: {
    closable: true,
    variant: 'info'
  },
  render: (args) => ({
    components: { PtChip },
    setup() {
      const count = ref(0);
      const handleClose = () => {
        count.value += 1;
      };

      return { args, count, handleClose };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtChip v-bind="args" :on-close="handleClose">Fechavel</PtChip>
        <span class="text-pt-body-small text-pt-content-default">
          Fechamentos: {{ count }}
        </span>
      </div>
    `
  })
};
