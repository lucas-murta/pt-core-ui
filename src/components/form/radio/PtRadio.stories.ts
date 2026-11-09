import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtRadioGroup from '../radio-group/PtRadioGroup.vue';
import PtRadio from './PtRadio.vue';

const meta = {
  title: 'Components/PtRadio',
  component: PtRadio,
  tags: ['autodocs'],
  args: {
    defaultChecked: false,
    disabled: false,
    label: 'Opção',
    className: ''
  },
  argTypes: {
    defaultChecked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    className: {
      control: 'text'
    },
    checked: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtRadio },
    setup() {
      const checked = ref(Boolean(args.defaultChecked));

      return { args, checked };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtRadio
          v-bind="args"
          :checked="checked"
          @update:checked="checked = $event"
        />
        <span class="text-pt-body-small text-pt-content-default">
          Estado atual: {{ checked ? 'marcado' : 'desmarcado' }}
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => ({
    components: { PtRadio },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtRadio label="Unchecked" name="states" value="a" />
        <PtRadio default-checked label="Checked" name="states" value="b" />
        <PtRadio disabled label="Disabled" name="states" value="c" />
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtRadio },
    setup() {
      const checked = ref(false);

      return { checked };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtRadio
          :checked="checked"
          label="Modo controlado"
          @update:checked="checked = $event"
        />
        <span class="text-pt-body-small text-pt-content-default">
          Valor controlado: {{ checked }}
        </span>
      </div>
    `
  })
};

export const WithinGroup: Story = {
  render: () => ({
    components: { PtRadio, PtRadioGroup },
    setup() {
      const value = ref('b');

      return { value };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtRadioGroup :value="value" @update:value="value = $event">
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
};
