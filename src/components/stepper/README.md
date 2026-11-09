# PtStepper

Componente de etapas (stepper) da biblioteca. O andamento e controlado pelo indice ativo recebido por `modelValue`: o passo ativo recebe a cor de feedback, os passos anteriores ficam concluidos em estado desativado e os seguintes ficam pendentes.

Nao existem botoes de avancar/regredir dentro do componente. A navegacao acontece por `v-model`, pelo clique nos passos ou pelas funcoes expostas (`next`, `prev`, `goTo`, `reset`), sempre devolvendo para o dev qual passo esta ativo.

## Import

```ts
import { PtStepper } from '@pauta/pt-core-ui';
```

## Props

| Prop               | Tipo                             | Default                | Descricao                                                             |
| ------------------ | -------------------------------- | ---------------------- | --------------------------------------------------------------------- |
| `steps`            | `PtStepperStep[]`                | `[]`                   | Passos renderizados na ordem informada.                               |
| `modelValue`       | `number`                         | `0`                    | Indice do passo ativo (`v-model`), iniciando em `0`.                  |
| `variant`          | `PtStepperVariant`               | `primary`              | Cor de feedback do passo ativo.                                       |
| `orientation`      | `horizontal \| vertical`         | `horizontal`           | Direcao do stepper.                                                   |
| `size`             | `small \| medium`                | `medium`               | Escala do bullet e das fontes.                                        |
| `interactive`      | `boolean`                        | `true`                 | `false` deixa o stepper apenas visual, sem navegacao nem status.      |
| `completedIcon`    | `string`                         | `check`                | Icone dos passos concluidos; `''` mantem a posicao numerica.          |
| `clampDescription` | `boolean`                        | `false`                | Corta a descricao com reticencias: 1 linha na vertical, 2 no tooltip. |
| `tooltipPlacement` | `top \| bottom \| left \| right` | `top`                  | Posicao do tooltip de descricao na orientacao horizontal.             |
| `ariaLabel`        | `string`                         | `Progresso das etapas` | Rotulo do grupo de passos.                                            |
| `className`        | `string`                         | `''`                   | Classes extras na lista.                                              |
| `stepClassName`    | `string`                         | `''`                   | Classes extras em cada passo.                                         |

### PtStepperStep

| Campo         | Tipo               | Descricao                                                                    |
| ------------- | ------------------ | ---------------------------------------------------------------------------- |
| `title`       | `string`           | Titulo do passo.                                                             |
| `description` | `string`           | Texto de apoio: tooltip na horizontal, texto corrido na vertical.            |
| `label`       | `string`           | Conteudo do bullet; sobrescreve a posicao numerica.                          |
| `icon`        | `string`           | Icone do bullet (nome aceito pelo `PtIcon`); tem prioridade sobre `label`.   |
| `variant`     | `PtStepperVariant` | Cor de feedback exclusiva do passo, aplicada em qualquer estado (ex.: erro). |
| `disabled`    | `boolean`          | Bloqueia a selecao do passo.                                                 |

### Tamanhos disponiveis

| Tamanho  | Bullet        | Fonte          | Conteudo do bullet                            |
| -------- | ------------- | -------------- | --------------------------------------------- |
| `small`  | 8px (`pt-1`)  | `text-pt-xs`   | nenhum: ponto solido                          |
| `medium` | 32px (`pt-4`) | `text-pt-base` | posicao numerica, `icon`/`label` ou concluido |

No `small` o bullet e um ponto solido: nao ha posicao numerica, icone de concluido nem `icon`/`label` do passo — nada disso caberia em 8px. Os estados continuam legiveis pela cor do ponto e do titulo.

No `medium` a posicao numerica e o conteudo padrao do bullet e aparece tambem no modo apenas visual.

Na orientacao vertical o bullet e a primeira linha do titulo ficam centralizados entre si em qualquer tamanho: no `small` o bullet desce 5px (bullet de 8px contra linha de 18px) e no `medium` o texto desce 4px (bullet de 32px contra linha de 24px). O conector avanca o mesmo deslocamento do bullet, encostando sem folga no bullet do passo seguinte.

### Variantes disponiveis

