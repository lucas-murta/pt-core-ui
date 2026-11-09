# PtRadio

Componente de radio da biblioteca para seleção exclusiva, com suporte a uso isolado ou integrado ao `PtRadioGroup`, modo controlado e não controlado, além de label por prop ou slot.

## Import

```ts
import { PtRadio } from '@pauta/pt-core-ui';
```

## Props principais

- `checked`: controla o estado marcado de forma externa.
- `defaultChecked`: define o estado inicial no modo não controlado.
- `disabled`: desabilita o input. Default: `false`.
- `label`: define o texto do label quando o slot padrão não é usado.
- `className`: injeta classes extras no wrapper.

## Eventos emitidos

- `update:checked`: retorna o novo valor booleano do radio.
- `change`: retorna o evento nativo disparado pelo input.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtRadio } from '@pauta/pt-core-ui';
</script>

<template>
  <div class="flex flex-col gap-pt-2">
    <PtRadio label="Opção A" name="example" value="a" />
    <PtRadio label="Opção B" name="example" value="b" />
  </div>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtRadio } from '@pauta/pt-core-ui';

const checked = ref(false);
</script>

<template>
  <PtRadio
    :checked="checked"
    label="Modo controlado"
    @update:checked="checked = $event"
  />
</template>
```

## Exemplo com grupo

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

## Regras internas

- O componente usa um `input[type="radio"]` real para manter acessibilidade e comportamento nativo.
- Quando `checked` é informado, o componente entra em modo controlado.
- Quando é usado dentro de `PtRadioGroup`, o estado marcado passa a depender do `value` compartilhado pelo grupo.
- `class` e `style` passados via attrs são aplicados no wrapper, enquanto os demais attrs são encaminhados ao `input`.

## Observações

- Fora de um grupo, use `name` para manter o comportamento nativo de exclusividade entre radios relacionados.
- Se `label` e slot padrão forem usados ao mesmo tempo, o conteúdo do slot tem prioridade visual.
