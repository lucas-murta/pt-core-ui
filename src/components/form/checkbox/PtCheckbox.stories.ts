import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtCheckbox from './PtCheckbox.vue';

const meta = {
  title: 'Components/PtCheckbox',
  component: PtCheckbox,
  tags: ['autodocs'],
  args: {
    defaultChecked: false,
    disabled: false,
    label: 'Aceito os termos',
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
    components: { PtCheckbox },
    setup() {
      const checked = ref(Boolean(args.defaultChecked));

      return { args, checked };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtCheckbox
          v-bind="args"
          @update:checked="checked = $event"
        />
        <span class="text-pt-body-small text-pt-content-default">
          Estado atual: {{ checked ? 'marcado' : 'desmarcado' }}
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => ({
    components: { PtCheckbox },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtCheckbox label="Unchecked" />
        <PtCheckbox default-checked label="Checked" />
        <PtCheckbox disabled label="Disabled" />
        <PtCheckbox disabled default-checked label="Disabled checked" />
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtCheckbox },
    setup() {
      const checked = ref(false);

      return { checked };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtCheckbox
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

export const WithSlot: Story = {
  render: () => ({
    components: { PtCheckbox },
    template: `
      <div class="flex flex-col gap-pt-3">
        <PtCheckbox>
          <span class="text-pt-body-small text-pt-content-default">
            Quero receber novidades por e-mail
          </span>
        </PtCheckbox>
        <PtCheckbox default-checked>
          <span class="text-pt-body-small text-pt-content-default">
            Confirmo que li as políticas da plataforma
          </span>
        </PtCheckbox>
      </div>
    `
  })
};
