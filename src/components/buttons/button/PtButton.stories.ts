import type { Meta, StoryObj } from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

import PtButton from './PtButton.vue';

const variantOptions = ['solid', 'outline', 'text', 'ghost'] as const;
const colorOptions = ['primary', 'secondary', 'positive', 'negative'] as const;
const sizeOptions = ['small', 'medium', 'large'] as const;

library.add(faPlus, faChevronRight);

const meta = {
  title: 'Components/PtButton',
  component: PtButton,
  tags: ['autodocs'],
  args: {
    variant: 'solid',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    type: 'button',
    disabled: false,
    iconLeft: undefined,
    iconRight: undefined,
    className: ''
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions
    },
    size: {
      control: 'radio',
      options: sizeOptions
    },
    color: {
      control: 'select',
      options: colorOptions
    },
    fullWidth: {
      control: 'boolean'
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset']
    },
    disabled: {
      control: 'boolean'
    },
    iconLeft: {
      control: 'text'
    },
    iconRight: {
      control: 'text'
    },
    className: {
      control: 'text'
    },
    value: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtButton },
    setup() {
      return { args };
    },
    template: `
      <div class="max-w-4xl">
        <PtButton v-bind="args">Button</PtButton>
      </div>
    `
  })
} satisfies Meta<typeof PtButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { PtButton },
    setup() {
      return { variantOptions, colorOptions };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <div
          v-for="variant in variantOptions"
          :key="variant"
          class="flex flex-wrap items-center gap-pt-2"
        >
          <PtButton
            v-for="color in colorOptions"
            :key="variant + color"
            :variant="variant"
            :color="color"
          >
            {{ variant }} / {{ color }}
          </PtButton>
        </div>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { PtButton },
    setup() {
      return { sizeOptions };
    },
    template: `
      <div class="flex flex-wrap items-center gap-pt-3">
        <PtButton
          v-for="size in sizeOptions"
          :key="size"
          :size="size"
        >
          {{ size }}
        </PtButton>
      </div>
    `
  })
};

export const WithAdornments: Story = {
  args: {
    iconLeft: 'plus',
    iconRight: 'chevron-right'
  },
  render: (args) => ({
    components: { PtButton },
    setup() {
      return { args };
    },
    template: `
      <PtButton v-bind="args">Continuar</PtButton>
    `
  })
};

export const IconOnly: Story = {
  args: {
    iconLeft: 'plus'
  },
  render: (args) => ({
    components: { PtButton },
    setup() {
      return { args };
    },
    template: `
      <PtButton v-bind="args" />
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'solid',
    color: 'negative'
  },
  render: (args) => ({
    components: { PtButton },
    setup() {
      return { args };
    },
    template: `
      <PtButton v-bind="args">Desabilitado</PtButton>
    `
  })
};
