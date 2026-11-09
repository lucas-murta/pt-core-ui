# @pauta/pt-core-ui

Biblioteca de componentes Vue 3 com Vite, Tailwind CSS e Storybook.

O pacote foi pensado para ser consumido em projetos Vue/Nuxt e tambem expõe tokens de design, estilos CSS e configuracao Tailwind reutilizavel.

## Recursos

- Componentes Vue 3 empacotados para consumo externo.
- Tokens CSS publicados para reutilizacao em outros projetos.
- Tema claro/escuro hierarquico com `PtThemeProvider` e `useTheme`.
- Fontes locais `Afacad` e `Space Grotesk`.
- Tema Tailwind exportavel com `ptTailwindTheme` e `ptTailwindPlugins`.
- Storybook para documentacao e desenvolvimento visual.
- Testes com Vitest e `@vue/test-utils`.
- Release automatizada com `semantic-release`.

## Instalacao

```bash
npm install @pauta/pt-core-ui
```

## Uso

### Cenario 1: projeto novo ou simples

Use esse fluxo quando o projeto consumidor ainda nao possui uma configuracao Tailwind propria relevante e voce quer carregar rapidamente a base visual da biblioteca.

```ts
import { createApp } from 'vue';
import App from './App.vue';

import '@pauta/pt-core-ui/style.css';

createApp(App).mount('#app');
```

```vue
<script setup lang="ts">
import { PtTypography } from '@pauta/pt-core-ui';
</script>

<template>
  <PtTypography as="h2" variant="heading-3"> Titulo da secao </PtTypography>
</template>
```

### Cenario 2: projeto existente com Tailwind proprio

Use esse fluxo quando o projeto consumidor ja controla o proprio `tailwind.config` e voce nao quer sobrescrever a configuracao local.

Nesse caso:

- mantenha a configuracao atual do projeto consumidor
- faca merge de `ptTailwindTheme` em `theme.extend`
- adicione `ptTailwindPlugins` junto com os plugins locais
- carregue `tokens.css` no CSS global principal do projeto
- nao use `style.css` como entrada principal nesse cenario

Exemplo de merge em um `tailwind.config.js` existente:

```ts
import { ptTailwindPlugins, ptTailwindTheme } from '@pauta/pt-core-ui';

export default {
  content: ['./app/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        ...ptTailwindTheme.colors
      },
      fontFamily: {
        ...ptTailwindTheme.fontFamily
      },
      fontSize: {
        ...ptTailwindTheme.fontSize
      },
      lineHeight: {
        ...ptTailwindTheme.lineHeight
      },
      letterSpacing: {
        ...ptTailwindTheme.letterSpacing
      },
      borderRadius: {
        ...ptTailwindTheme.borderRadius
      },
      boxShadow: {
        ...ptTailwindTheme.boxShadow
      },
      dropShadow: {
        ...ptTailwindTheme.dropShadow
      },
      spacing: {
        ...ptTailwindTheme.spacing
      },
      textShadow: {
        ...ptTailwindTheme.textShadow
      },
      keyframes: {
        ...ptTailwindTheme.keyframes
      },
      animation: {
        ...ptTailwindTheme.animation
      }
    }
  },
  plugins: [...ptTailwindPlugins]
};
```

Exemplo de import dos tokens no CSS global principal:

```css
@import '@pauta/pt-core-ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Fontes

Use quando quiser disponibilizar apenas as familias Afacad e Space Grotesk.

```ts
import '@pauta/pt-core-ui/afacad.css';
import '@pauta/pt-core-ui/space-grotesk.css';
```

## Integracao Com Tailwind

O pacote exporta `ptTailwindTheme` e `ptTailwindPlugins` para reutilizacao no `tailwind.config.ts`.

Para projetos novos ou simples, um exemplo minimo seria:

```ts
import type { Config } from 'tailwindcss';

import { ptTailwindPlugins, ptTailwindTheme } from '@pauta/pt-core-ui';

export default {
  content: ['./src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: ptTailwindTheme
  },
  plugins: ptTailwindPlugins
} satisfies Config;
```

Para projetos existentes, prefira fazer merge em vez de substituir a configuracao local:

```ts
import { ptTailwindPlugins, ptTailwindTheme } from '@pauta/pt-core-ui';

