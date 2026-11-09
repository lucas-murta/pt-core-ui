# PtInput

Componente de input da biblioteca para entrada textual e numérica, com suporte a modos controlado e não controlado, ícone opcional, máscaras, contador de caracteres e mensagens de feedback.

## Import

```ts
import { PtInput } from '@pauta/pt-core-ui';
```

## Props principais

- `value`: controla o valor de forma externa.
- `defaultValue`: define o valor inicial no modo não controlado.
- `label`: renderiza o texto acima do campo.
- `icon`: nome do ícone exibido dentro do campo.
- `type`: define o tipo do input. Default: `text`.
- `mask`: aplica uma máscara de entrada. Valores disponíveis: `phone-br`, `cpf`.
- `messageInfo`: mensagem exibida quando o campo está válido e não existe `messageSuccess`.
- `messageDanger`: mensagem exibida quando o campo está inválido.
- `messageSuccess`: mensagem exibida quando o campo está válido.
- `maxLength`: habilita o contador de caracteres restantes.
- `disabled`: desabilita o input. Default: `false`.
- `readOnly`: impede edição mantendo o campo focável.
- `placeholder`, `name`, `min`, `max`, `autoComplete`, `required`, `pattern`, `inputMode`: attrs nativos encaminhados ao `input`.
- `className`: injeta classes extras no próprio campo.

## Eventos emitidos

- `update:value`: retorna o valor atual do campo.
- `input`: retorna o evento nativo de input.
- `change`: retorna o evento nativo de change.
- `focus`: retorna o evento de foco.
- `blur`: retorna o evento de blur.
- `keydown`: retorna o evento de teclado ao pressionar.
- `keyup`: retorna o evento de teclado ao soltar.
- `click`: retorna o evento de click do input.

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
import { PtInput } from '@pauta/pt-core-ui';
</script>

<template>
  <div class="flex flex-col gap-pt-3">
    <PtInput label="Nome" placeholder="Digite seu nome" />
    <PtInput
      type="email"
      label="E-mail"
      placeholder="voce@exemplo.com"
      auto-complete="email"
    />
  </div>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtInput } from '@pauta/pt-core-ui';

const value = ref('');
</script>

<template>
  <PtInput
    :value="value"
    label="Campo controlado"
    placeholder="Digite algo"
    @update:value="value = String($event)"
  />
</template>
```

## Exemplo com máscara e contador

```vue
<script setup lang="ts">
import { PtInput } from '@pauta/pt-core-ui';
</script>

<template>
  <div class="flex flex-col gap-pt-3">
    <PtInput
      type="tel"
      mask="phone-br"
      label="Telefone"
      placeholder="(00) 00000-0000"
    />
    <PtInput
      max-length="11"
      label="CPF"
      mask="cpf"
      placeholder="000.000.000-00"
    />
  </div>
</template>
```

## Regras internas

- O componente usa `inheritAttrs: false` para aplicar `class` e `style` no wrapper e encaminhar os demais attrs para o `input`.
- Quando `value` é informado, o componente entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultValue` é usado sem `value`, o estado é gerenciado internamente.
- O contador mostra a quantidade de caracteres restantes com mudança visual quando restam poucos caracteres.
- Quando `type="datetime"`, o tipo real do input é resolvido para `datetime-local`.

## Observações

- A prop `icon` usa `PtIcon`, então o ícone precisa estar registrado no contexto de uso da biblioteca.
- `messageSuccess` tem prioridade sobre `messageInfo` quando o campo está válido.
- As máscaras são aplicadas apenas para valores de texto e mantêm o valor emitido já formatado.
