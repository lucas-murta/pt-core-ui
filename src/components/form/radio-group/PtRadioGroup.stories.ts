import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtRadio from '../radio/PtRadio.vue';
import PtRadioGroup from './PtRadioGroup.vue';

const orientationOptions = ['vertical', 'horizontal'] as const;

const meta = {
  title: 'Components/PtRadioGroup',
  component: PtRadioGroup,
  tags: ['autodocs'],
  args: {
    defaultValue: 'b',
    disabled: false,
    dense: false,
    orientation: 'vertical',
    className: ''
  },
  argTypes: {
    defaultValue: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    dense: {
      control: 'boolean'
    },
    orientation: {
      control: 'radio',
      options: orientationOptions
    },
    className: {
      control: 'text'
    },
    value: {
      control: false
    },
    onValueChange: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtRadio, PtRadioGroup },
    setup() {
      const value = ref(String(args.defaultValue ?? ''));

      return { args, value };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtRadioGroup
          v-bind="args"
          :value="value"
          @update:value="value = $event"
        >
          <PtRadio value="a" label="Opção A" />
          <PtRadio value="b" label="Opção B" />
          <PtRadio value="c" label="Opção C" />
        </PtRadioGroup>
        <span class="text-pt-body-small text-pt-content-default">
          Selecionado: {{ value }}
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  render: () => ({
    components: { PtRadio, PtRadioGroup },
    template: `
      <PtRadioGroup default-value="b">
        <PtRadio value="a" label="Opção A" />
        <PtRadio value="b" label="Opção B" />
        <PtRadio value="c" label="Opção C" />
      </PtRadioGroup>
    `
  })
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal'
  },
  render: () => ({
    components: { PtRadio, PtRadioGroup },
    template: `
      <PtRadioGroup orientation="horizontal" default-value="eletronicos">
        <PtRadio value="eletronicos" label="Eletronicos" />
        <PtRadio value="moda" label="Moda" />
        <PtRadio value="casa" label="Casa" />
      </PtRadioGroup>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: () => ({
    components: { PtRadio, PtRadioGroup },
    template: `
      <PtRadioGroup disabled default-value="a">
        <PtRadio value="a" label="Desabilitado A" />
        <PtRadio value="b" label="Desabilitado B" />
      </PtRadioGroup>
    `
  })
};

export const Dense: Story = {
  args: {
    dense: true
  },
  render: () => ({
    components: { PtRadio, PtRadioGroup },
    template: `
      <PtRadioGroup dense default-value="b">
        <PtRadio value="a" label="Compacto A" />
        <PtRadio value="b" label="Compacto B" />
        <PtRadio value="c" label="Compacto C" />
      </PtRadioGroup>
    `
  })
};
