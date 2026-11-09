import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtAlert from './PtAlert.vue';
import PtButton from '../buttons/button/PtButton.vue';

const statusOptions = [
  'info',
  'system',
  'warning',
  'positive',
  'negative'
] as const;

const meta = {
  title: 'Components/PtAlert',
  component: PtAlert,
  tags: ['autodocs'],
  args: {
    title: 'Verificacao de identidade pendente',
    description:
      'Envie um documento com foto para concluir a verificacao da conta.',
    status: 'warning',
    hideIcon: false,
    closable: false,
    width: 'full',
    className: ''
  },
  argTypes: {
    status: {
      control: 'radio',
      options: statusOptions
    },
    width: {
      control: 'select',
      options: ['full', 'auto', 'fit-content', '48', '64', '96']
    },
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="w-full max-w-pt-96 p-pt-3">
        <PtAlert v-bind="args" />
      </div>
    `
  })
} satisfies Meta<typeof PtAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Statuses: Story = {
  name: 'Status',
  render: () => ({
    components: { PtAlert },
    setup() {
      return {
        alertas: [
          {
            status: 'info',
            title: 'Sincronizacao em andamento',
            description: 'Os dados deste painel sao atualizados a cada minuto.'
          },
          {
            status: 'system',
            title: 'Manutencao programada',
            description: 'O sistema fica indisponivel das 3h as 4h.'
          },
          {
            status: 'warning',
            title: 'Armazenamento perto do limite',
            description: 'Restam 50 MB do espaco do seu plano atual.'
          },
          {
            status: 'positive',
            title: 'Conta verificada',
            description: 'Todos os recursos da conta estao liberados.'
          },
          {
            status: 'negative',
            title: 'Pagamento recusado',
            description: 'O banco nao autorizou a transacao. Tente outro metodo.'
          }
        ]
      };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAlert
          v-for="alerta in alertas"
          :key="alerta.status"
          v-bind="alerta"
        />
      </div>
    `
  })
};

export const Closable: Story = {
  name: 'Com fechar',
  render: () => ({
    components: { PtAlert, PtButton },
    setup() {
      const aberto = ref(true);

      return { aberto };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAlert
          v-model:open="aberto"
          closable
          status="info"
          title="Novo recurso disponivel"
          description="Relatorios exportaveis ja estao disponiveis na sua conta."
        />

        <PtButton v-if="!aberto" size="small" variant="outline" @click="aberto = true">
          Mostrar alerta de novo
        </PtButton>
      </div>
    `
  })
};

export const Widths: Story = {
  name: 'Larguras',
  render: () => ({
    components: { PtAlert },
    template: `
      <div class="flex w-full flex-col gap-pt-2 p-pt-3">
        <PtAlert width="full" status="system" title="width full" description="Ocupa toda a largura disponivel." />
        <PtAlert width="96" status="system" title="width 96" description="Largura de pt-96." />
        <PtAlert width="fit-content" status="system" title="width fit-content" />
      </div>
    `
  })
};

export const WithAction: Story = {
  name: 'Com acao',
  render: () => ({
    components: { PtAlert, PtButton },
    template: `
      <div class="w-full max-w-pt-96 p-pt-3">
        <PtAlert
          status="negative"
          title="Pagamento recusado"
          description="O banco nao autorizou a transacao."
        >
          <template #action>
            <PtButton size="small" variant="text">Tentar outro metodo</PtButton>
          </template>
        </PtAlert>
      </div>
    `
  })
};

export const OnlyTitleOrDescription: Story = {
  name: 'So titulo ou so descricao',
  render: () => ({
    components: { PtAlert },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-2 p-pt-3">
        <PtAlert status="positive" title="Pedido confirmado" closable />
        <PtAlert status="info" description="Os valores podem levar ate 1 minuto para aparecer na sua conta." closable />
        <PtAlert status="warning" title="Sem icone" description="Com hideIcon." hide-icon />
      </div>
    `
  })
};
