import type { Meta, StoryObj } from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faMoon,
  faSun,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

import PtSwitch from './PtSwitch.vue';

library.add(faCheck, faMoon, faSun, faXmark);

const meta = {
  title: 'Components/PtSwitch',
  component: PtSwitch,
  tags: ['autodocs'],
  args: {
    defaultChecked: false,
    disabled: false,
    label: 'Receber notificações',
    iconOff: undefined,
    iconOn: undefined,
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
    iconOff: {
      control: 'text'
    },
    iconOn: {
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
    components: { PtSwitch },
    setup() {
      const checked = ref(Boolean(args.defaultChecked));

      return { args, checked };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtSwitch
          v-bind="args"
          @update:checked="checked = $event"
        />
        <span class="text-pt-body-small text-pt-content-default">
          Estado atual: {{ checked ? 'ligado' : 'desligado' }}
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => ({
    components: { PtSwitch },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtSwitch label="Unchecked" />
        <PtSwitch default-checked label="Checked" />
        <PtSwitch disabled label="Disabled" />
        <PtSwitch disabled default-checked label="Disabled checked" />
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtSwitch },
    setup() {
      const checked = ref(false);

      return { checked };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtSwitch
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

export const WithIcons: Story = {
  render: () => ({
    components: { PtSwitch },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtSwitch
          label="Confirmação"
          icon-off="xmark"
          icon-on="check"
        />
        <PtSwitch
          default-checked
          label="Tema"
          icon-off="moon"
          icon-on="sun"
        />
      </div>
    `
  })
};

export const WithSlot: Story = {
  render: () => ({
    components: { PtSwitch },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtSwitch>
          <span class="text-pt-body-small text-pt-content-default">
            Ativar atualização automática de saldo
          </span>
        </PtSwitch>
        <PtSwitch default-checked>
          <span class="text-pt-body-small text-pt-content-default">
            Quero receber alertas da plataforma
          </span>
        </PtSwitch>
      </div>
    `
  })
};
