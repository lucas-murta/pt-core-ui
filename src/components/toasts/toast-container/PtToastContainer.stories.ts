import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtToastContainer from './PtToastContainer.vue';
import { ptToastConfig, useToast } from '../../../composables/useToast';

const positionOptions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
] as const;

const botao =
  'cursor-pointer rounded-pt-1 border-0 bg-pt-surface-2 px-pt-2 py-pt-1 text-pt-body-small text-pt-content-default';

const meta = {
  title: 'Components/PtToastContainer',
  component: PtToastContainer,
  tags: ['autodocs'],
  args: {
    position: 'top-right',
    gap: 1,
    pauseOnHover: true,
    className: ''
  },
  argTypes: {
    position: {
      control: 'select',
      options: positionOptions
    },
    gap: {
      control: 'radio',
      options: [1, 2, 3]
    },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtToastContainer },
    setup() {
      const toast = useToast();

      const disparar = () => {
        toast.positive({
          title: 'Pedido recebido',
          description: 'Pedido #4821 confirmado e enviado para preparacao.'
        });
      };

      return { args, toast, disparar, botao };
    },
    template: `
      <div class="flex min-h-pt-96 flex-col items-start gap-pt-2 p-pt-3">
        <div class="flex flex-wrap gap-pt-1">
          <button type="button" :class="botao" @click="disparar">
            Disparar toast
          </button>
          <button type="button" :class="botao" @click="toast.dismissAll()">
            Limpar
          </button>
        </div>

        <span class="text-pt-body-small text-pt-content-default">
          Na fila: {{ toast.toasts.value.length }}
        </span>

        <PtToastContainer v-bind="args" />
      </div>
    `
  })
} satisfies Meta<typeof PtToastContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Callback: Story = {
  name: 'Chamando pelo composable',
  render: () => ({
    components: { PtToastContainer },
    setup() {
      const toast = useToast();

      const acoes = [
        {
          label: 'Pedido recebido',
          run: () =>
            toast.positive({
              title: 'Pedido recebido',
              description: 'Pedido #4821 confirmado.'
            })
        },
        {
          label: 'Catalogo atualizado',
          run: () =>
            toast.info({
              title: 'Catalogo atualizado',
              description: 'Novos produtos foram adicionados a loja.'
            })
        },
        {
          label: 'Armazenamento quase cheio',
          run: () =>
            toast.warning({
              title: 'Armazenamento quase cheio',
              description: 'Restam 500 MB de espaco disponivel na sua conta.'
            })
        },
        {
          label: 'Pagamento recusado',
          run: () =>
            toast.negative({
              title: 'Pagamento recusado',
              description: 'Nao foi possivel concluir a transacao. Tente outro metodo de pagamento.'
            })
        },
        {
          label: 'Manutencao',
          run: () =>
            toast.system({
              title: 'Manutencao programada',
              description: 'O sistema ficara indisponivel das 3h as 4h.'
            })
        },
        {
          label: 'Persistente',
          run: () =>
            toast.negative({
              title: 'Conta nao verificada',
              description: 'Envie um documento para confirmar os dados da sua conta.',
              duration: 0
            })
        }
      ];

      return { toast, acoes, botao };
    },
    template: `
      <div class="flex min-h-pt-96 flex-col items-start gap-pt-2 p-pt-3">
        <div class="flex flex-wrap gap-pt-1">
          <button
            v-for="acao in acoes"
            :key="acao.label"
            type="button"
            :class="botao"
            @click="acao.run()"
          >
            {{ acao.label }}
          </button>
          <button type="button" :class="botao" @click="toast.dismissAll()">
            Limpar
          </button>
        </div>

        <span class="text-pt-body-small text-pt-content-default">
          Toasts somem em 5s. Passe o mouse sobre a pilha para congelar a
          contagem. O ultimo botao cria um toast persistente.
        </span>

        <PtToastContainer />
      </div>
    `
  })
};

export const Positions: Story = {
  name: 'Posicoes',
  render: () => ({
    components: { PtToastContainer },
    setup() {
      const toast = useToast();
      const position = ref<(typeof positionOptions)[number]>('top-right');

      const mostrar = (value: (typeof positionOptions)[number]) => {
        position.value = value;
        toast.dismissAll();
        toast.info({
          title: value,
          description: 'Pilha ancorada neste canto.',
          duration: 0
        });
      };

      return { positionOptions, position, mostrar, botao, toast };
    },
    template: `
      <div class="flex min-h-pt-96 flex-col items-start gap-pt-2 p-pt-3">
        <div class="flex flex-wrap gap-pt-1">
          <button
            v-for="value in positionOptions"
            :key="value"
            type="button"
            :class="botao"
            @click="mostrar(value)"
          >
            {{ value }}
          </button>
          <button type="button" :class="botao" @click="toast.dismissAll()">
            Limpar
          </button>
        </div>

        <PtToastContainer :position="position" />
      </div>
    `
  })
};

export const QueueLimit: Story = {
  name: 'Limite da fila',
  render: () => ({
    components: { PtToastContainer },
    setup() {
      const toast = useToast();
      let contador = 0;

      const disparar = () => {
        contador += 1;
        toast.info({ title: `Aviso ${contador}`, duration: 0 });
      };

      const configurar = (max: number) => {
        ptToastConfig.max = max;
      };

      return { toast, disparar, configurar, botao, ptToastConfig };
    },
    template: `
      <div class="flex min-h-pt-96 flex-col items-start gap-pt-2 p-pt-3">
        <div class="flex flex-wrap gap-pt-1">
          <button type="button" :class="botao" @click="disparar">
            Empilhar
          </button>
          <button type="button" :class="botao" @click="configurar(3)">
            max = 3
          </button>
          <button type="button" :class="botao" @click="configurar(5)">
            max = 5
          </button>
          <button type="button" :class="botao" @click="toast.dismissAll()">
            Limpar
          </button>
        </div>

        <span class="text-pt-body-small text-pt-content-default">
          Limite atual: {{ ptToastConfig.max }} — ao passar dele, o mais antigo
          sai da fila.
        </span>

        <PtToastContainer />
      </div>
    `
  })
};
