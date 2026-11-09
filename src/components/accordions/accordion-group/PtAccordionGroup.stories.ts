import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleInfo,
  faCreditCard,
  faGear,
  faLayerGroup,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtAccordionGroup from './PtAccordionGroup.vue';
import PtAccordion from '../accordion/PtAccordion.vue';

library.add(faCircleInfo, faCreditCard, faGear, faLayerGroup, faStar);

/** Perguntas frequentes sobre pedidos, um uso comum de accordion. */
const topicos = [
  {
    value: 'entrega',
    title: 'Prazo de entrega',
    icon: 'circle-info',
    text: 'Enviamos para todo o pais em ate 5 dias uteis apos a confirmacao do pagamento.'
  },
  {
    value: 'devolucao',
    title: 'Politica de devolucao',
    icon: 'layer-group',
    text: 'Voce tem ate 30 dias corridos para solicitar a devolucao sem custo.'
  },
  {
    value: 'pagamento',
    title: 'Formas de pagamento',
    icon: 'credit-card',
    text: 'Cartao de credito, boleto ou Pix, com aprovacao imediata.'
  },
  {
    value: 'suporte',
    title: 'Canais de atendimento',
    icon: 'gear',
    text: 'Atendimento por chat, e-mail e telefone de segunda a sexta.'
  }
];

const meta = {
  title: 'Components/PtAccordionGroup',
  component: PtAccordionGroup,
  tags: ['autodocs'],
  args: {
    multiple: false,
    size: 'medium',
    headerSurface: 'surface-1',
    contentSurface: 'surface-0',
    disabled: false,
    gap: 1,
    className: ''
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    gap: {
      control: 'radio',
      options: [0, 1, 2, 3]
    },
    headerSurface: { control: 'text' },
    contentSurface: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtAccordionGroup, PtAccordion },
    setup() {
      return { args, topicos };
    },
    template: `
      <div class="w-full max-w-pt-96 p-pt-3">
        <PtAccordionGroup v-bind="args">
          <PtAccordion
            v-for="item in topicos"
            :key="item.value"
            :value="item.value"
            :title="item.title"
            :icon="item.icon"
          >
            <p class="m-0">{{ item.text }}</p>
          </PtAccordion>
        </PtAccordionGroup>
      </div>
    `
  })
} satisfies Meta<typeof PtAccordionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SingleVsMultiple: Story = {
  name: 'Um de cada vez vs multiplos',
  render: () => ({
    components: { PtAccordionGroup, PtAccordion },
    setup() {
      return { topicos };
    },
    template: `
      <div class="flex w-full max-w-pt-160 gap-pt-3 p-pt-3">
        <div class="flex flex-1 flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Um de cada vez (padrao)
          </span>
          <PtAccordionGroup>
            <PtAccordion
              v-for="item in topicos"
              :key="item.value"
              :value="item.value"
              :title="item.title"
            >
              <p class="m-0">{{ item.text }}</p>
            </PtAccordion>
          </PtAccordionGroup>
        </div>

        <div class="flex flex-1 flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Multiplos abertos
          </span>
          <PtAccordionGroup multiple>
            <PtAccordion
              v-for="item in topicos"
              :key="item.value"
              :value="item.value"
              :title="item.title"
            >
              <p class="m-0">{{ item.text }}</p>
            </PtAccordion>
          </PtAccordionGroup>
        </div>
      </div>
    `
  })
};

