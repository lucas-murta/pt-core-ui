import type { Meta, StoryObj } from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faLayerGroup,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { onMounted, ref } from 'vue';

import PtOption from '../option/PtOption.vue';
import PtSelect from './PtSelect.vue';
import type { PtSelectRef } from './PtSelect.interface';

library.add(faChevronDown, faLayerGroup, faUser);

const placementOptions = ['auto', 'top', 'bottom', 'left', 'right'] as const;

const optionItems = [
  { name: 'Eletronicos', value: 'eletronicos' },
  { name: 'Moda', value: 'moda' },
  { name: 'Casa', value: 'casa' }
];

const meta = {
  title: 'Components/PtSelect',
  component: PtSelect,
  tags: ['autodocs'],
  args: {
    defaultValue: '',
    label: 'Categoria',
    placeholder: 'Selecione uma opção',
    disabled: false,
    readOnly: false,
    required: false,
    icon: undefined,
    closeOnSelect: true,
    placement: 'auto',
    offset: 8,
    className: '',
    panelClassName: '',
    messageInfo: undefined,
    messageDanger: undefined,
    messageSuccess: undefined
  },
  argTypes: {
    defaultValue: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    readOnly: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    },
    icon: {
      control: 'text'
    },
    closeOnSelect: {
      control: 'boolean'
    },
    placement: {
      control: 'radio',
      options: placementOptions
    },
    offset: {
      control: 'number'
    },
    className: {
      control: 'text'
    },
    panelClassName: {
      control: 'text'
    },
    messageInfo: {
      control: 'text'
    },
    messageDanger: {
      control: 'text'
    },
    messageSuccess: {
      control: 'text'
    },
    options: {
      control: false
    },
    value: {
      control: false
    },
    onValueChange: {
      control: false
    },
    name: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtSelect },
    setup() {
      const value = ref(String(args.defaultValue ?? ''));

      return { args, value, optionItems };
    },
    template: `
      <div class="max-w-pt-64">
        <PtSelect
          v-bind="args"
          :value="value"
          :options="optionItems"
          @update:value="value = String($event)"
        />
      </div>
    `
  })
} satisfies Meta<typeof PtSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithOptions: Story = {
  args: {
    defaultValue: 'eletronicos'
  },
  render: () => ({
    components: { PtSelect },
    setup() {
      return { optionItems };
    },
    template: `
      <div class="max-w-pt-64">
        <PtSelect
          label="Produto"
          default-value="eletronicos"
          :options="optionItems"
        />
      </div>
    `
  })
};

export const WithSlotOptions: Story = {
  render: () => ({
    components: { PtOption, PtSelect },
    template: `
      <div class="max-w-pt-64">
        <PtSelect label="Navegação" placeholder="Selecione uma seção">
          <PtOption value="profile">
            <template #startAdornment>
              <span class="text-pt-content-primary">P</span>
            </template>
            Perfil
          </PtOption>
          <PtOption value="wallet">
            <template #startAdornment>
              <span class="text-pt-content-primary">W</span>
            </template>
            Carteira
          </PtOption>
          <PtOption value="settings">
            <template #startAdornment>
              <span class="text-pt-content-primary">S</span>
            </template>
            Configurações
          </PtOption>
        </PtSelect>
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtSelect },
    setup() {
      const value = ref('eletronicos');

      return { value, optionItems };
    },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-3">
        <PtSelect
          :value="value"
          label="Modo controlado"
          :options="optionItems"
          @update:value="value = String($event)"
        />
        <span class="text-pt-body-small text-pt-content-default">
          Valor atual: {{ value }}
        </span>
      </div>
    `
  })
};

export const FieldStates: Story = {
  render: () => ({
    components: { PtSelect },
    setup() {
      const errorRef = ref<PtSelectRef | null>(null);

      onMounted(() => errorRef.value?.setInvalidity());

      return { errorRef, optionItems };
    },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-4">
        <PtSelect
          icon="user"
          label="Label"
          placeholder="Selecione..."
          message-info="Mensagem auxiliar"
          :options="optionItems"
        />
        <PtSelect
          ref="errorRef"
          icon="user"
          label="Label"
          placeholder="Selecione..."
          message-danger="Mensagem auxiliar"
          :options="optionItems"
        />
        <PtSelect
          icon="user"
          label="Label"
          default-value="eletronicos"
          message-success="Mensagem auxiliar"
          :options="optionItems"
        />
        <PtSelect
          disabled
          icon="user"
          label="Label"
          placeholder="Selecione..."
          message-info="Mensagem auxiliar"
          :options="optionItems"
        />
      </div>
    `
  })
};

export const WithIconAndMessages: Story = {
  args: {
    icon: 'layer-group',
    messageInfo: 'Selecione a categoria do usuário'
  },
  render: (args) => ({
    components: { PtSelect },
    setup() {
      return { args, optionItems };
    },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-3">
        <PtSelect
          v-bind="args"
          label="Categoria"
          :options="optionItems"
        />
        <PtSelect
          icon="user"
          label="Perfil obrigatório"
          required
          message-danger="Seleção obrigatória"
          :options="optionItems"
        />
      </div>
    `
  })
};
