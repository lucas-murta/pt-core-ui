# PtTooltip

Componente de tooltip da biblioteca para exibir conteúdo contextual flutuante a partir de hover, foco ou controle externo.

## Import

```ts
import { PtTooltip } from '@pauta/pt-core-ui';
```

## Slots

- `trigger`: conteúdo que recebe a interação do tooltip.
- `default`: conteúdo exibido no painel do tooltip.

## Props principais

- `placement`: define a posição do painel. Aceita `top`, `bottom`, `left` ou `right`. Default: `top`.
- `offset`: define a distância entre trigger e painel. Default: `8`.
- `open`: controla o estado aberto de forma externa.
- `defaultOpen`: define o estado inicial no modo não controlado. Default: `false`.
- `onOpenChange`: callback disparado quando o estado aberto muda.
- `disabled`: impede abertura por hover, foco ou interação de teclado. Default: `false`.
- `triggerProps`: permite encaminhar atributos e handlers extras para o wrapper do trigger.
- `className`: injeta classes extras no container raiz.
- `panelClassName`: injeta classes extras no painel flutuante.

## Eventos

- `update:open`: emitido quando o estado aberto muda.
- `open-change`: emitido junto com a mudança de estado.

## Exemplo básico

```vue
<template>
  <PtTooltip>
    <template #trigger>
      <button
        type="button"
        class="rounded-pt-1 border border-pt-border-2 px-pt-2 py-pt-1"
      >
        Passe o mouse
      </button>
    </template>

    Conteúdo do tooltip
  </PtTooltip>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <PtTooltip :open="open" @update:open="open = $event">
    <template #trigger>
      <button
        type="button"
        class="rounded-pt-1 border border-pt-border-2 px-pt-2 py-pt-1"
      >
        Tooltip controlado
      </button>
    </template>

    Tooltip aberto por estado externo
  </PtTooltip>
</template>
```

## Exemplo com `triggerProps`

```vue
<template>
  <PtTooltip
    :trigger-props="{
      title: 'Ajuda contextual',
      className: 'rounded-pt-1 outline outline-1 outline-pt-border-2'
    }"
  >
    <template #trigger>
      <span tabindex="0" class="inline-flex px-pt-2 py-pt-1">Foque aqui</span>
    </template>

    Tooltip com atributos adicionais no trigger
  </PtTooltip>
</template>
```

## Regras internas

- O painel usa `role="tooltip"` e associa o trigger com `aria-describedby` quando aberto.
- O posicionamento usa `position: fixed` com atualização em `resize`, `scroll` e `ResizeObserver`.
- O tooltip fecha com `Escape`, `mouseleave` e `blur`.
