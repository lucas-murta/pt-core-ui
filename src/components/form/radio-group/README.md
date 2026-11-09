# PtRadioGroup

Componente de agrupamento de radios da biblioteca para seleção única, com suporte a modos controlado e não controlado, propagação de `name` e `disabled`, além de orientação vertical ou horizontal.

## Import

```ts
import { PtRadio, PtRadioGroup } from '@pauta/pt-core-ui';
```

## Props principais

- `name`: define o atributo `name` compartilhado entre os radios do grupo.
- `value`: controla o valor selecionado de forma externa.
- `defaultValue`: define o valor inicial no modo não controlado.
- `onValueChange`: callback disparado quando a seleção muda.
- `disabled`: desabilita todos os radios filhos. Default: `false`.
- `dense`: reduz o espaçamento interno entre os itens.
- `orientation`: define a orientação do grupo. Valores: `vertical`, `horizontal`. Default: `vertical`.
- `className`: injeta classes extras no container do grupo.

## Eventos emitidos

- `update:value`: retorna o novo valor selecionado.
- `value-change`: retorna o novo valor selecionado após a mudança.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtRadio, PtRadioGroup } from '@pauta/pt-core-ui';
</script>

<template>
  <PtRadioGroup default-value="b">
    <PtRadio value="a" label="Opção A" />
    <PtRadio value="b" label="Opção B" />
    <PtRadio value="c" label="Opção C" />
  </PtRadioGroup>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtRadio, PtRadioGroup } from '@pauta/pt-core-ui';

const value = ref('a');
</script>

<template>
  <PtRadioGroup :value="value" @update:value="value = $event">
    <PtRadio value="a" label="Opção A" />
    <PtRadio value="b" label="Opção B" />
  </PtRadioGroup>
</template>
```

## Exemplo horizontal

```vue
<script setup lang="ts">
import { PtRadio, PtRadioGroup } from '@pauta/pt-core-ui';
</script>

<template>
  <PtRadioGroup orientation="horizontal">
    <PtRadio value="eletronicos" label="Eletronicos" />
    <PtRadio value="moda" label="Moda" />
    <PtRadio value="casa" label="Casa" />
  </PtRadioGroup>
</template>
```

## Regras internas

- O componente renderiza um container com `role="radiogroup"`.
- O grupo compartilha `name`, `value` e `disabled` com os radios filhos via `provide/inject`.
- Quando `value` é informado, o grupo entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultValue` é usado sem `value`, o estado é gerenciado internamente.

## Observações

- O grupo escuta `change` no container para atualizar a seleção a partir dos radios filhos.
- `aria-disabled` é aplicado apenas quando `disabled=true`.
