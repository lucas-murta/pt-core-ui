import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faCircleInfo,
  faGift,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtBanner from './PtBanner.vue';
import PtButton from '../buttons/button/PtButton.vue';

library.add(faBolt, faCircleInfo, faGift, faTriangleExclamation);

const statusOptions = [
  'info',
  'system',
  'warning',
  'positive',
  'negative',
  'primary',
  'secondary'
] as const;

const meta = {
  title: 'Components/PtBanner',
  component: PtBanner,
  tags: ['autodocs'],
  args: {
    text: 'Frete gratis em compras acima de R$ 200',
    status: 'primary',
    icon: 'gift',
    actionLabel: 'Ver ofertas',
    closable: true,
    className: ''
  },
  argTypes: {
    status: {
      control: 'radio',
      options: statusOptions
    },
    text: { control: 'text' },
    icon: { control: 'text' },
    actionLabel: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtBanner },
    setup() {
      return { args };
    },
    template: `
      <div class="w-full max-w-pt-128 p-pt-3">
        <PtBanner v-bind="args" />
      </div>
    `
  })
} satisfies Meta<typeof PtBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Statuses: Story = {
  name: 'Status',
  render: () => ({
    components: { PtBanner },
    setup() {
      return {
        banners: [
          {
            status: 'info',
            icon: 'circle-info',
            text: 'Precos atualizados a cada minuto'
          },
          { status: 'system', text: 'Manutencao programada as 3h' },
          {
            status: 'warning',
            icon: 'triangle-exclamation',
            text: 'Seu armazenamento esta perto do fim'
          },
          { status: 'positive', text: 'Pagamento aprovado' },
          { status: 'negative', text: 'Pagamento recusado pelo banco' },
          {
            status: 'primary',
            icon: 'gift',
            text: 'Cupom de boas-vindas liberado'
          },
          {
            status: 'secondary',
            icon: 'bolt',
            text: 'Descontos relampago ate domingo'
          }
        ]
      };
    },
    template: `
      <div class="flex w-full max-w-pt-128 flex-col items-start gap-pt-2 p-pt-3">
        <PtBanner
          v-for="banner in banners"
          :key="banner.status"
          v-bind="banner"
        />
      </div>
    `
  })
};

export const WithActionAndClose: Story = {
  name: 'Com acao e fechar',
  render: () => ({
    components: { PtBanner },
    setup() {
      const aberto = ref(true);
      const cliques = ref(0);

      return { aberto, cliques };
    },
    template: `
      <div class="flex w-full max-w-pt-128 flex-col items-start gap-pt-2 p-pt-3">
        <PtBanner
          status="secondary"
          icon="bolt"
          text="Descontos relampago ate domingo"
          action-label="Ver ofertas"
          @action="cliques++"
        />
        <PtBanner
          v-model:open="aberto"
          status="info"
          text="Novos produtos disponiveis na loja"
          action-label="Conhecer"
          closable
        />
        <PtBanner status="warning" text="So com fechar" closable />
        <span class="text-pt-body-small text-pt-content-ghost">
          Cliques na acao: {{ cliques }}
        </span>
      </div>
    `
  })
};

export const CustomAction: Story = {
  name: 'Acao pelo slot',
  render: () => ({
    components: { PtBanner, PtButton },
    template: `
      <div class="w-full max-w-pt-128 p-pt-3">
        <PtBanner status="primary" icon="gift" text="Cupom liberado">
          <template #action>
            <PtButton size="small" variant="outline" class-name="!rounded-full">
              Regras
            </PtButton>
          </template>
        </PtBanner>
      </div>
    `
  })
};

export const LongText: Story = {
  name: 'Frase longa',
  render: () => ({
    components: { PtBanner },
    template: `
      <div class="w-full max-w-pt-80 p-pt-3">
        <PtBanner
          status="system"
          icon="circle-info"
          text="O sistema fica indisponivel das 3h as 4h para manutencao programada"
          closable
        />
      </div>
    `
  })
};
