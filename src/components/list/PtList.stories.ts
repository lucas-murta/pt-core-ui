import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/vue3';

import PtListItem from './list-item/PtListItem.vue';
import PtOrderedList from './ordered-list/PtOrderedList.vue';
import PtUnorderedList from './unordered-list/PtUnorderedList.vue';

library.add(faChevronDown, faChevronUp);

const orientationOptions = ['vertical', 'horizontal'] as const;

const meta = {
  title: 'Components/PtList',
  tags: ['autodocs'],
  render: () => ({
    components: {
      PtListItem,
      PtOrderedList,
      PtUnorderedList
    },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-3">
        <PtUnorderedList>
          <PtListItem clickable>Painel</PtListItem>
          <PtListItem clickable>Pedidos</PtListItem>
          <PtListItem clickable>Promoções</PtListItem>
        </PtUnorderedList>
      </div>
    `
  })
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => ({
    components: {
      PtListItem,
      PtUnorderedList
    },
    data() {
      return {
        orientationOptions,
        orientation: 'vertical' as (typeof orientationOptions)[number],
        dense: false
      };
    },
    template: `
      <div class="flex flex-col gap-pt-3">
        <div class="flex items-center gap-pt-2">
          <label class="text-pt-body-small text-pt-content-default">
            Orientation
            <select v-model="orientation" class="ml-pt-1 rounded-pt-1 border border-pt-border-2 bg-pt-surface-0 px-pt-1 py-[4px] text-pt-body-small text-pt-content-default">
              <option v-for="item in orientationOptions" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </label>

          <label class="inline-flex items-center gap-pt-1 text-pt-body-small text-pt-content-default">
            <input v-model="dense" type="checkbox" />
            dense
          </label>
        </div>

        <PtUnorderedList
          :orientation="orientation"
          :dense="dense"
        >
          <PtListItem clickable>Painel</PtListItem>
          <PtListItem clickable>Pedidos</PtListItem>
          <PtListItem clickable>Promoções</PtListItem>
        </PtUnorderedList>
      </div>
    `
  })
};

export const UnorderedNavigation: Story = {
  render: () => ({
    components: {
      PtListItem,
      PtUnorderedList
    },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-3">
        <PtUnorderedList>
          <PtListItem clickable selected>
            <template #startAdornment>
              <span class="text-pt-body-small text-pt-content-default">D</span>
            </template>
            Dashboard
          </PtListItem>

          <PtListItem clickable divider>
            <template #startAdornment>
              <span class="text-pt-body-small text-pt-content-default">P</span>
            </template>
            Pedidos
            <template #endAdornment>
              <span class="text-pt-body-small text-pt-content-ghost">12</span>
            </template>
          </PtListItem>

          <PtListItem clickable disabled>
            Carteira
          </PtListItem>
        </PtUnorderedList>
      </div>
    `
  })
};

export const OrderedSequence: Story = {
  render: () => ({
    components: {
      PtListItem,
      PtOrderedList
    },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-3">
        <PtOrderedList>
          <PtListItem clickable>Selecionar produto</PtListItem>
          <PtListItem clickable>Conferir valor</PtListItem>
          <PtListItem clickable>Finalizar compra</PtListItem>
        </PtOrderedList>
      </div>
    `
  })
};

export const HorizontalSubmenu: Story = {
  render: () => ({
    components: {
      PtListItem,
      PtUnorderedList
    },
    template: `
      <div class="flex min-h-[240px] flex-col gap-pt-3">
        <PtUnorderedList orientation="horizontal">
          <PtListItem clickable>Início</PtListItem>
          <PtListItem clickable>Novidades</PtListItem>
          <PtListItem clickable divider>
            Produtos

            <PtUnorderedList dense>
              <PtListItem clickable>Eletronicos</PtListItem>
              <PtListItem clickable>Moda</PtListItem>
              <PtListItem clickable>Casa</PtListItem>
            </PtUnorderedList>
          </PtListItem>
        </PtUnorderedList>
      </div>
    `
  })
};

export const VerticalNested: Story = {
  render: () => ({
    components: {
      PtListItem,
      PtOrderedList,
      PtUnorderedList
    },
    template: `
      <div class="flex max-w-pt-48 flex-col gap-pt-3">
        <PtUnorderedList>
          <PtListItem clickable default-expanded>
            Produtos

            <PtOrderedList>
              <PtListItem clickable>Eletronicos</PtListItem>
              <PtListItem clickable>Moda</PtListItem>
              <PtListItem clickable>Acessorios</PtListItem>
            </PtOrderedList>
          </PtListItem>
        </PtUnorderedList>
      </div>
    `
  })
};
