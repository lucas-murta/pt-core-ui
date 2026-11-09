import type { Meta, StoryObj } from '@storybook/vue3';

import PtToast from './PtToast.vue';

const statusOptions = [
  'info',
  'system',
  'warning',
  'positive',
  'negative'
] as const;

const meta = {
  title: 'Components/PtToast',
  component: PtToast,
  tags: ['autodocs'],
  args: {
    title: 'Pedido confirmado',
    description: 'Pedido #4821 recebido e enviado para preparacao.',
    status: 'positive',
    hideIcon: false,
    closable: true,
    className: ''
  },
  argTypes: {
    status: {
      control: 'radio',
      options: statusOptions
    },
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtToast },
    setup() {
      return { args };
    },
    template: `
      <div class="p-pt-3">
        <PtToast v-bind="args" />
      </div>
    `
  })
} satisfies Meta<typeof PtToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Statuses: Story = {
  name: 'Status',
  render: () => ({
    components: { PtToast },
    setup() {
      return {
        avisos: [
          {
            status: 'info',
            title: 'Catalogo atualizado',
            description: 'Novos produtos foram adicionados a loja.'
          },
          {
            status: 'system',
            title: 'Manutencao programada',
            description: 'O sistema ficara indisponivel das 3h as 4h.'
          },
          {
            status: 'warning',
            title: 'Armazenamento quase cheio',
            description: 'Restam 500 MB de espaco disponivel na sua conta.'
          },
          {
            status: 'positive',
            title: 'Pagamento aprovado',
            description: 'A confirmacao do pagamento foi recebida.'
          },
          {
            status: 'negative',
            title: 'Transacao recusada',
            description: 'Nao foi possivel concluir o pagamento. Tente novamente.'
          }
        ]
      };
    },
    template: `
      <div class="flex flex-col gap-pt-2 p-pt-3">
        <PtToast
          v-for="aviso in avisos"
          :key="aviso.status"
          :status="aviso.status"
          :title="aviso.title"
          :description="aviso.description"
        />
      </div>
    `
  })
};

export const AutoHeight: Story = {
  name: 'Altura pelo conteudo',
  render: () => ({
    components: { PtToast },
    template: `
      <div class="flex flex-col gap-pt-2 p-pt-3">
        <PtToast status="positive" title="Pedido recebido" />

        <PtToast
          status="info"
          title="Novo recurso disponivel"
          description="Conheca as novidades que chegaram a plataforma."
        />

        <PtToast
          status="negative"
          title="Nao foi possivel concluir o pagamento"
          description="A operadora recusou a transacao. Confira os dados informados ou tente outro metodo de pagamento."
        />
      </div>
    `
  })
};

export const WithAction: Story = {
  name: 'Com acao',
  render: () => ({
    components: { PtToast },
    template: `
      <div class="flex flex-col gap-pt-2 p-pt-3">
        <PtToast
          status="positive"
          title="Pedido recebido"
          description="Pedido #4821 confirmado."
        >
          <template #action>
            <button
              type="button"
              class="cursor-pointer rounded-pt-1 border-0 bg-pt-primary px-pt-1 py-[4px] text-pt-xs text-pt-content-bright"
            >
              Ver pedido
            </button>
          </template>
        </PtToast>
      </div>
    `
  })
};

export const Variations: Story = {
  name: 'Variacoes',
  render: () => ({
    components: { PtToast },
    template: `
      <div class="flex flex-col gap-pt-2 p-pt-3">
        <PtToast
          status="info"
          title="Sem descricao"
        />
        <PtToast
          status="system"
          title="Sem icone"
          description="Use hide-icon quando o titulo ja for suficiente."
          hide-icon
        />
        <PtToast
          status="warning"
          title="Sem botao de fechar"
          description="Use closable false quando o fechamento for automatico."
          :closable="false"
        />
      </div>
    `
  })
};
