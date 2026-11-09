import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';

import PtButton from '../buttons/button/PtButton.vue';
import PtTypography from '../typography/PtTypography.vue';
import PtModal from './PtModal.vue';

const variantOptions = [
  'surface-0',
  'surface-1',
  'surface-2',
  'surface-3',
  'surface-4',
  'surface-primary',
  'surface-secondary'
] as const;

const borderOptions = ['none', '1', '2', '3', 'primary', 'secondary'] as const;
const borderRadiusOptions = ['none', '1', '2'] as const;
const elevationOptions = [0, 1, 2, 3, 4] as const;

const meta = {
  title: 'Components/PtModal',
  component: PtModal,
  tags: ['autodocs'],
  args: {
    open: false,
    showCloseButton: false,
    closeOnOutsideClick: false,
    variant: 'surface-1',
    border: 'none',
    borderRadius: '1',
    elevation: 2,
    interactive: false,
    width: '64',
    padding: '4',
    className: ''
  },
  argTypes: {
    open: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
    variant: { control: 'select', options: variantOptions },
    border: { control: 'select', options: borderOptions },
    borderRadius: { control: 'radio', options: borderRadiusOptions },
    elevation: { control: 'radio', options: elevationOptions },
    interactive: { control: 'boolean' },
    width: { control: 'text' },
    padding: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtButton, PtModal, PtTypography },
    setup() {
      const open = ref(false);

      return { args, open };
    },
    template: `
      <div class="min-h-[22rem] rounded-pt-1 bg-pt-surface-2 p-pt-4">
        <PtButton @click="open = true">Abrir modal</PtButton>

        <PtModal
          v-bind="args"
          :open="open"
          @update:open="open = $event"
        >
          <div class="flex flex-col gap-pt-3">
            <PtTypography as="h2" variant="heading-3">Conteúdo do modal</PtTypography>
            <PtTypography as="p" variant="body-medium">
              Use os controles para validar superfície, borda, elevação e comportamento de fechamento.
            </PtTypography>
            <div class="flex justify-end">
              <PtButton variant="outline" @click="open = false">Fechar</PtButton>
            </div>
          </div>
        </PtModal>
      </div>
    `
  })
} satisfies Meta<typeof PtModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: () => ({
    components: { PtButton, PtModal, PtTypography },
    setup() {
      const open = ref(false);

      return { open };
    },
    template: `
      <div class="min-h-[24rem] rounded-pt-1 bg-pt-surface-2 p-pt-4">
        <PtButton @click="open = true">Abrir modal</PtButton>

        <PtModal
          :open="open"
          width="64"
          padding="4"
          show-close-button
          @update:open="open = $event"
        >
          <div class="flex flex-col gap-pt-3">
            <PtTypography as="h2" variant="heading-3">Fluxo controlado</PtTypography>
            <PtTypography as="p" variant="body-medium">
              Esse exemplo mostra o modal sendo controlado por um estado externo.
            </PtTypography>
            <div class="flex justify-end">
              <PtButton variant="outline" @click="open = false">Fechar</PtButton>
            </div>
          </div>
        </PtModal>
      </div>
    `
  })
};

export const CloseOnOutsideClick: Story = {
  render: () => ({
    components: { PtButton, PtModal, PtTypography },
    setup() {
      const open = ref(false);

      return { open };
    },
    template: `
      <div class="min-h-[24rem] rounded-pt-1 bg-pt-surface-2 p-pt-4">
        <PtButton @click="open = true">Abrir com overlay</PtButton>

        <PtModal
          :open="open"
          width="64"
          padding="4"
          show-close-button
          close-on-outside-click
          @update:open="open = $event"
        >
          <div class="flex flex-col gap-pt-3">
            <PtTypography as="h2" variant="heading-3">Fechamento externo</PtTypography>
            <PtTypography as="p" variant="body-medium">
              Clique fora do container ou pressione Escape para fechar o modal.
            </PtTypography>
          </div>
        </PtModal>
      </div>
    `
  })
};

export const Variants: Story = {
  render: () => ({
    components: { PtButton, PtModal, PtTypography },
    setup() {
      const firstOpen = ref(false);
      const secondOpen = ref(false);

      return { firstOpen, secondOpen };
    },
    template: `
      <div class="grid gap-pt-4 rounded-pt-1 bg-pt-surface-2 p-pt-4 md:grid-cols-2">
        <div class="relative min-h-[18rem] rounded-pt-1 bg-pt-surface-3 p-pt-2">
          <PtButton @click="firstOpen = true">Abrir surface-1</PtButton>
          <PtModal
            :open="firstOpen"
            variant="surface-1"
            border="1"
            width="56"
            padding="4"
            @update:open="firstOpen = $event"
          >
            <div class="flex flex-col gap-pt-2">
              <PtTypography as="h2" variant="heading-4">surface-1</PtTypography>
              <PtTypography as="p" variant="body-medium">Modal com borda neutra.</PtTypography>
              <div class="flex justify-end">
                <PtButton variant="outline" @click="firstOpen = false">Fechar</PtButton>
              </div>
            </div>
          </PtModal>
        </div>

        <div class="relative min-h-[18rem] rounded-pt-1 bg-pt-surface-3 p-pt-2">
          <PtButton @click="secondOpen = true">Abrir surface-secondary</PtButton>
          <PtModal
            :open="secondOpen"
            variant="surface-secondary"
            border="secondary"
            width="56"
            padding="4"
            @update:open="secondOpen = $event"
          >
            <div class="flex flex-col gap-pt-2">
              <PtTypography as="h2" variant="heading-4">surface-secondary</PtTypography>
              <PtTypography as="p" variant="body-medium">Modal com ênfase secundária.</PtTypography>
              <div class="flex justify-end">
                <PtButton variant="outline" @click="secondOpen = false">Fechar</PtButton>
              </div>
            </div>
          </PtModal>
        </div>
      </div>
    `
  })
};
