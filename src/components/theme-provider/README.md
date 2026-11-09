# PtThemeProvider

Define o tema de um trecho da aplicacao. Aplica `data-theme` no elemento que renderiza, e todo o conteudo abaixo passa a ler os tokens `--pt-*` daquele escopo — inclusive outro `PtThemeProvider` aninhado.

## Import

```ts
import { PtThemeProvider, useTheme } from '@pauta/pt-core-ui';
```

## Como funciona

O tema vive em duas camadas que o componente mantem em sincronia:

- **CSS**: o `data-theme` no elemento raiz troca os aliases semanticos de `tokens.css` para todo o subtree, pela cascata. Nenhum componente precisa saber que o tema mudou.
- **JavaScript**: um contexto `provide`/`inject` expoe o tema resolvido para quem precisa decidir em codigo (ilustracao por tema, conteudo em `Teleport`, canvas).

Por isso trocar de tema nao re-renderiza a arvore: o que muda e um atributo.

## Props

- `theme`: tema aplicado ao conteudo. `light`, `dark`, `system` (segue `prefers-color-scheme`) ou `inherit`. Default: `inherit`.
- `as`: tag HTML renderizada. Default: `div`.
- `root`: espelha o tema resolvido no `<html>`. Use no provider de topo, para que `body` e as scrollbars da janela acompanhem o tema. Default: `false`.
- `inline`: aplica `display: contents`, removendo o elemento do layout. Use dentro de `flex`/`grid`, onde um wrapper extra quebraria o arranjo. Default: `false`.
- `className`: classes extras no elemento raiz.

## Eventos

- `update:theme`: emitido por `setTheme`/`toggle`. Habilita `v-model:theme`.
- `change`: emitido quando o tema **resolvido** muda, com `light` ou `dark`.

## Exemplo basico

```vue
<script setup lang="ts">
import { PtPaper, PtThemeProvider } from '@pauta/pt-core-ui';
</script>

<template>
  <PtThemeProvider theme="dark" root>
    <PtPaper variant="surface-1" padding="3"> Conteudo no tema escuro </PtPaper>
  </PtThemeProvider>
</template>
```

## Ilhas de tema

Providers aninhados invertem o tema em qualquer profundidade:

```vue
<PtThemeProvider theme="dark">
  <PtPaper variant="surface-1" padding="3">
    <PtThemeProvider theme="light">
      <PtPaper variant="surface-1" padding="3">Ilha clara</PtPaper>
    </PtThemeProvider>
  </PtPaper>
</PtThemeProvider>
```

O provider nao pinta fundo nem texto: ele so define o escopo dos tokens. Use `PtPaper` (ou as classes `bg-pt-*` / `text-pt-*`) para a superficie, e o resultado acompanha o tema da ilha.

## Trocando o tema

Com `v-model:theme`, quem controla o estado e a aplicacao:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { PtThemeProvider } from '@pauta/pt-core-ui';

const theme = ref<'light' | 'dark'>('dark');
</script>

<template>
  <PtThemeProvider v-model:theme="theme" root>
    <slot />
  </PtThemeProvider>
</template>
```

Sem `v-model`, `setTheme` e `toggle` guardam a escolha no proprio provider. A prop volta a mandar assim que o valor dela mudar.

## useTheme

Le o tema do provider mais proximo. Util para decisoes que o CSS nao resolve.

```vue
<script setup lang="ts">
import { useTheme } from '@pauta/pt-core-ui';

const { theme, resolvedTheme, systemTheme, setTheme, toggle } = useTheme();
</script>

<template>
  <button @click="toggle">Tema atual: {{ resolvedTheme }}</button>
</template>
```

- `theme`: o que foi pedido (`inherit`, `system`, `light`, `dark`).
- `resolvedTheme`: o que esta valendo (`light` ou `dark`) — use este para decidir em codigo.
- `systemTheme`: preferencia do sistema, ou `null` antes da montagem.

Sem provider na arvore, `resolvedTheme` reflete o `data-theme` do `<html>` e `setTheme`/`toggle` nao fazem nada: nao ha escopo para alterar.

## Conteudo teleportado

`PtModal` e `PtToastContainer` usam `Teleport` para `body`, o que os tira do subtree do provider — e, com isso, do escopo do `data-theme`. Os dois resolvem isso sozinhos: leem o contexto por `useTheme` e reaplicam o tema na propria raiz teleportada.

Vale o provider mais proximo de onde o componente esta **declarado no template**. Um modal declarado dentro de uma ilha clara abre claro, mesmo num app escuro.

Qualquer componente que venha a usar `Teleport` precisa fazer o mesmo:

```vue
<script setup lang="ts">
import { useTheme } from '@pauta/pt-core-ui';

const { resolvedTheme } = useTheme();
</script>

<template>
  <Teleport to="body">
    <div :data-theme="resolvedTheme">
      <slot />
    </div>
  </Teleport>
</template>
```

## Persistencia e SSR

A biblioteca nao grava a escolha do usuario. Quem persiste e a aplicacao, que conhece a chave, o storage e a estrategia de SSR:

- guarde o tema onde preferir e passe por `v-model:theme`;
- em SSR, escreva o `data-theme` no `<html>` antes da hidratacao (script inline no `<head>`), para evitar o flash de tema errado. O provider com `root` assume dali em diante.

## Observacoes

- `prefers-color-scheme` e medido uma unica vez por aplicacao: os providers compartilham a mesma assinatura de `matchMedia`, independentemente de quantos estiverem montados.
- Antes da montagem — SSR ou primeiro render — `system` resolve para o tema do provider acima em vez de assumir `light`, evitando um salto de cor na hidratacao.
- `root` restaura o valor anterior do `<html>` ao desmontar.
