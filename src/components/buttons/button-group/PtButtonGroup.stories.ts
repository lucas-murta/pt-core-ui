import type { Meta, StoryObj } from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ref, watch } from 'vue';

import PtButton from '../button/PtButton.vue';
import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant
} from '../button/PtButton.interface';
import PtButtonGroup from './PtButtonGroup.vue';
import type {
  PtButtonGroupOrientation,
  PtButtonGroupValue
} from './PtButtonGroup.interface';

const variantOptions = ['solid', 'outline', 'text', 'ghost'] as const;
const colorOptions = ['primary', 'secondary', 'positive', 'negative'] as const;
const sizeOptions = ['small', 'medium', 'large'] as const;
const orientationOptions = ['horizontal', 'vertical'] as const;

library.add(faFacebookF, faInstagram);

type ButtonGroupStoryArgs = {
  value?: PtButtonGroupValue;
  defaultValue?: PtButtonGroupValue;
  multiple: boolean;
  orientation: PtButtonGroupOrientation;
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  disabled: boolean;
  className: string;
};

const buttonItems = [
  ['eletronicos', 'Eletronicos'],
  ['moda', 'Moda'],
  ['casa', 'Casa']
] as const;

const renderInteractiveGroup = (
  args: ButtonGroupStoryArgs,
  items = buttonItems
) => ({
  components: { PtButton, PtButtonGroup },
  setup() {
    const value = ref<PtButtonGroupValue>(
      args.value ?? args.defaultValue ?? (args.multiple ? [] : '')
    );

    watch(
      () => [args.value, args.defaultValue, args.multiple] as const,
      ([nextValue, nextDefaultValue, multiple]) => {
        value.value = nextValue ?? nextDefaultValue ?? (multiple ? [] : '');
      },
      { immediate: true }
    );

    return { args, items, value };
  },
  template: `
    <div class="flex flex-col gap-pt-3">
      <PtButtonGroup
        :value="value"
        :multiple="args.multiple"
        :orientation="args.orientation"
        :variant="args.variant"
        :size="args.size"
        :color="args.color"
        :disabled="args.disabled"
        :class-name="args.className"
        @update:value="value = $event"
      >
        <PtButton
          v-for="[itemValue, label] in items"
          :key="itemValue"
          :value="itemValue"
        >
          {{ label }}
        </PtButton>
      </PtButtonGroup>
      <span class="text-pt-body-small text-pt-content-default">
        Valor atual: {{ Array.isArray(value) ? value.join(', ') || 'nenhum' : value || 'nenhum' }}
      </span>
    </div>
  `
});

const meta = {
  title: 'Components/PtButtonGroup',
  component: PtButtonGroup,
  tags: ['autodocs'],
  args: {
    value: undefined,
    defaultValue: 'eletronicos',
    multiple: false,
    orientation: 'horizontal',
    variant: 'solid',
    size: 'medium',
    color: 'primary',
    disabled: false,
    className: ''
  },
  argTypes: {
    value: {
      control: false
    },
    defaultValue: {
      control: false
    },
    multiple: {
      control: 'boolean'
    },
    orientation: {
      control: 'radio',
      options: orientationOptions
    },
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
    disabled: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    }
  },
  render: (args) => renderInteractiveGroup(args as ButtonGroupStoryArgs)
} satisfies Meta<typeof PtButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { PtButton, PtButtonGroup },
    setup() {
      return { colorOptions, variantOptions };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <div
          v-for="variant in variantOptions"
          :key="variant"
          class="flex flex-wrap items-center gap-pt-2"
        >
          <PtButtonGroup
            v-for="color in colorOptions"
            :key="variant + color"
            :variant="variant"
            :color="color"
            :default-value="'eletronicos'"
          >
            <PtButton value="eletronicos">Eletronicos</PtButton>
            <PtButton value="moda">Moda</PtButton>
          </PtButtonGroup>
        </div>
      </div>
    `
  })
};

export const Multiple: Story = {
  args: {
    multiple: true,
    defaultValue: ['eletronicos', 'casa'],
    variant: 'outline',
    color: 'positive'
  },
  render: (args) => renderInteractiveGroup(args as ButtonGroupStoryArgs)
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    size: 'small',
    color: 'secondary',
    defaultValue: 'moda'
  },
  render: (args) => renderInteractiveGroup(args as ButtonGroupStoryArgs)
};

export const Controlled: Story = {
  render: () => ({
    components: { PtButton, PtButtonGroup },
    setup() {
      const selected = ref<PtButtonGroupValue>('week');

      return { selected };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtButtonGroup v-model:value="selected" color="secondary">
          <PtButton value="day">Dia</PtButton>
          <PtButton value="week">Semana</PtButton>
          <PtButton value="month">Mes</PtButton>
        </PtButtonGroup>
        <span class="text-pt-body-small text-pt-content-default">
          Selecionado: {{ selected }}
        </span>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'eletronicos',
    color: 'negative'
  },
  render: (args) => renderInteractiveGroup(args as ButtonGroupStoryArgs)
};

export const WithIcons: Story = {
  render: () => ({
    components: { PtButton, PtButtonGroup },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtButtonGroup default-value="instagram" color="secondary" variant="outline">
          <PtButton value="facebook" icon-left="fab:facebook-f">Facebook</PtButton>
          <PtButton value="instagram" icon-left="fab:instagram">Instagram</PtButton>
        </PtButtonGroup>
        <span class="text-pt-body-small text-pt-content-default">
          Os botoes do grupo continuam livres para usar iconLeft e iconRight do PtButton.
        </span>
      </div>
    `
  })
};
