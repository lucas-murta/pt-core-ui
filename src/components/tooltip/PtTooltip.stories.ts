import { computed, ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';

import PtButton from '../buttons/button/PtButton.vue';
import PtTooltip from './PtTooltip.vue';

const placementOptions = ['top', 'bottom', 'left', 'right'] as const;

const meta = {
  title: 'Components/PtTooltip',
  component: PtTooltip,
  tags: ['autodocs'],
  args: {
    placement: 'top',
    offset: 8,
    open: false,
    defaultOpen: false,
    disabled: false,
    className: '',
    panelClassName: ''
  },
  argTypes: {
    placement: {
      control: 'radio',
      options: placementOptions
    },
    offset: {
      control: { type: 'number', min: 0, max: 32, step: 1 }
    },
    open: {
      control: 'boolean'
    },
    defaultOpen: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    },
    panelClassName: {
      control: 'text'
    },
    triggerProps: {
      control: false
    },
    onOpenChange: {
      control: false
    }
  },
  render: (args) => ({
    components: { PtButton, PtTooltip },
    setup() {
      const storyArgs = computed(() => {
        const next = { ...args };

        if (next.open === false) {
          delete next.open;
        }

        return next;
      });

      return { storyArgs };
    },
    template: `
      <div class="flex min-h-[14rem] items-center justify-center rounded-pt-1 bg-pt-surface-2 p-pt-6">
        <PtTooltip v-bind="storyArgs">
          <template #trigger>
            <PtButton type="button" variant="solid" color="primary">
              Passe o mouse
            </PtButton>
          </template>

          Tooltip contextual
        </PtTooltip>
      </div>
    `
  })
} satisfies Meta<typeof PtTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Placements: Story = {
  render: () => ({
    components: { PtButton, PtTooltip },
    template: `
      <div class="grid min-h-[22rem] gap-pt-6 rounded-pt-1 bg-pt-surface-2 p-pt-6 md:grid-cols-2">
        <div class="flex items-center justify-center">
          <PtTooltip placement="top">
            <template #trigger>
              <PtButton type="button" variant="solid" color="primary">
                Top
              </PtButton>
            </template>
            Tooltip no topo
          </PtTooltip>
        </div>

        <div class="flex items-center justify-center">
          <PtTooltip placement="right">
            <template #trigger>
              <PtButton type="button" variant="solid" color="primary">
                Right
              </PtButton>
            </template>
            Tooltip à direita
          </PtTooltip>
        </div>

        <div class="flex items-center justify-center">
          <PtTooltip placement="bottom">
            <template #trigger>
              <PtButton type="button" variant="solid" color="primary">
                Bottom
              </PtButton>
            </template>
            Tooltip embaixo
          </PtTooltip>
        </div>

        <div class="flex items-center justify-center">
          <PtTooltip placement="left">
            <template #trigger>
              <PtButton type="button" variant="solid" color="primary">
                Left
              </PtButton>
            </template>
            Tooltip à esquerda
          </PtTooltip>
        </div>
      </div>
    `
  })
};

export const Controlled: Story = {
  render: () => ({
    components: { PtButton, PtTooltip },
    setup() {
      const open = ref(false);

      return { open };
    },
    template: `
      <div class="flex min-h-[14rem] flex-col items-center justify-center gap-pt-4 rounded-pt-1 bg-pt-surface-2 p-pt-6">
        <PtButton @click="open = !open">
          {{ open ? 'Fechar tooltip' : 'Abrir tooltip' }}
        </PtButton>

        <PtTooltip :open="open" placement="bottom" @update:open="open = $event">
          <template #trigger>
            <PtButton type="button" variant="solid" color="primary">
              Trigger controlado
            </PtButton>
          </template>

          Tooltip controlado externamente
        </PtTooltip>
      </div>
    `
  })
};

export const TriggerProps: Story = {
  render: () => ({
    components: { PtTooltip },
    template: `
      <div class="flex min-h-[14rem] items-center justify-center rounded-pt-1 bg-pt-surface-2 p-pt-6">
        <PtTooltip
          placement="right"
          :trigger-props="{
            className: 'rounded-pt-1 outline outline-1 outline-pt-border-2',
            title: 'Ajuda contextual'
          }"
        >
          <template #trigger>
            <span
              tabindex="0"
              class="inline-flex rounded-pt-1 bg-pt-surface-0 px-pt-3 py-pt-2 text-pt-body-small text-pt-content-default"
            >
              Foque ou passe o mouse
            </span>
          </template>

          Tooltip com props extras no trigger
        </PtTooltip>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    components: { PtButton, PtTooltip },
    template: `
      <div class="flex min-h-[14rem] items-center justify-center rounded-pt-1 bg-pt-surface-2 p-pt-6">
        <PtTooltip disabled>
          <template #trigger>
            <PtButton type="button" variant="solid" color="primary" disabled>
              Tooltip desabilitado
            </PtButton>
          </template>

          Este conteúdo não deve abrir
        </PtTooltip>
      </div>
    `
  })
};
