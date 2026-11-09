import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faBoxOpen,
  faHeart,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtTabs from './PtTabs.vue';
import PtTabPanel from '../tab-panel/PtTabPanel.vue';
import PtTab from '../tab/PtTab.vue';

library.add(faBell, faBoxOpen, faHeart, faTag);

const secoes = [
  {
    value: 'pedidos',
    label: 'Pedidos',
    icon: 'box-open',
    text: 'Voce tem 3 pedidos em andamento e 18 entregues nos ultimos 30 dias.'
  },
  {
    value: 'produtos',
    label: 'Produtos',
    icon: 'tag',
    text: 'Confira os produtos mais recentes e as novidades da loja.'
  },
  {
    value: 'promocoes',
    label: 'Promocoes',
    icon: 'tag',
    text: 'Veja as ofertas e vantagens disponiveis nesta semana.'
  },
  {
    value: 'favoritos',
    label: 'Favoritos',
    icon: 'heart',
    text: 'Seus produtos favoritos ficam reunidos nesta secao.'
  },
  {
    value: 'opt',
    label: '',
    icon: 'bell',
    text: 'Voce nao tem novas notificacoes.'
  }
];

const meta = {
  title: 'Components/PtTabs',
  component: PtTabs,
  tags: ['autodocs'],
  args: {
    modelValue: 'pedidos',
    variant: 'underline',
    size: 'medium',
    color: 'primary',
    align: 'start',
    fullWidth: false,
    iconPosition: 'start',
    disabled: false,
    className: ''
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['underline', 'pill']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary']
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end']
    },
    iconPosition: {
      control: 'radio',
      options: ['start', 'top']
    },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtTabs, PtTab, PtTabPanel },
    setup() {
      const ativa = ref(args.modelValue);

      return { args, ativa, secoes };
    },
    template: `
      <div class="w-full max-w-pt-96 p-pt-3">
        <PtTabs v-bind="args" v-model="ativa">
          <template #tabs>
            <PtTab
              v-for="item in secoes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>

          <PtTabPanel
            v-for="item in secoes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </PtTabPanel>
        </PtTabs>
      </div>
    `
  })
} satisfies Meta<typeof PtTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  name: 'Variantes',
  render: () => ({
    components: { PtTabs, PtTab, PtTabPanel },
    setup() {
      const sublinhado = ref('pedidos');
      const pilula = ref('pedidos');

      return { secoes, sublinhado, pilula };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-4 p-pt-3">
        <PtTabs v-model="sublinhado">
          <template #tabs>
            <PtTab
              v-for="item in secoes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>
          <PtTabPanel
            v-for="item in secoes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </PtTabPanel>
        </PtTabs>

        <PtTabs v-model="pilula" variant="pill">
          <template #tabs>
            <PtTab
              v-for="item in secoes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>
          <PtTabPanel
            v-for="item in secoes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </PtTabPanel>
        </PtTabs>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { PtTabs, PtTab },
    setup() {
      const tamanhos = ['small', 'medium', 'large'] as const;
      const ativa = ref('pedidos');

      return { secoes, tamanhos, ativa };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-4 p-pt-3">
        <PtTabs
          v-for="size in tamanhos"
          :key="size"
          v-model="ativa"
          :size="size"
        >
          <template #tabs>
            <PtTab
              v-for="item in secoes.slice(0, 3)"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>
        </PtTabs>
      </div>
    `
  })
};

export const WithIcons: Story = {
  name: 'Com icones',
  render: () => ({
    components: { PtTabs, PtTab, PtTabPanel },
    setup() {
      const ativa = ref('pedidos');

      return { secoes, ativa };
    },
    template: `
      <div class="w-full max-w-pt-96 p-pt-3">
        <PtTabs v-model="ativa" variant="pill">
          <template #tabs>
            <PtTab
              v-for="item in secoes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :icon="item.icon"
            />
          </template>
          <PtTabPanel
            v-for="item in secoes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </PtTabPanel>
        </PtTabs>
      </div>
    `
  })
};

export const IconTop: Story = {
  name: 'Icone acima do texto',
  render: () => ({
    components: { PtTabs, PtTab, PtTabPanel },
    setup() {
      const ativa = ref('pedidos');

      return { secoes, ativa };
    },
    template: `
      <div class="flex w-full max-w-pt-56 flex-col gap-pt-4 p-pt-3">
        <PtTabs
          v-model="ativa"
          variant="pill"
          size="small"
          icon-position="top"
          full-width
        >
          <template #tabs>
            <PtTab
              v-for="item in secoes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :icon="item.icon"
            />
          </template>
        </PtTabs>

        <PtTabs v-model="ativa" size="small" icon-position="top" full-width>
          <template #tabs>
            <PtTab
              v-for="item in secoes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :icon="item.icon"
            />
          </template>
          <PtTabPanel
            v-for="item in secoes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </PtTabPanel>
        </PtTabs>
      </div>
    `
  })
};

export const FullWidth: Story = {
  name: 'Largura total',
  render: () => ({
    components: { PtTabs, PtTab, PtTabPanel },
    setup() {
      const sublinhado = ref('pedidos');
      const pilula = ref('pedidos');

      return { secoes, sublinhado, pilula };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-4 p-pt-3">
        <PtTabs v-model="sublinhado" full-width>
          <template #tabs>
            <PtTab
              v-for="item in secoes.slice(0, 3)"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>
        </PtTabs>

        <PtTabs v-model="pilula" variant="pill" full-width>
          <template #tabs>
            <PtTab
              v-for="item in secoes.slice(0, 3)"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>
        </PtTabs>
      </div>
    `
  })
};

export const States: Story = {
  name: 'Estados',
  render: () => ({
    components: { PtTabs, PtTab },
    setup() {
      const comDesabilitada = ref('pedidos');
      const tudoBloqueado = ref('pedidos');

      return { secoes, comDesabilitada, tudoBloqueado };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-4 p-pt-3">
        <div class="flex flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Uma aba desabilitada
          </span>
          <PtTabs v-model="comDesabilitada">
            <template #tabs>
              <PtTab value="pedidos" label="Pedidos" />
              <PtTab value="produtos" label="Produtos" disabled />
              <PtTab value="promocoes" label="Promocoes" />
            </template>
          </PtTabs>
        </div>

        <div class="flex flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Grupo inteiro bloqueado
          </span>
          <PtTabs v-model="tudoBloqueado" disabled>
            <template #tabs>
              <PtTab
                v-for="item in secoes.slice(0, 3)"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </template>
          </PtTabs>
        </div>
      </div>
    `
  })
};

export const Scrollable: Story = {
  name: 'Muitas abas',
  render: () => ({
    components: { PtTabs, PtTab },
    setup() {
      const areas = [
        'Visao geral',
        'Pedidos',
        'Produtos',
        'Clientes',
        'Relatorios',
        'Notificacoes',
        'Preferencias',
        'Aparencia',
        'Integracoes',
        'Ajuda'
      ].map((label, index) => ({ value: `area${index}`, label }));
      const ativa = ref('area0');

      return { areas, ativa };
    },
    template: `
      <div class="w-full max-w-pt-80 p-pt-3">
        <PtTabs v-model="ativa">
          <template #tabs>
            <PtTab
              v-for="item in areas"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </template>
        </PtTabs>
        <span class="mt-pt-2 block text-pt-body-small text-pt-content-default">
          A lista rola na horizontal quando as abas nao cabem.
        </span>
      </div>
    `
  })
};