`primary`, `secondary`, `info`, `system`, `warning`, `positive`, `negative` — as mesmas cores de feedback usadas pelo restante da biblioteca.

## Eventos

| Evento              | Payload                              | Quando                                      |
| ------------------- | ------------------------------------ | ------------------------------------------- |
| `update:modelValue` | `index: number`                      | O passo ativo mudou.                        |
| `change`            | `index: number, step: PtStepperStep` | O passo ativo mudou, com o passo resolvido. |
| `step-click`        | `index: number, step: PtStepperStep` | Clique em um passo selecionavel.            |

## Metodos expostos

Disponiveis via `ref` no componente:

| Membro        | Tipo                         | Descricao                                                     |
| ------------- | ---------------------------- | ------------------------------------------------------------- |
| `activeIndex` | `number`                     | Indice ativo atual.                                           |
| `activeStep`  | `PtStepperStep \| undefined` | Passo ativo atual.                                            |
| `total`       | `number`                     | Quantidade de passos.                                         |
| `canGoNext`   | `boolean`                    | `true` quando existe passo seguinte e o stepper e interativo. |
| `canGoPrev`   | `boolean`                    | `true` quando existe passo anterior e o stepper e interativo. |
| `next()`      | `() => number`               | Avanca um passo e devolve o indice ativo.                     |
| `prev()`      | `() => number`               | Regride um passo e devolve o indice ativo.                    |
| `goTo(index)` | `(index) => number`          | Vai para um indice especifico e devolve o indice ativo.       |
| `reset()`     | `() => number`               | Volta para o primeiro passo.                                  |

## Exemplo basico

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { PtStepper } from '@pauta/pt-core-ui';

const current = ref(0);

const steps = [
  { title: 'Dados pessoais', description: 'Nome completo, CPF e nascimento.' },
  { title: 'Endereco', description: 'CEP, cidade e estado.' },
  { title: 'Documentos', description: 'Foto do documento e comprovante.' }
];
</script>

<template>
  <PtStepper v-model="current" :steps="steps" />
</template>
```

## Avancar e regredir de fora do componente

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { PtButton, PtStepper } from '@pauta/pt-core-ui';

const stepper = ref<InstanceType<typeof PtStepper> | null>(null);
const current = ref(0);

const onChange = (index: number) => {
  console.log('passo ativo', index);
};
</script>

<template>
  <PtStepper
    ref="stepper"
    v-model="current"
    :steps="steps"
    @change="onChange"
  />

  <div class="flex gap-pt-1">
    <PtButton
      variant="outline"
      :disabled="!stepper?.canGoPrev"
      @click="stepper?.prev()"
    >
      Voltar
    </PtButton>
    <PtButton :disabled="!stepper?.canGoNext" @click="stepper?.next()">
      Avancar
    </PtButton>
  </div>
</template>
```

## Tamanho small

```vue
<template>
  <PtStepper v-model="current" :steps="steps" size="small" />
</template>
```

## Orientacao vertical

```vue
<template>
  <PtStepper v-model="current" :steps="steps" orientation="vertical" />
</template>
```

Na vertical a `description` aparece como texto corrido abaixo do titulo. Na horizontal a mesma `description` fica dentro de um tooltip aberto no hover e no foco do passo.

## Descricao com altura previsivel

```vue
<template>
  <PtStepper :steps="steps" orientation="vertical" clamp-description />
</template>
```

Por padrao a `description` cresce o quanto precisar, e a altura do stepper acompanha o texto. Com `clampDescription` ela e cortada com reticencias:

| Orientacao | Onde a descricao aparece | Limite      |
| ---------- | ------------------------ | ----------- |
| vertical   | texto corrido            | uma linha   |
| horizontal | tooltip                  | duas linhas |

Use quando varios steppers dividem a mesma fileira e a altura precisa ser previsivel — um formulario de cadastro, por exemplo. Em troca, o texto cortado deixa de ser legivel por completo: so aplique onde a descricao e complementar, nao onde ela carrega informacao que o usuario precisa ler inteira.

## Apenas visual

```vue
<template>
  <PtStepper :steps="steps" :interactive="false" />
</template>
```

Com `interactive` como `false` o stepper vira uma composicao visual, sem navegacao e sem status:

- os passos viram `div` sem clique nem foco, e `next`, `prev`, `goTo` e `reset` nao alteram o passo ativo;
- todos os passos usam a cor da `variant`, como se estivessem ativos;
- no `medium` o bullet mantem a posicao numerica, mas nao existe icone de concluido;
- no `small` o bullet continua sendo um ponto solido, entao o modo visual muda apenas as cores;
- os conectores ficam todos neutros e nenhum passo recebe `aria-current`;
- `icon`, `label` e `variant` declarados no passo continuam valendo.

## Passo com erro

```vue
<script setup lang="ts">
const steps = [
  { title: 'Cadastro', description: 'Concluido sem pendencias.' },
  {
    title: 'Pagamento',
    description: 'Cartao recusado pela operadora.',
    variant: 'negative',
    icon: 'xmark'
  },
  { title: 'Analise', description: 'Aguardando revisao.', disabled: true }
];
</script>
```

## Regras internas

- `modelValue` e normalizado por `clampStepIndex`: valores fora do intervalo, decimais e invalidos sao ajustados para o primeiro ou o ultimo passo.
- `resolveStepState` define o estado por indice: `completed` antes do ativo, `active` no ativo e `upcoming` depois dele.
- `resolveStepTone` define a familia de cor: a cor de feedback vale para o passo ativo, para qualquer passo com `variant` proprio e para todos os passos quando `interactive` e `false`; concluidos ficam desativados e pendentes ficam neutros.
- `resolveStepBulletContent` resolve o conteudo do bullet: no `small` sempre vazio; no `medium` a ordem e `icon` do passo, icone de concluido, `label` do passo e posicao numerica — o icone de concluido so entra quando o stepper e interativo.
- Clique no passo ja ativo emite apenas `step-click`.
- Passos com `disabled` nao entram na navegacao, nem por clique nem por `next`, `prev` ou `goTo`.
- Quando a lista de passos diminui, o indice ativo e reajustado para o ultimo passo valido.
- O componente nao renderiza nada quando `steps` esta vazio.

## Tokens usados

- Bullet ativo (e todos os bullets no modo apenas visual): `bg-pt-primary`, `bg-pt-secondary`, `bg-pt-info`, `bg-pt-system`, `bg-pt-warning`, `bg-pt-positive` ou `bg-pt-negative`, com texto em `pt-content-bright` ou `pt-content-din`.
- Bullet concluido e conector percorrido: `bg-pt-content-disable`, com texto em `pt-surface-0`.
- Bullet pendente: `bg-pt-surface-2` com borda `pt-border-2` e texto `pt-content-ghost`.
- Conector pendente: `bg-pt-border-2`.
- Titulo ativo: `text-pt-content-<variant>`; concluido: `text-pt-content-disable`; pendente: `text-pt-content-ghost`.
- Tipografia: `font-pt-body` com `text-pt-base` no `medium` e `text-pt-xs` no `small`, em bullets, titulos e descricoes.
- Espacamento `medium`: bullet de `pt-4` (32px), `gap-pt-1` na horizontal e `gap-pt-2` com `pb-pt-3` na vertical.
- Espacamento `small`: bullet de `pt-1` (8px), `gap-[4px]` na horizontal e `gap-pt-1` com `pb-pt-2` na vertical.

## Acessibilidade

- A lista usa `<ol role="list">` com `aria-label` configuravel.
- O passo ativo recebe `aria-current="step"` — exceto no modo apenas visual, que nao comunica status.
- Passos selecionaveis sao `button` com anel de foco em `pt-focus`.
- Na horizontal, passos nao interativos com `description` recebem `tabindex="0"` para que o tooltip abra pelo teclado; o `PtTooltip` conecta o texto via `aria-describedby` e fecha com `Escape`.
- Conectores sao `aria-hidden`.
- `data-pt-step-state`, `data-pt-step-bullet` e `data-pt-step-description` estao disponiveis para testes e QA.

## Observacoes

- O icone `check` dos passos concluidos ja vem registrado no componente. Icones informados em `step.icon` precisam ser registrados na `library` do Font Awesome pelo projeto consumidor, como nos demais componentes com icone.
- O componente ocupa `100%` da largura disponivel; controle a largura pelo container ou por `className`.
