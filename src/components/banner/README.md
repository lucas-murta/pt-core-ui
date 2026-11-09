# PtBanner

Faixa de status em formato pill, com uma unica frase. Cresce na horizontal conforme o texto, ate a largura do container. Aceita icone opcional, botao de acao e botao de fechar.

Para um aviso com titulo e descricao, use o [`PtAlert`](../alert/README.md).

## Import

```ts
import { PtBanner } from '@pauta/pt-core-ui';
```

## Props

| Prop             | Tipo             | Default         | Descricao                                                        |
| ---------------- | ---------------- | --------------- | ---------------------------------------------------------------- |
| `text`           | `string`         | `''`            | Frase do banner; o slot padrao tem prioridade.                   |
| `status`         | `PtBannerStatus` | `info`          | Status do banner.                                                |
| `icon`           | `string`         | `undefined`     | Icone a esquerda da frase. Sem a prop, nao ha icone.             |
| `actionLabel`    | `string`         | `undefined`     | Rotulo do botao de acao; o slot `action` tem prioridade.         |
| `closable`       | `boolean`        | `false`         | Renderiza o botao de fechar.                                     |
| `closeAriaLabel` | `string`         | `Fechar banner` | Rotulo do botao de fechar.                                       |
| `open`           | `boolean`        | `undefined`     | Visibilidade (`v-model:open`). Sem a prop, o banner se controla. |
| `className`      | `string`         | `''`            | Classes extras no container.                                     |

## Slots

| Slot      | Descricao                                         |
| --------- | ------------------------------------------------- |
| `default` | Conteudo da frase, no lugar de `text`.            |
| `action`  | Acao propria, no lugar do botao de `actionLabel`. |

## Eventos

| Evento        | Payload      | Quando                            |
| ------------- | ------------ | --------------------------------- |
| `action`      | `MouseEvent` | Clique no botao de `actionLabel`. |
| `close`       | —            | Clique no botao de fechar.        |
| `update:open` | `boolean`    | Clique no botao de fechar.        |

### Status disponiveis

| Status      | Uso                                 | Cor do botao de acao |
| ----------- | ----------------------------------- | -------------------- |
| `info`      | Informacao neutra.                  | `primary`            |
| `system`    | Aviso da plataforma, manutencao.    | `primary`            |
| `warning`   | Atencao, algo perto de um limite.   | `primary`            |
| `positive`  | Confirmacao, algo liberado.         | `positive`           |
| `negative`  | Erro ou bloqueio.                   | `negative`           |
| `primary`   | Destaque de marca, promocao.        | `primary`            |
| `secondary` | Destaque secundario, oferta rapida. | `secondary`          |

## Exemplo basico

```vue
<script setup lang="ts">
import { PtBanner } from '@pauta/pt-core-ui';
</script>

<template>
  <PtBanner
    status="primary"
    icon="gift"
    text="Frete gratis em compras acima de R$ 200"
    action-label="Ver ofertas"
    closable
    @action="abrirOfertas"
  />
</template>
```

## Acao propria

```vue
<PtBanner status="primary" text="Cupom liberado">
  <template #action>
    <PtButton size="small" variant="outline" class-name="!rounded-full">
      Regras
    </PtButton>
  </template>
</PtBanner>
```

## Dimensoes

- `w-fit` com `max-w-full`: a pill acompanha a frase e para na largura do container.
- A frase fica em uma linha; o que passar da largura vira reticencias, com o texto completo no `title`.
- Altura minima de 40px (`min-h-pt-5`), que acomoda o `PtButton` `small` com 6px de respiro. O lado que termina em icone, botao ou fechar encolhe o padding para a borda da pill abracar o elemento.

## Tokens usados

- Fundo: `bg-pt-content-<status>`, sem borda — as cores sao invertidas em relacao ao `PtAlert`.
- Frase e fechar: `text-pt-surface-<status>`, frase em `text-pt-body-small` semibold.
- Icone: circulo de 28px (`rounded-full`) com as cores invertidas de novo, `bg-pt-surface-<status>` e `text-pt-content-<status>`.
- Acao: `PtButton` `small` `solid` na cor do status, com `!rounded-full` para seguir a pill.

## Acessibilidade

- `negative` e `warning` usam `role="alert"`; os demais status usam `role="status"`.
- O icone e `aria-hidden`; a informacao esta na frase.
- O botao de fechar tem `aria-label` configuravel por `closeAriaLabel`.
- `data-pt-banner-status`, `data-pt-banner-icon`, `data-pt-banner-text`, `data-pt-banner-action` e `data-pt-banner-close` estao disponiveis para testes e QA.

## Observacoes

- Nao ha icone padrao: o banner mostra so o icone passado em `icon`. Um icone fora dos ja usados pela lib precisa do renderizador de icones da aplicacao (ver [`PtIcon`](../icon/README.md)).