export default {
  theme: {
    extend: {
      ...ptTailwindTheme
    }
  },
  plugins: [...ptTailwindPlugins]
};
```

Ao usar essa integracao, carregue tambem os tokens CSS no CSS global principal da aplicacao:

```css
@import '@pauta/pt-core-ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Temas

As cores semanticas do `tokens.css` vivem em dois blocos — claro e escuro — selecionados pelo atributo `data-theme`. O seletor nao esta preso ao `<html>`, entao o tema pode mudar em qualquer ponto da arvore. Quem aplica esse atributo e o `PtThemeProvider`.

### Tema da aplicacao

Envolva a aplicacao uma vez. Com `root`, o tema tambem e espelhado no `<html>`, para que `body` e as scrollbars da janela acompanhem:

```vue
<script setup lang="ts">
import { PtThemeProvider } from '@pauta/pt-core-ui';
</script>

<template>
  <PtThemeProvider theme="dark" root>
    <RouterView />
  </PtThemeProvider>
</template>
```

`theme` aceita `light`, `dark`, `system` (segue o `prefers-color-scheme` do sistema) e `inherit`. Sem nenhum provider, vale o tema claro do `:root`.

### Ilhas de tema

Providers aninhados invertem o tema em qualquer profundidade — inclusive uma ilha clara dentro de um app escuro:

```vue
<PtThemeProvider theme="dark" root>
  <PtPaper variant="surface-1" padding="3">
    <PtThemeProvider theme="light">
      <PtPaper variant="surface-1" padding="3">Ilha clara</PtPaper>
    </PtThemeProvider>
  </PtPaper>
</PtThemeProvider>
```

Nenhum componente precisa saber que o tema mudou: quem troca e o escopo dos tokens CSS, pela cascata. O provider nao pinta fundo nem texto — a superficie continua vindo do `PtPaper` ou das classes `bg-pt-*` / `text-pt-*`.

### Lendo o tema em codigo

Para decisoes que o CSS nao resolve — trocar uma ilustracao, desenhar num canvas, escolher o tema de um grafico:

```vue
<script setup lang="ts">
import { useTheme } from '@pauta/pt-core-ui';

const { resolvedTheme, toggle } = useTheme();
</script>

<template>
  <button @click="toggle">Tema atual: {{ resolvedTheme }}</button>
</template>
```

`resolvedTheme` e sempre `light` ou `dark`, ja resolvido a partir de `system`/`inherit`.

### Persistencia e SSR

A biblioteca nao grava a escolha do usuario — a aplicacao conhece a chave, o storage e a estrategia. Guarde o valor onde preferir e passe por `v-model:theme`. Em SSR, escreva o `data-theme` no `<html>` antes da hidratacao, com um script inline no `<head>`, para evitar o flash de tema errado; o provider com `root` assume dali em diante.

Props, eventos e o comportamento de conteudo teleportado (`PtModal` e `PtToastContainer`) estao detalhados no [README do PtThemeProvider](./src/components/theme-provider/README.md).

## Exports Publicos

- `@pauta/pt-core-ui`
- `@pauta/pt-core-ui/style.css`
- `@pauta/pt-core-ui/tokens.css`
- `@pauta/pt-core-ui/afacad.css`
- `@pauta/pt-core-ui/space-grotesk.css`
- `@pauta/pt-core-ui/tailwind.config`

## Scripts Do Projeto

```bash
npm run storybook
npm run build-storybook
npm run lint
npm run test:run
npm run test:coverage
npm run build
```

## Release

O projeto usa `semantic-release` com Conventional Commits.

Exemplos validos:

```bash
feat(button): adicionar nova variante
fix(tokens): corrigir token de hover
refactor(theme): reorganizar tema tailwind
```

Branches configuradas:

- `main`: release de producao.
- `develop`: prerelease beta.

## Estrutura

```text
src/
  components/   componentes Vue
  composables/  composables publicos (useTheme, useToast, ...)
  css/          entradas CSS publicadas
  tokens/       tema e plugins Tailwind exportados
  assets/fonts/ fontes locais publicadas
```

## Desenvolvimento Local

```bash
npm install
npm run storybook
```

Para validar antes de subir alteracoes:

```bash
npm run lint
npm run test:run
npm run build
```