export const DefaultOpen: Story = {
  name: 'Estado inicial',
  render: () => ({
    components: { PtAccordionGroup, PtAccordion },
    setup() {
      return { topicos };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3 p-pt-3">
        <div class="flex flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Colapsado (padrao)
          </span>
          <PtAccordionGroup>
            <PtAccordion
              v-for="item in topicos.slice(0, 2)"
              :key="item.value"
              :value="item.value"
              :title="item.title"
            >
              <p class="m-0">{{ item.text }}</p>
            </PtAccordion>
          </PtAccordionGroup>
        </div>

        <div class="flex flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Aberto pelo modelValue do grupo
          </span>
          <PtAccordionGroup model-value="devolucao">
            <PtAccordion
              v-for="item in topicos.slice(0, 2)"
              :key="item.value"
              :value="item.value"
              :title="item.title"
            >
              <p class="m-0">{{ item.text }}</p>
            </PtAccordion>
          </PtAccordionGroup>
        </div>

        <div class="flex flex-col gap-pt-1">
          <span class="text-pt-body-small text-pt-content-default">
            Aberto pelo defaultOpen do item
          </span>
          <PtAccordionGroup multiple>
            <PtAccordion value="entrega" title="Prazo de entrega" default-open>
              <p class="m-0">{{ topicos[0].text }}</p>
            </PtAccordion>
            <PtAccordion value="pagamento" title="Formas de pagamento" default-open>
              <p class="m-0">{{ topicos[2].text }}</p>
            </PtAccordion>
          </PtAccordionGroup>
        </div>
      </div>
    `
  })
};

export const Controlled: Story = {
  name: 'Controlado com v-model',
  render: () => ({
    components: { PtAccordionGroup, PtAccordion },
    setup() {
      const aberto = ref<string | null>('entrega');

      return { topicos, aberto };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <div class="flex flex-wrap items-center gap-pt-1">
          <button
            v-for="item in topicos"
            :key="item.value"
            type="button"
            class="cursor-pointer rounded-pt-1 border-0 bg-pt-surface-2 px-pt-1 py-[4px] text-pt-xs text-pt-content-default"
            @click="aberto = item.value"
          >
            {{ item.title }}
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-pt-1 border-0 bg-pt-surface-3 px-pt-1 py-[4px] text-pt-xs text-pt-content-default"
            @click="aberto = null"
          >
            Colapsar
          </button>
        </div>

        <PtAccordionGroup v-model="aberto">
          <PtAccordion
            v-for="item in topicos"
            :key="item.value"
            :value="item.value"
            :title="item.title"
          >
            <p class="m-0">{{ item.text }}</p>
          </PtAccordion>
        </PtAccordionGroup>

        <span class="text-pt-body-small text-pt-content-default">
          Topico aberto: {{ aberto ?? 'nenhum' }}
        </span>
      </div>
    `
  })
};

export const GroupSurfaces: Story = {
  name: 'Tamanho e superficie pelo grupo',
  render: () => ({
    components: { PtAccordionGroup, PtAccordion },
    setup() {
      const ajuda = [
        {
          value: 'rastreio',
          title: 'Como rastreio meu pedido?',
          text: 'Acesse Minha conta, em Pedidos, e consulte o codigo de rastreio do envio.'
        },
        {
          value: 'pagamento',
          title: 'Quais formas de pagamento?',
          text: 'Cartao de credito, boleto e Pix, com aprovacao imediata.'
        },
        {
          value: 'conta',
          title: 'Preciso criar uma conta?',
          text: 'Sim, para acompanhar pedidos e salvar seus dados de entrega.'
        }
      ];

      const recursos = [
        {
          value: 'catalogo',
          title: 'Catalogo',
          icon: 'layer-group',
          text: 'Mais de 3.000 produtos com filtros por categoria, marca e avaliacao.'
        },
        {
          value: 'promocoes',
          title: 'Promocoes',
          icon: 'star',
          text: 'Ofertas relampago com descontos atualizados todos os dias.'
        }
      ];

      return { ajuda, recursos };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3 p-pt-3">
        <PtAccordionGroup
          size="small"
          header-surface="surface-2"
          content-surface="surface-1"
          :gap="0"
        >
          <PtAccordion
            v-for="item in ajuda"
            :key="item.value"
            :value="item.value"
            :title="item.title"
          >
            <p class="m-0">{{ item.text }}</p>
          </PtAccordion>
        </PtAccordionGroup>

        <PtAccordionGroup
          size="large"
          header-surface="surface-3"
          content-surface="surface-1"
          :gap="2"
          multiple
        >
          <PtAccordion
            v-for="item in recursos"
            :key="item.value"
            :value="item.value"
            :title="item.title"
            :icon="item.icon"
          >
            <p class="m-0">{{ item.text }}</p>
          </PtAccordion>
        </PtAccordionGroup>
      </div>
    `
  })
};
