import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import PtStepper from './PtStepper.vue';
import PtButton from '../buttons/button/PtButton.vue';

library.add(faXmark);

const variantOptions = [
  'primary',
  'secondary',
  'info',
  'system',
  'warning',
  'positive',
  'negative'
] as const;

const steps = [
  {
    title: 'Dados pessoais',
    description: 'Nome completo, CPF e data de nascimento da pessoa usuaria.'
  },
  {
    title: 'Endereco',
    description: 'CEP, cidade e estado usados na confirmacao de cadastro.'
  },
  {
    title: 'Documentos',
    description: 'Envio da foto do documento e do comprovante de residencia.'
  },
  {
    title: 'Confirmacao',
    description: 'Revisao final antes de concluir o cadastro.'
  }
];

/** Descricoes longas o bastante para quebrar em mais de uma linha. */
const longSteps = [
  {
    title: 'Preferencias',
    description:
      'Selecione as preferencias de comunicacao para personalizar sua experiencia na plataforma.'
  },
  {
    title: 'Configuracao',
    description:
      'Revise as opcoes selecionadas antes de concluir a configuracao do seu perfil.'
  }
];

const meta = {
  title: 'Components/PtStepper',
  component: PtStepper,
  tags: ['autodocs'],
  args: {
    steps,
    modelValue: 1,
    variant: 'primary',
    orientation: 'horizontal',
    size: 'medium',
    interactive: true,
    completedIcon: 'check',
    clampDescription: false,
    tooltipPlacement: 'top',
    ariaLabel: 'Progresso das etapas',
    className: '',
    stepClassName: ''
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium']
    },
    interactive: {
      control: 'boolean'
    },
    clampDescription: {
      control: 'boolean'
    },
    modelValue: {
      control: { type: 'number', min: 0, max: 3, step: 1 }
    },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
    },
    completedIcon: {
      control: 'text'
    },
    className: {
      control: 'text'
    },
    stepClassName: {
      control: 'text'
    }
  },
  render: (args) => ({
    components: { PtStepper },
    setup() {
      const current = ref(args.modelValue ?? 0);

      return { args, current };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3 p-pt-3">
        <PtStepper v-bind="args" v-model="current" />
        <span class="font-pt-body text-pt-base text-pt-content-default">
          Passo ativo: {{ current }} - {{ args.steps[current]?.title }}
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  render: () => ({
    components: { PtStepper },
    setup() {
      return { steps };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-6 p-pt-3">
        <PtStepper :steps="steps" :model-value="0" />
        <PtStepper :steps="steps" :model-value="2" />
        <PtStepper :steps="steps" :model-value="3" />
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { PtStepper },
    setup() {
      return { steps };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-6 p-pt-3">
        <PtStepper :steps="steps" size="small" :model-value="2" />
        <PtStepper :steps="steps" size="medium" :model-value="2" />

        <div class="flex gap-pt-8">
          <PtStepper
            :steps="steps"
            size="small"
            orientation="vertical"
            :model-value="2"
          />
          <PtStepper
            :steps="steps"
            size="medium"
            orientation="vertical"
            :model-value="2"
          />
        </div>
      </div>
    `
  })
};

export const Vertical: Story = {
  render: () => ({
    components: { PtStepper },
    setup() {
      return { steps };
    },
    template: `
      <div class="flex w-full max-w-pt-64 p-pt-3">
        <PtStepper :steps="steps" orientation="vertical" :model-value="2" />
      </div>
    `
  })
};

export const DescricaoCortada: Story = {
  name: 'Descricao cortada',
  render: () => ({
    components: { PtStepper },
    setup() {
      return { longSteps };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-6 p-pt-3">
        <div class="flex w-pt-32 max-w-full flex-col gap-pt-1">
          <span class="font-pt-body text-pt-xs text-pt-content-ghost">
            Vertical sem clampDescription: a altura acompanha o texto
          </span>
          <PtStepper
            :steps="longSteps"
            orientation="vertical"
            size="small"
            variant="secondary"
            :interactive="false"
          />
        </div>

        <div class="flex w-pt-32 max-w-full flex-col gap-pt-1">
          <span class="font-pt-body text-pt-xs text-pt-content-ghost">
            Vertical com clampDescription: uma linha por descricao
          </span>
          <PtStepper
            :steps="longSteps"
            orientation="vertical"
            size="small"
            variant="secondary"
            :interactive="false"
            clamp-description
          />
        </div>

        <div class="flex flex-col gap-pt-1">
          <span class="font-pt-body text-pt-xs text-pt-content-ghost">
            Horizontal: o tooltip para em duas linhas
          </span>
          <PtStepper :steps="longSteps" clamp-description />
        </div>
      </div>
    `
  })
};

export const ExternalNavigation: Story = {
  render: () => ({
    components: { PtStepper, PtButton },
    setup() {
      const stepper = ref<InstanceType<typeof PtStepper> | null>(null);
      const current = ref(0);

      const advance = () => stepper.value?.next();
      const regress = () => stepper.value?.prev();

      return { steps, stepper, current, advance, regress };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-3 p-pt-3">
        <PtStepper ref="stepper" v-model="current" :steps="steps" />

        <div class="flex items-center gap-pt-1">
          <PtButton
            variant="outline"
            size="small"
            :disabled="!stepper?.canGoPrev"
            @click="regress"
          >
            Voltar
          </PtButton>
          <PtButton
            size="small"
            :disabled="!stepper?.canGoNext"
            @click="advance"
          >
            Avancar
          </PtButton>
        </div>

        <span class="font-pt-body text-pt-base text-pt-content-default">
          Passo ativo: {{ current }} - {{ steps[current]?.title }}
        </span>
      </div>
    `
  })
};

export const VisualOnly: Story = {
  render: () => ({
    components: { PtStepper },
    setup() {
      return { steps };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-6 p-pt-3">
        <PtStepper :steps="steps" :interactive="false" />
        <PtStepper :steps="steps" :interactive="false" size="small" />

        <div class="flex gap-pt-8">
          <PtStepper
            :steps="steps"
            :interactive="false"
            orientation="vertical"
          />
          <PtStepper
            :steps="steps"
            :interactive="false"
            orientation="vertical"
            size="small"
            variant="positive"
          />
        </div>
      </div>
    `
  })
};

export const Variants: Story = {
  render: () => ({
    components: { PtStepper },
    setup() {
      return { steps, variantOptions };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-6 p-pt-3">
        <PtStepper
          v-for="variant in variantOptions"
          :key="variant"
          :steps="steps"
          :variant="variant"
          :model-value="2"
          :interactive="false"
        />
      </div>
    `
  })
};

export const StepStates: Story = {
  render: () => ({
    components: { PtStepper },
    setup() {
      const customSteps = [
        { title: 'Cadastro', description: 'Concluido sem pendencias.' },
        {
          title: 'Pagamento',
          description: 'Cartao recusado pela operadora.',
          variant: 'negative' as const,
          icon: 'xmark'
        },
        {
          title: 'Analise',
          description: 'Aguardando revisao do time de risco.',
          disabled: true
        },
        { title: 'Liberacao', description: 'Acesso liberado para usar os recursos.' }
      ];

      return { customSteps };
    },
    template: `
      <div class="flex w-full max-w-pt-96 flex-col gap-pt-6 p-pt-3">
        <PtStepper :steps="customSteps" :model-value="2" />
        <PtStepper
          :steps="customSteps"
          orientation="vertical"
          :model-value="2"
        />
      </div>
    `
  })
};
