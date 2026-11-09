import type { Meta, StoryObj } from '@storybook/vue3';
import { onMounted, ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIdCard, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

import type { PtInputRef } from './PtInput.interface';
import PtInput from './PtInput.vue';

library.add(faUser, faPhone, faIdCard);

const typeOptions = [
  'text',
  'password',
  'email',
  'search',
  'tel',
  'url',
  'number',
  'date',
  'datetime',
  'datetime-local',
  'month',
  'week',
  'time'
] as const;

const meta = {
  title: 'Components/PtInput',
  component: PtInput,
  tags: ['autodocs'],
  args: {
    defaultValue: '',
    label: 'Nome',
    type: 'text',
    placeholder: 'Digite aqui',
    disabled: false,
    readOnly: false,
    required: false,
    maxLength: undefined,
    className: '',
    icon: undefined,
    messageInfo: '',
    messageDanger: '',
    messageSuccess: '',
    mask: undefined
  },
  argTypes: {
    defaultValue: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    type: {
      control: 'select',
      options: typeOptions
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
    maxLength: {
      control: 'number'
    },
    className: {
      control: 'text'
    },
    icon: {
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
    mask: {
      control: 'radio',
      options: [undefined, 'phone-br', 'cpf']
    },
    value: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtInput },
    setup() {
      const value = ref(String(args.defaultValue ?? ''));

      return { args, value };
    },
    template: `
      <div class="max-w-pt-64">
        <div class="flex flex-col gap-pt-3">
          <PtInput
            v-bind="args"
            @update:value="value = String($event)"
          />
          <span class="text-pt-body-small text-pt-content-default">
            Valor atual: {{ value || 'vazio' }}
          </span>
        </div>
      </div>
    `
  })
} satisfies Meta<typeof PtInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => ({
    components: { PtInput },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-4">
        <PtInput label="Default" placeholder="Digite aqui" />
        <PtInput disabled label="Disabled" default-value="Desabilitado" />
        <PtInput read-only label="Read only" default-value="Somente leitura" />
      </div>
    `
  })
};

export const FieldStates: Story = {
  render: () => ({
    components: { PtInput },
    setup() {
      const errorRef = ref<PtInputRef | null>(null);

      onMounted(() => errorRef.value?.setInvalidity());

      return { errorRef };
    },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-4">
        <PtInput
          icon="user"
          label="Label"
          placeholder="Digite aqui..."
          message-info="Mensagem auxiliar"
        />
        <PtInput
          ref="errorRef"
          icon="user"
          label="Label"
          placeholder="Digite aqui..."
          message-danger="Mensagem auxiliar"
        />
        <PtInput
          icon="user"
          label="Label"
          placeholder="Digite aqui..."
          message-success="Mensagem auxiliar"
        />
        <PtInput
          disabled
          icon="user"
          label="Label"
          placeholder="Digite aqui..."
          message-info="Mensagem auxiliar"
        />
      </div>
    `
  })
};

export const WithMessages: Story = {
  render: () => ({
    components: { PtInput },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-4">
        <PtInput
          label="Info"
          placeholder="Campo informativo"
          message-info="Preencha com seu nome completo"
        />
        <PtInput
          label="Danger"
          required
          message-danger="Campo obrigatório"
        />
        <PtInput
          label="Success"
          default-value="Valor válido"
          message-success="Tudo certo por aqui"
        />
      </div>
    `
  })
};

export const WithMaskAndCounter: Story = {
  render: () => ({
    components: { PtInput },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-4">
        <PtInput
          type="tel"
          mask="phone-br"
          icon="phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
        />
        <PtInput
          mask="cpf"
          icon="id-card"
          max-length="14"
          label="CPF"
          placeholder="000.000.000-00"
        />
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtInput },
    setup() {
      const value = ref('');

      return { value };
    },
    template: `
      <div class="flex max-w-pt-64 flex-col gap-pt-3">
        <PtInput
          :value="value"
          icon="user"
          label="Campo controlado"
          placeholder="Digite algo"
          @update:value="value = String($event)"
        />
        <span class="text-pt-body-small text-pt-content-default">
          Valor controlado: {{ value || 'vazio' }}
        </span>
      </div>
    `
  })
};
