import type { Meta, StoryObj } from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGear, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

import PtIcon from './PtIcon.vue';

const sizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const libOptions = ['fa', 'fab'] as const;

library.add(faPlus, faStar, faGear, faFacebookF, faInstagram);

const meta = {
  title: 'Components/PtIcon',
  component: PtIcon,
  tags: ['autodocs'],
  args: {
    name: 'plus',
    lib: 'fa',
    size: 3,
    ariaLabel: 'Adicionar',
    className: 'text-pt-content-default'
  },
  argTypes: {
    name: {
      control: 'text'
    },
    lib: {
      control: 'radio',
      options: libOptions
    },
    size: {
      control: 'select',
      options: sizeOptions
    },
    ariaLabel: {
      control: 'text'
    },
    className: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-pt-3">
        <PtIcon v-bind="args" />
        <span class="text-pt-body-small text-pt-content-default">
          Use os controles para validar nome, biblioteca, tamanho e acessibilidade.
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { PtIcon },
    setup() {
      return { sizeOptions };
    },
    template: `
      <div class="flex flex-wrap items-end gap-pt-4">
        <div
          v-for="size in sizeOptions"
          :key="size"
          class="flex flex-col items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-2"
        >
          <PtIcon
            name="star"
            :size="size"
            aria-label="Favorito"
            class-name="text-pt-content-default"
          />
          <span class="text-pt-body-small text-pt-content-default">{{ size }}</span>
        </div>
      </div>
    `
  })
};

export const Libraries: Story = {
  render: () => ({
    components: { PtIcon },
    template: `
      <div class="flex flex-wrap items-center gap-pt-4">
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-2">
          <PtIcon
            name="gear"
            :size="3"
            aria-label="Configuracoes"
            class-name="text-pt-content-default"
          />
          <span class="text-pt-body-small text-pt-content-default">fa / gear</span>
        </div>
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-2">
          <PtIcon
            name="fab:facebook-f"
            :size="3"
            aria-label="Facebook"
            class-name="text-pt-content-default"
          />
          <span class="text-pt-body-small text-pt-content-default">fab / facebook-f</span>
        </div>
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-2">
          <PtIcon
            name="instagram"
            lib="fab"
            :size="3"
            aria-label="Instagram"
            class-name="text-pt-content-default"
          />
          <span class="text-pt-body-small text-pt-content-default">lib=fab / instagram</span>
        </div>
      </div>
    `
  })
};

export const Fallback: Story = {
  render: () => ({
    components: { PtIcon },
    template: `
      <div class="flex flex-wrap items-center gap-pt-4">
        <div class="flex items-center gap-pt-2 rounded-pt-1 bg-pt-surface-2 px-pt-2 py-pt-2">
          <PtIcon
            name="does-not-exist"
            :size="3"
            aria-label="Invalido"
            class-name="border border-pt-border-2 text-pt-content-default"
          />
          <span class="text-pt-body-small text-pt-content-default">Sem svg quando o icone nao existe</span>
        </div>
      </div>
    `
  })
};
