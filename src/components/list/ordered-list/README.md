# PtOrderedList

Lista ordenada da biblioteca baseada em `<ol>`, pensada para sequencias numeradas e navegacoes que precisam manter contexto hierarquico com `PtListItem`.

## Import

```ts
import { PtOrderedList } from '@pauta/pt-core-ui';
```

## Props principais

- `orientation`: controla a orientacao da lista entre `vertical` e `horizontal`. Default: `vertical`.
- `dense`: reduz ou remove o gap entre os itens.
- `className`: injeta classes extras no container raiz.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtListItem, PtOrderedList } from '@pauta/pt-core-ui';
</script>

<template>
  <PtOrderedList>
    <PtListItem clickable>Passo 1</PtListItem>
    <PtListItem clickable>Passo 2</PtListItem>
    <PtListItem clickable>Passo 3</PtListItem>
  </PtOrderedList>
</template>
```

## Exemplo horizontal

```vue
<script setup lang="ts">
import { PtListItem, PtOrderedList } from '@pauta/pt-core-ui';
</script>

<template>
  <PtOrderedList orientation="horizontal">
    <PtListItem clickable>Início</PtListItem>
    <PtListItem clickable>Conferência</PtListItem>
    <PtListItem clickable>Resumo</PtListItem>
  </PtOrderedList>
</template>
```

## Regras internas

- Quando renderizada dentro de outra lista, a orientacao visual passa a ser vertical automaticamente.
- O contexto interno continua propagando a `navOrientation` da lista pai para o comportamento de submenu do `PtListItem`.
- No modo horizontal, a lista remove a numeracao nativa e usa layout flexivel em linha.
