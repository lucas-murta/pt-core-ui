import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleInfo,
  faCreditCard,
  faGear,
  faLayerGroup,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/vue3';

import PtAccordion from './PtAccordion.vue';

library.add(
  faCircleInfo,
  faCreditCard,
  faGear,
  faLayerGroup,
  faTriangleExclamation
);

const surfaceOptions = [
  'transparent',
  'surface-0',
  'surface-1',
  'surface-2',
  'surface-3',
  'surface-4',
  'surface-primary',
  'surface-secondary',
  'surface-info',
  'surface-system',
  'surface-warning',
  'surface-positive',
  'surface-negative'
] as const;

const meta = {
  title: 'Components/PtAccordion',
  component: PtAccordion,
  tags: ['autodocs'],
  args: {
    title: 'Como funciona o plano anual',
    icon: '',
    size: 'medium',
    headerSurface: 'surface-1',
    contentSurface: 'surface-0',
    defaultOpen: false,
    disabled: false,
    hideExpandIcon: false,
    className: ''
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    headerSurface: {
      control: 'select',
      options: surfaceOptions
    },
    contentSurface: {
      control: 'select',
      options: surfaceOptions
    },
    title: { control: 'text' },
    icon: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtAccordion },
    setup() {
      return { args };
    },
    template: `
      <div class="w-full max-w-pt-96 p-pt-3">
        <PtAccordion v-bind="args">
          <p class="m-0">
            A area expande ate a altura automatica do conteudo interno, sem
            altura fixa e sem medir nada em JavaScript.
          </p>
        </PtAccordion>
      </div>
    `
  })
} satisfies Meta<typeof PtAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AutoHeight: Story = {
  name: 'Altura automatica',
  render: () => ({
    components: { PtAccordion },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAccordion title="Prazo de entrega">
          <p class="m-0">
            Enviamos para todo o pais em ate 5 dias uteis apos a confirmacao do
            pagamento.
          </p>
        </PtAccordion>

        <PtAccordion title="Politica de devolucao">
          <p class="m-0">
            Voce tem ate 30 dias corridos para solicitar a devolucao sem custo,
            desde que o produto esteja sem sinais de uso.
          </p>
          <p class="m-0 mt-pt-1">
            O reembolso e feito no mesmo metodo de pagamento em ate 7 dias uteis.
          </p>
        </PtAccordion>

        <PtAccordion title="Canais de atendimento">
          <ul class="m-0 list-disc pl-pt-3">
            <li>Chat online</li>
            <li>E-mail</li>
            <li>Telefone</li>
            <li>WhatsApp</li>
            <li>Central de ajuda</li>
          </ul>
        </PtAccordion>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { PtAccordion },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAccordion size="small" title="Resumo do pedido" icon="layer-group" default-open>
          <p class="m-0">Confira os itens e os valores antes de concluir a compra.</p>
        </PtAccordion>
        <PtAccordion size="medium" title="Dados de entrega" icon="circle-info" default-open>
          <p class="m-0">Endereco, prazo estimado e opcoes de frete para o seu CEP.</p>
        </PtAccordion>
        <PtAccordion size="large" title="Forma de pagamento" icon="credit-card" default-open>
          <p class="m-0">Cartao de credito, boleto ou Pix, com aprovacao em segundos.</p>
        </PtAccordion>
      </div>
    `
  })
};

export const Surfaces: Story = {
  render: () => ({
    components: { PtAccordion },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAccordion
          title="Bloco em destaque"
          icon="gear"
          header-surface="surface-2"
          content-surface="surface-2"
          default-open
        >
          <p class="m-0">Bloco unico, sem separacao entre cabecalho e conteudo.</p>
        </PtAccordion>

        <PtAccordion
          title="Configuracoes avancadas"
          icon="gear"
          header-surface="surface-3"
          content-surface="surface-1"
          default-open
        >
          <p class="m-0">Agrupa opcoes avancadas com contraste entre cabecalho e conteudo.</p>
        </PtAccordion>

        <PtAccordion
          title="Assinatura proxima do vencimento"
          icon="triangle-exclamation"
          header-surface="surface-warning"
          content-surface="surface-1"
          default-open
        >
          <p class="m-0">
            Atualize a forma de pagamento para evitar a interrupcao do servico.
            Voce pode revisar a assinatura em Configuracoes da conta.
          </p>
        </PtAccordion>

        <PtAccordion
          title="Sem fundo"
          header-surface="transparent"
          content-surface="transparent"
          default-open
        >
          <p class="m-0">Util quando o container ja define a superficie.</p>
        </PtAccordion>
      </div>
    `
  })
};

export const WithEndAdornment: Story = {
  name: 'Com endAdornment',
  render: () => ({
    components: { PtAccordion },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAccordion title="Categorias" icon="layer-group">
          <template #endAdornment>
            <span class="rounded-full bg-pt-surface-3 px-pt-1 text-pt-xs text-pt-content-default">
              12 itens
            </span>
          </template>
          <p class="m-0">Lista completa de categorias disponiveis na loja.</p>
        </PtAccordion>

        <PtAccordion title="Preferencias de notificacao" icon="gear">
          <template #endAdornment>
            <button
              type="button"
              class="cursor-pointer rounded-pt-1 border-0 bg-pt-primary px-pt-1 py-[4px] text-pt-xs text-pt-content-bright"
              @click="alert('editar preferencias')"
            >
              Editar
            </button>
          </template>
          <p class="m-0">
            O adornment fica entre o titulo e o chevron, fora do botao do
            cabecalho, entao aceita elementos interativos sem disparar o toggle.
          </p>
        </PtAccordion>
      </div>
    `
  })
};

export const States: Story = {
  render: () => ({
    components: { PtAccordion },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAccordion title="Como solicito um reembolso?" default-open>
          <p class="m-0">
            O reembolso volta para o mesmo metodo de pagamento em ate 7 dias
            uteis apos a confirmacao da devolucao.
          </p>
        </PtAccordion>

        <PtAccordion title="Item indisponivel" disabled>
          <p class="m-0">Nao abre.</p>
        </PtAccordion>

        <PtAccordion title="Metodos de pagamento" hide-expand-icon>
          <p class="m-0">Cartao de credito, boleto e Pix.</p>
        </PtAccordion>
      </div>
    `
  })
};
