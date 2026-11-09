# PtAlert

Alerta de interface, fixo no fluxo da pagina, nos status semanticos da lib. Tem icone padrao por status, titulo, descricao e botao de fechar opcional. A largura segue a mesma escala do `PtPaper`.

Para feedback passageiro, disparado por uma acao, use o [`PtToast`](../toasts/toast/README.md).

## Import

```ts
import { PtAlert } from '@pauta/pt-core-ui';
```

## Props

| Prop             | Tipo            | Default         | Descricao                                                         |
| ---------------- | --------------- | --------------- | ----------------------------------------------------------------- |
| `title`          | `string`        | `''`            | Titulo do alerta.                                                 |
| `description`    | `string`        | `''`            | Texto de apoio; o alerta cresce conforme o conteudo.              |
| `status`         | `PtAlertStatus` | `info`          | Status do alerta.                                                 |
| `icon`           | `string`        | `undefined`     | Sobrescreve o icone padrao do status.                             |
| `hideIcon`       | `boolean`       | `false`         | Remove o icone do status.                                         |
| `closable`       | `boolean`       | `false`         | Renderiza o botao de fechar.                                      |
| `closeAriaLabel` | `string`        | `Fechar alerta` | Rotulo do botao de fechar.                                        |
| `open`           | `boolean`       | `undefined`     | Visibilidade (`v-model:open`). Sem a prop, o alerta se controla.  |
| `width`          | `SizeValue`     | `full`          | Largura, na escala do `PtPaper` (`full`, `fit-content`, `96`...). |
| `className`      | `string`        | `''`            | Classes extras no container.                                      |

## Slots

| Slot      | Descricao                                      |
| --------- | ---------------------------------------------- |
| `default` | Conteudo extra abaixo da descricao.            |
| `action`  | Linha de acoes no fim do alerta (botao, link). |

## Eventos

| Evento        | Payload   | Quando                     |
| ------------- | --------- | -------------------------- |
| `close`       | —         | Clique no botao de fechar. |
| `update:open` | `boolean` | Clique no botao de fechar. |

### Status disponiveis

| Status     | Uso                               | Icone padrao           |
| ---------- | --------------------------------- | ---------------------- |
| `info`     | Informacao neutra.                | `circle-info`          |
| `system`   | Aviso da plataforma, manutencao.  | `gear`                 |
| `warning`  | Atencao, algo perto de um limite. | `triangle-exclamation` |
| `positive` | Confirmacao, algo liberado.       | `circle-check`         |
| `negative` | Erro ou bloqueio.                 | `circle-xmark`         |

## Exemplo basico

```vue
<script setup lang="ts">
import { PtAlert } from '@pauta/pt-core-ui';
</script>

<template>
  <PtAlert
    status="warning"
    title="Verificacao de identidade pendente"
    description="Envie um documento com foto para concluir a verificacao da conta."
  />
</template>
```

## Com fechar

Sem `open`, o alerta some sozinho ao ser fechado. Com `v-model:open`, quem decide e o componente pai.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { PtAlert } from '@pauta/pt-core-ui';

const aberto = ref(true);
</script>

<template>
  <PtAlert
    v-model:open="aberto"
    closable
    status="info"
    title="Novo recurso disponivel"
  />
</template>
```

## Dimensoes

- `width` usa as mesmas classes de largura do `PtPaper` (`sizeWidthClasses`). O default `full` ocupa o container; `max-w-full` impede que larguras fixas estourem em telas estreitas.
- Altura livre: cresce com a descricao e com os slots. Textos longos quebram em varias linhas (`break-words`).

## Tokens usados

- Fundo: `bg-pt-surface-<status>`; borda de 1px em volta toda, em `border-pt-content-<status>`.
- Titulo, icone e fechar: `text-pt-content-<status>`; descricao em `text-pt-content-default`.
- Sem sombra, porque o alerta fica no fluxo da pagina. Raio `rounded-pt-1`, respiro `p-pt-2`.
- Tipografia: `font-pt-body`, titulo em `text-pt-body-medium` negrito e descricao em `text-pt-body-small`.

## Acessibilidade

- `negative` e `warning` usam `role="alert"`; `info`, `system` e `positive` usam `role="status"`.
- O icone do status e `aria-hidden`; a informacao vem do titulo e da descricao.
- O botao de fechar tem `aria-label` configuravel por `closeAriaLabel`.
- `data-pt-alert-status`, `data-pt-alert-icon`, `data-pt-alert-title`, `data-pt-alert-description` e `data-pt-alert-close` estao disponiveis para testes e QA.

## Observacoes

- Os icones dos cinco status e o `xmark` ja vem registrados no componente. Um icone proprio em `icon` precisa do renderizador de icones da aplicacao (ver [`PtIcon`](../icon/README.md)).
