# PtList

Conjunto de componentes de lista da biblioteca para compor navegacao, menus e agrupamentos de itens com suporte a orientacao horizontal ou vertical, densidade reduzida e sub-listas aninhadas.

## Import

```ts
import {
  PtListItem,
  PtOrderedList,
  PtUnorderedList
} from '@pauta/pt-core-ui';
```

## Componentes disponíveis

- `PtListItem`: item base da lista, com suporte a slots, estados e submenu.
- `PtOrderedList`: container baseado em `<ol>`.
- `PtUnorderedList`: container baseado em `<ul>`.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtListItem, PtUnorderedList } from '@pauta/pt-core-ui';
</script>

<template>
  <PtUnorderedList>
    <PtListItem clickable>Painel</PtListItem>
    <PtListItem clickable>Pedidos</PtListItem>
    <PtListItem clickable>Promoções</PtListItem>
  </PtUnorderedList>
</template>
```

## Exemplo com submenu

```vue
<script setup lang="ts">
import { PtListItem, PtUnorderedList } from '@pauta/pt-core-ui';
</script>

<template>
  <PtUnorderedList orientation="horizontal">
    <PtListItem clickable>Início</PtListItem>
    <PtListItem clickable>
      Produtos

      <PtUnorderedList>
        <PtListItem clickable>Eletronicos</PtListItem>
        <PtListItem clickable>Moda</PtListItem>
      </PtUnorderedList>
    </PtListItem>
  </PtUnorderedList>
</template>
```

## Regras internas

- Sub-listas sempre renderizam visualmente em orientacao vertical, mesmo quando a lista pai e horizontal.
- Quando a navegacao principal e horizontal, o `PtListItem` abre a primeira sub-lista encontrada via `PtDropdown`.
- Quando a navegacao principal e vertical, o `PtListItem` expande ou recolhe a sub-lista inline.
- O primeiro `PtOrderedList` ou `PtUnorderedList` encontrado dentro do slot default de `PtListItem` e tratado como submenu.

## Observações

- Os stories do conjunto ficam centralizados em `src/components/list/PtList.stories.ts`.
- O submenu usa `PtButton`, `PtDropdown` e `PtIcon`, então os ícones usados no contexto da aplicacao precisam estar registrados.
