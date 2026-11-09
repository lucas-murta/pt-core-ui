# PtModal

Componente de modal da biblioteca para exibir conteúdo sobreposto ao viewport, com `Teleport`, fechamento por `Escape` e reaproveitamento da API visual do `PtPaper`.

## Import

```ts
import { PtModal } from '@pauta/pt-core-ui';
```

## Slots

- `default`: conteúdo renderizado dentro do modal.

## Props principais

- `open`: controla a visibilidade do modal. Default: `false`.
- `showCloseButton`: exibe o botão de fechar no canto superior. Default: `false`.
- `closeOnOutsideClick`: fecha ao clicar no overlay. Default: `false`.
- `variant`: controla a superfície visual do container.
- `border`: define a borda aplicada ao `PtPaper`.
- `borderRadius`: define o raio do container. Default: `1`.
- `elevation`: define a sombra do container. Default: `2`.
- `interactive`: reaproveita o comportamento visual interativo do `PtPaper`.
- `bgImage`: aplica imagem de fundo ao container.
- `width` / `height`: controlam dimensões do container.
- `padding`, `paddingSm`, `paddingMd`, `paddingLg`: controlam o espaçamento interno.
- `margin`, `marginSm`, `marginMd`, `marginLg`: controlam o espaçamento externo.
- `className`: injeta classes extras no container do modal.

## Eventos

- `update:open`: retorna `false` quando o modal é fechado por ação interna.
- `close`: emitido junto com o fechamento do modal.

## Exemplo básico

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtButton, PtModal, PtTypography } from '@pauta/pt-core-ui';

const open = ref(false);
</script>

<template>
  <PtButton @click="open = true">Abrir modal</PtButton>

  <PtModal :open="open" width="64" padding="4" @update:open="open = $event">
    <div class="flex flex-col gap-pt-3">
      <PtTypography as="h2" variant="heading-3">Título do modal</PtTypography>
      <PtTypography as="p" variant="body-medium">
        Conteúdo principal do modal.
      </PtTypography>
      <PtButton @click="open = false">Fechar</PtButton>
    </div>
  </PtModal>
</template>
```

## Exemplo com botão de fechar

```vue
<PtModal
  :open="open"
  show-close-button
  close-on-outside-click
  width="64"
  padding="4"
  @update:open="open = $event"
>
  <div class="flex flex-col gap-pt-3">
    <p class="m-0">Este modal pode ser fechado pelo botão, clique fora ou Escape.</p>
  </div>
</PtModal>
```

## Regras internas

- O componente usa `Teleport` para `body`.
- O conteúdo central é renderizado com `PtPaper`, então o modal reaproveita toda a API visual desse componente.
- O fechamento por `Escape` só fica ativo enquanto o modal está aberto.

## Tema

O `Teleport` tira o modal do subtree onde ele foi declarado, então o tema é reaplicado na raiz teleportada: vale o [`PtThemeProvider`](../theme-provider/README.md) mais próximo de onde o `PtModal` está no template, e não o tema do `<html>`.

Um modal declarado dentro de uma ilha clara abre claro, mesmo num app escuro. Para que ele siga outro tema, basta declarar o provider desejado em volta:

```vue
<PtThemeProvider theme="dark">
  <PtModal :open="open">Sempre escuro</PtModal>
</PtThemeProvider>
```

Sem nenhum provider na árvore, o modal acompanha o `data-theme` do documento.
