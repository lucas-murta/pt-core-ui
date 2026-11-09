import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtOption from './PtOption.vue';

const meta = {
  title: 'Components/PtOption',
  component: PtOption,
  tags: ['autodocs'],
  args: {
    value: 'profile',
    selected: false,
    className: ''
  },
  argTypes: {
    value: {
      control: 'text'
    },
    selected: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    },
    onClick: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtOption },
    setup() {
      const count = ref(0);
      const handleClick = () => {
        count.value += 1;
      };

      return { args, count, handleClick };
    },
    template: `
      <div class="max-w-pt-48">
        <div class="flex flex-col gap-pt-3">
          <PtOption
            v-bind="args"
            :on-click="handleClick"
          >
            Option
          </PtOption>
          <span class="text-pt-body-small text-pt-content-default">
            Cliques: {{ count }}
          </span>
        </div>
      </div>
    `
  })
} satisfies Meta<typeof PtOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => ({
    components: { PtOption },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-1">
        <PtOption value="default">Default</PtOption>
        <PtOption value="selected" selected>Selected</PtOption>
        <PtOption value="custom" class-name="text-pt-content-primary">
          Custom class
        </PtOption>
      </div>
    `
  })
};

export const WithAdornments: Story = {
  render: () => ({
    components: { PtOption },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-1">
        <PtOption value="wallet">
          <template #startAdornment>
            <span class="text-pt-body-small text-pt-content-primary">R$</span>
          </template>

          Carteira

          <template #endAdornment>
            <span class="text-pt-body-small text-pt-content-primary">+</span>
          </template>
        </PtOption>

        <PtOption value="profile" selected>
          <template #startAdornment>
            <span class="text-pt-body-small text-pt-content-primary">@</span>
          </template>

          Perfil

          <template #endAdornment>
            <span class="text-pt-body-small text-pt-content-primary">OK</span>
          </template>
        </PtOption>
      </div>
    `
  })
};

export const SelectableList: Story = {
  render: () => ({
    components: { PtOption },
    setup() {
      const selected = ref('settings');
      const items = [
        { value: 'profile', label: 'Perfil' },
        { value: 'settings', label: 'Configurações' },
        { value: 'logout', label: 'Sair' }
      ];

      return { selected, items };
    },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-1">
        <PtOption
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :selected="selected === item.value"
          :on-click="() => (selected = item.value)"
        >
          {{ item.label }}
        </PtOption>

        <span class="mt-pt-2 text-pt-body-small text-pt-content-default">
          Selecionado: {{ selected }}
        </span>
      </div>
    `
  })
};
