import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtButton from '../buttons/button/PtButton.vue';
import PtDropdown from './PtDropdown.vue';

const placementOptions = ['auto', 'top', 'bottom', 'left', 'right'] as const;
const widthOptions = ['auto', 'full', '32', '40', '48'] as const;

const meta = {
  title: 'Components/PtDropdown',
  component: PtDropdown,
  tags: ['autodocs'],
  args: {
    placement: 'auto',
    width: 'auto',
    offset: 8,
    defaultOpen: false,
    closeOnOutsideClick: true,
    className: '',
    panelClassName: ''
  },
  argTypes: {
    placement: {
      control: 'radio',
      options: placementOptions
    },
    width: {
      control: 'select',
      options: widthOptions
    },
    offset: {
      control: 'number'
    },
    defaultOpen: {
      control: 'boolean'
    },
    closeOnOutsideClick: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    },
    panelClassName: {
      control: 'text'
    },
    open: {
      control: false
    },
    onOpenChange: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtButton, PtDropdown },
    setup() {
      return { args };
    },
    template: `
      <div class="min-h-[280px] p-pt-6">
        <PtDropdown v-bind="args">
          <template #trigger>
            <PtButton variant="outline">Abrir menu</PtButton>
          </template>

          <div class="flex min-w-pt-40 flex-col gap-pt-1">
            <button
              type="button"
              class="rounded-pt-1 px-pt-2 py-pt-1 text-left text-pt-body-small text-pt-content-default hover:bg-pt-surface-2"
            >
              Perfil
            </button>
            <button
              type="button"
              class="rounded-pt-1 px-pt-2 py-pt-1 text-left text-pt-body-small text-pt-content-default hover:bg-pt-surface-2"
            >
              Configurações
            </button>
            <button
              type="button"
              class="rounded-pt-1 px-pt-2 py-pt-1 text-left text-pt-body-small text-pt-content-negative hover:bg-pt-surface-negative"
            >
              Sair
            </button>
          </div>
        </PtDropdown>
      </div>
    `
  })
} satisfies Meta<typeof PtDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Placements: Story = {
  render: () => ({
    components: { PtButton, PtDropdown },
    setup() {
      return { placementOptions };
    },
    template: `
      <div class="grid min-h-[520px] grid-cols-2 gap-pt-6 p-pt-6">
        <div
          v-for="placement in placementOptions"
          :key="placement"
          class="flex items-center justify-center rounded-pt-1 border border-pt-border-2 bg-pt-surface-1 p-pt-6"
        >
          <PtDropdown
            :placement="placement"
            :default-open="true"
            :close-on-outside-click="false"
          >
            <template #trigger>
              <PtButton variant="outline">{{ placement }}</PtButton>
            </template>

            <div class="min-w-pt-32 text-pt-body-small text-pt-content-default">
              Placement: {{ placement }}
            </div>
          </PtDropdown>
        </div>
      </div>
    `
  })
};

export const FullWidth: Story = {
  args: {
    width: 'full',
    panelClassName: 'p-pt-2'
  },
  render: (args) => ({
    components: { PtButton, PtDropdown },
    setup() {
      return { args };
    },
    template: `
      <div class="max-w-pt-64 p-pt-6">
        <PtDropdown v-bind="args">
          <template #trigger>
            <PtButton full-width>Dropdown com largura total</PtButton>
          </template>

          <div class="flex flex-col gap-pt-2">
            <div class="text-pt-body-small text-pt-content-default">
              O painel acompanha a largura do trigger.
            </div>
            <div class="rounded-pt-1 bg-pt-surface-2 p-pt-2 text-pt-body-small text-pt-content-default">
              width="full"
            </div>
          </div>
        </PtDropdown>
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtButton, PtDropdown },
    setup() {
      const open = ref(false);

      return { open };
    },
    template: `
      <div class="flex min-h-[280px] flex-col items-start gap-pt-3 p-pt-6">
        <PtDropdown :open="open" @update:open="open = $event">
          <template #trigger>
            <PtButton>{{ open ? 'Fechar' : 'Abrir' }} menu controlado</PtButton>
          </template>

          <div class="min-w-pt-40 p-pt-1">
            <p class="text-pt-body-small text-pt-content-default">
              O estado aberto é controlado externamente.
            </p>
          </div>
        </PtDropdown>

        <span class="text-pt-body-small text-pt-content-default">
          Estado atual: {{ open ? 'aberto' : 'fechado' }}
        </span>
      </div>
    `
  })
};

export const TriggerAsChild: Story = {
  render: () => ({
    components: { PtButton, PtDropdown },
    template: `
      <div class="min-h-[280px] p-pt-6">
        <PtDropdown trigger-as-child>
          <template #trigger="{ open, toggle, setTriggerEl, attrs }">
            <PtButton
              :ref="setTriggerEl"
              variant="outline"
              v-bind="attrs"
              @click="toggle"
            >
              {{ open ? 'Fechar ações' : 'Abrir ações' }}
            </PtButton>
          </template>

          <div class="flex min-w-pt-40 flex-col gap-pt-2 p-pt-1">
            <span class="text-pt-body-small text-pt-content-default">
              Trigger delegado ao slot filho.
            </span>
            <div class="rounded-pt-1 bg-pt-surface-2 p-pt-2 text-pt-body-small text-pt-content-default">
              Recebe open, toggle, setTriggerEl e attrs.
            </div>
          </div>
        </PtDropdown>
      </div>
    `
  })
};
