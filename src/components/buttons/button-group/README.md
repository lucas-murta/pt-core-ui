# PtButtonGroup

Componente de agrupamento de botoes da biblioteca para compor selecoes simples ou multiplas em cima do `PtButton`, com suporte a orientacao horizontal ou vertical, estado controlado e navegacao por teclado.

## Import

```ts
import { PtButton, PtButtonGroup } from '@pauta/pt-core-ui';
```

## Variantes disponiveis

- `solid`
- `outline`
- `text`

## Cores disponiveis

- `primary`
- `secondary`
- `positive`
- `negative`

## Tamanhos disponiveis

- `small`
- `medium`
- `large`

## Props principais

- `value`: controla o valor selecionado quando o grupo esta em modo controlado.
- `defaultValue`: define o valor inicial no modo nao controlado.
- `onValueChange`: callback disparado sempre que a selecao muda.
- `multiple`: permite selecionar mais de um botao. Default: `false`.
- `orientation`: define a direcao visual do grupo. Default: `horizontal`.
- `variant`: define a variante base aplicada aos botoes filhos. Default: `solid`.
- `size`: define o tamanho base aplicado aos botoes filhos. Default: `medium`.
- `color`: define a cor semantica base aplicada aos botoes filhos. Default: `primary`.
- `disabled`: desabilita todos os botoes do grupo. Default: `false`.
- `className`: injeta classes extras no container raiz.

## Exemplo basico

```vue
<script setup lang="ts">
import { PtButton, PtButtonGroup } from '@pauta/pt-core-ui';
</script>

<template>
  <PtButtonGroup defaultValue="eletronicos">
    <PtButton value="eletronicos">Eletronicos</PtButton>
    <PtButton value="moda">Moda</PtButton>
    <PtButton value="casa">Casa</PtButton>
  </PtButtonGroup>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtButton, PtButtonGroup } from '@pauta/pt-core-ui';

const selected = ref<string | string[]>('week');
</script>

<template>
  <PtButtonGroup v-model:value="selected">
    <PtButton value="day">Dia</PtButton>
    <PtButton value="week">Semana</PtButton>
    <PtButton value="month">Mes</PtButton>
  </PtButtonGroup>
</template>
```

## Exemplo com multiple

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtButton, PtButtonGroup } from '@pauta/pt-core-ui';

const filters = ref<string | string[]>(['pix']);
</script>

<template>
  <PtButtonGroup
    v-model:value="filters"
    multiple
    color="positive"
    variant="outline"
  >
    <PtButton value="pix">Pix</PtButton>
    <PtButton value="card">Cartao</PtButton>
    <PtButton value="wallet">Carteira</PtButton>
  </PtButtonGroup>
</template>
```

## Exemplo vertical

```vue
<template>
  <PtButtonGroup orientation="vertical" size="small" color="secondary">
    <PtButton value="all">Todos</PtButton>
    <PtButton value="open">Abertos</PtButton>
    <PtButton value="closed">Fechados</PtButton>
  </PtButtonGroup>
</template>
```

## Exemplo com icones

```vue
<template>
  <PtButtonGroup defaultValue="instagram" color="secondary" variant="outline">
    <PtButton value="facebook" iconLeft="fab:facebook-f">Facebook</PtButton>
    <PtButton value="instagram" iconLeft="fab:instagram">Instagram</PtButton>
  </PtButtonGroup>
</template>
```

## Regras internas

- O grupo aceita qualquer quantidade de `PtButton` como filhos no slot `default`.
- Quando `multiple` for `false`, apenas um valor fica ativo por vez.
- Quando `multiple` for `true`, os cliques alternam inclusao e remocao do item selecionado.
- Para `primary` e `secondary`, o item ativo alterna para a cor oposta mantendo a variante.
- Para `positive` e `negative`, o item ativo mantem a cor e alterna entre `solid` e `outline`.
- O componente suporta navegacao por teclado com setas: `ArrowLeft` e `ArrowRight` no modo horizontal, `ArrowUp` e `ArrowDown` no modo vertical.
- Os botoes filhos continuam podendo usar `iconLeft` e `iconRight`, porque o grupo apenas orquestra e complementa o `PtButton`.

## Observacoes

- O componente faz `v-bind="$attrs"` no container raiz, aceitando `id`, `data-*` e atributos nativos extras.
- Os botoes filhos recebem automaticamente as classes de colapso visual do grupo, com raio apenas nas extremidades.
- Quando os filhos usarem icones, a aplicacao consumidora precisa registrar os `IconDefinition` desejados no Font Awesome.
