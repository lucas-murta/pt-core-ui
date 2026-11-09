# PtIcon

Componente de icone da biblioteca. Controla tamanho pela escala visual do design system, acessibilidade e classes, e delega o desenho do icone a um renderizador da aplicacao — como o `Icon` do `@nuxt/icon`. Sem renderizador, desenha com o Font Awesome embutido (`fa` e `fab`).

## Import

```ts
import { PtIcon } from '@pauta/pt-core-ui';
```

## Bibliotecas disponiveis

- `fa`
- `fab`

## Tamanhos disponiveis

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`

## Props principais

- `name`: nome do icone. Aceita nome simples (`plus`), prefixo da lib (`fab:facebook-f`) ou qualquer nome do Iconify (`mdi:home`, `fa6-solid:plus`).
- `lib`: define a biblioteca usada como fallback quando `name` nao vier prefixado. Default: `fa`.
- `size`: define a escala visual do container do icone entre `1` e `12`.
- `ariaLabel`: aplica rotulo acessivel no container e no `svg`.
- `className`: injeta classes extras no elemento raiz.

## Uso com o Icon do Nuxt

Entregue o `Icon` do `@nuxt/icon` pela chave `ptIconRendererKey` em um plugin da aplicacao. A partir dai todo `PtIcon` — inclusive os usados por dentro de `PtInput`, `PtTabs`, `PtSelect` e dos demais componentes — e desenhado pelo Nuxt, com a mesma renderizacao no servidor e hidratacao dos icones da aplicacao.

```ts
// plugins/pt-core-ui.ts
import { Icon } from '#components';
import { ptIconRendererKey } from '@pauta/pt-core-ui';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ptIconRendererKey, Icon);
});
```

O `name` chega ao renderizador no formato Iconify:

| `name` no PtIcon | Enviado ao renderizador |
| ---------------- | ----------------------- |
| `plus`           | `fa6-solid:plus`        |
| `fab:facebook-f` | `fa6-brands:facebook-f` |
| `mdi:home`       | `mdi:home`              |

As colecoes `fa6-solid` e `fa6-brands` usam os mesmos nomes do Font Awesome 6 Free, entao os nomes que ja existem continuam valendo. A aplicacao precisa ter essas colecoes disponiveis no `@nuxt/icon` (por exemplo `@iconify-json/fa6-solid` e `@iconify-json/fa6-brands`), porque os componentes da lib usam icones delas por dentro, como `xmark` e `chevron-down`.

## Exemplo basico

```vue
<script setup lang="ts">
import { PtIcon } from '@pauta/pt-core-ui';
</script>

<template>
  <div class="flex items-center gap-pt-2">
    <PtIcon name="plus" :size="2" aria-label="Adicionar" />
    <PtIcon name="chevron-right" :size="2" aria-label="Avancar" />
  </div>
</template>
```

## Exemplo com brand

```vue
<template>
  <div class="flex items-center gap-pt-2">
    <PtIcon name="fab:facebook-f" :size="3" aria-label="Facebook" />
    <PtIcon name="fab:instagram" :size="3" aria-label="Instagram" />
  </div>
</template>
```

## Regras internas

- Sem renderizador, so aparecem os icones registrados no Font Awesome **da propria lib**: os de uso interno dos componentes. O Font Awesome vai embutido no pacote, entao um `library.add` feito na aplicacao registra em outra instancia e nao chega ao PtIcon. Para usar qualquer icone, configure o renderizador.
- O `name` e normalizado para lowercase e troca `_` por `-` antes da busca.
- Quando `name` vier com prefixo, como `fab:facebook-f`, esse prefixo sobrescreve o `lib`.
- No Font Awesome, os prefixos `fa`, `fas` e `fa6-solid` vao para o solid e `fab` e `fa6-brands` para o brands. Colecoes de fora do Font Awesome, como `mdi:home`, so aparecem com renderizador.
- Quando o icone nao for encontrado, o componente mantem o `span` raiz e nao renderiza o `svg`.
- Com renderizador, o icone recebe as mesmas classes de tamanho (`w-[90%] h-[90%]`) e o atributo `data-pt-icon-renderer`.

## Observacoes

- O tamanho usa classes `w-pt-*` e `h-pt-*` derivadas da escala visual do projeto.
- O `svg` interno usa `w-[90%]` e `h-[90%]` para manter respiro dentro do container.
- O componente faz `v-bind="$attrs"` no elemento raiz, aceitando `id`, `data-*` e atributos extras.
