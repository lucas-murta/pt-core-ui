# PtUnorderedList

Lista não ordenada da biblioteca baseada em `<ul>`, usada para menus, agrupamentos e estruturas de navegacao compostas com `PtListItem`.

## Import

```ts
import { PtUnorderedList } from '@pauta/pt-core-ui';
```

## Props principais

- `orientation`: controla a orientacao da lista entre `vertical` e `horizontal`. Default: `vertical`.
- `dense`: reduz ou remove o gap entre os itens.
- `className`: injeta classes extras no container raiz.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtListItem, PtUnorderedList } from '@pauta/pt-core-ui';
</script>

<template>
  <PtUnorderedList>
    <PtListItem clickable>Painel</PtListItem>
    <PtListItem clickable>Pedidos</PtListItem>
    <PtListItem clickable>Carteira</PtListItem>
  </PtUnorderedList>
</template>
```

## Exemplo horizontal

```vue
<script setup lang="ts">
import { PtListItem, PtUnorderedList } from '@pauta/pt-core-ui';
</script>

<template>
  <PtUnorderedList orientation="horizontal">
    <PtListItem clickable>Início</PtListItem>
    <PtListItem clickable>Novidades</PtListItem>
    <PtListItem clickable>Promoções</PtListItem>
  </PtUnorderedList>
</template>
```

## Regras internas

- Quando renderizada dentro de outra lista, a orientacao visual passa a ser vertical automaticamente.
- A `navOrientation` do contexto pai continua sendo propagada para controlar o comportamento de submenu em `PtListItem`.
- No modo horizontal, a lista usa layout flexivel com quebra de linha e sem bullets nativos.
