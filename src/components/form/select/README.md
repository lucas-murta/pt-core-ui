# PtSelect

Componente de select customizado da biblioteca para seleção única, com suporte a modos controlado e não controlado, opções via prop ou slot, ícone opcional, mensagens de feedback e integração com formulários.

## Import

```ts
import { PtOption, PtSelect } from '@pauta/pt-core-ui';
```

## Props principais

- `value`: controla o valor selecionado de forma externa.
- `defaultValue`: define o valor inicial no modo não controlado.
- `onValueChange`: callback executado a cada mudança de seleção, recebendo o valor escolhido.
- `options`: lista de opções no formato `{ name, value }`.
- `label`: renderiza o texto acima do select.
- `icon`: nome do ícone exibido no trigger.
- `placeholder`: texto exibido quando não há valor selecionado. Default: `Selecione uma opção`.
- `name`: cria um `input[type="hidden"]` para integração com formulários.
- `required`: marca o campo como obrigatório e afeta o estado de validação.
- `disabled`: desabilita a interação. Default: `false`.
- `readOnly`: impede alteração do valor mantendo o campo focável.
- `messageInfo`: mensagem exibida quando o campo está válido e não existe `messageSuccess`.
- `messageDanger`: mensagem exibida quando o campo está inválido.
- `messageSuccess`: mensagem exibida quando o campo está válido.
- `className`: injeta classes extras no wrapper do componente.
- `panelClassName`: injeta classes extras no painel de opções.
- `placement`: define o posicionamento preferencial do dropdown.
- `offset`: define o espaçamento entre trigger e painel. Default: `8`.
- `closeOnSelect`: fecha o painel ao selecionar uma opção. Default: `true`.

## Eventos emitidos

- `update:value`: retorna o novo valor selecionado.
- `value-change`: retorna o novo valor selecionado após a mudança.

## Métodos expostos

- `focus()`
- `blur()`
- `clear()`
- `setInvalidity()`
- `setValidity()`
- `reportValidity()`

## Estados visuais

O campo tem fundo `bg-pt-surface-1`, altura `h-pt-5`, canto arredondado (`rounded-pt-1`) e um ícone solto à esquerda, sem contêiner, no tamanho `3` do `PtIcon` (`pt-base`). Com ícone, o texto começa em `pl-pt-5`. No foco, borda e anel usam `pt-focus`. São quatro estados, resolvidos nesta ordem de prioridade:

| Estado     | Quando ocorre                 | Borda                | Ícone           | Cor do ícone               |
| ---------- | ----------------------------- | -------------------- | --------------- | -------------------------- |
| `disabled` | `disabled`                    | `border-pt-border-2` | `ban`           | `text-pt-content-ghost`    |
| `error`    | campo inválido                | `border-pt-negative` | `xmark`         | `text-pt-content-negative` |
| `success`  | válido e com `messageSuccess` | `border-pt-positive` | `check`         | `text-pt-content-positive` |
| `default`  | demais casos                  | `border-pt-border-2` | valor de `icon` | `text-pt-secondary`        |

Nos estados `error`, `success` e `disabled` o ícone de estado substitui o valor de `icon`, e o ícone é exibido mesmo sem a prop `icon`. As mensagens auxiliares recebem um ícone à esquerda: `circle-info`, `circle-exclamation` e `circle-check`.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtSelect } from '@pauta/pt-core-ui';

const options = [
  { name: 'Eletronicos', value: 'eletronicos' },
  { name: 'Moda', value: 'moda' },
  { name: 'Casa', value: 'casa' }
];
</script>

<template>
  <PtSelect
    label="Categoria"
    placeholder="Selecione uma categoria"
    :options="options"
  />
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtSelect } from '@pauta/pt-core-ui';

const value = ref('eletronicos');
</script>

<template>
  <PtSelect
    :value="value"
    label="Campo controlado"
    :options="[
      { name: 'Eletronicos', value: 'eletronicos' },
      { name: 'Moda', value: 'moda' }
    ]"
    @update:value="value = String($event)"
  />
</template>
```

## Exemplo com slot

```vue
<script setup lang="ts">
import { PtOption, PtSelect } from '@pauta/pt-core-ui';
</script>

<template>
  <PtSelect label="Seleção com slot">
    <PtOption value="profile">Perfil</PtOption>
    <PtOption value="wallet">Carteira</PtOption>
    <PtOption value="settings">Configurações</PtOption>
  </PtSelect>
</template>
```

## Regras internas

- O componente usa `PtDropdown` em modo `triggerAsChild` para controlar abertura, fechamento e posicionamento do painel.
- Quando `value` é informado, o componente entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultValue` é usado sem `value`, o estado é gerenciado internamente.
- As opções podem ser fornecidas por `options` ou por slot com `PtOption`.
- Quando `name` é informado, o valor atual também é refletido em um `input[type="hidden"]`.

## Observações

- A prop `icon` e o chevron do trigger usam `PtIcon`, então os ícones precisam estar registrados no contexto de uso da biblioteca.
- `messageSuccess` tem prioridade sobre `messageInfo` quando o campo está válido.
- Quando `closeOnSelect=false`, o painel permanece aberto após a seleção.
