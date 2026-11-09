# PtOption

Componente de opção clicável da biblioteca para compor listas de ações e seleções customizadas, com suporte a estado selecionado, adornos opcionais e callback de clique.

## Import

```ts
import { PtOption } from '@pauta/pt-core-ui';
```

## Props principais

- `value`: define o valor lógico da opção.
- `selected`: aplica o estado visual de seleção. Default: `false`.
- `className`: injeta classes extras no botão da opção.
- `onClick`: callback disparado ao clicar na opção.

## Slots

- `default`: conteúdo principal da opção.
- `startAdornment`: conteúdo exibido antes do texto principal.
- `endAdornment`: conteúdo exibido depois do texto principal.

## Exemplo básico

```vue
<script setup lang="ts">
import { PtOption } from '@pauta/pt-core-ui';
</script>

<template>
  <div class="flex max-w-pt-48 flex-col gap-pt-1">
    <PtOption value="profile">Perfil</PtOption>
    <PtOption value="settings">Configurações</PtOption>
    <PtOption value="logout">Sair</PtOption>
  </div>
</template>
```

## Exemplo com seleção

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { PtOption } from '@pauta/pt-core-ui';

const selected = ref('settings');
</script>

<template>
  <div class="flex max-w-pt-48 flex-col gap-pt-1">
    <PtOption
      value="profile"
      :selected="selected === 'profile'"
      :on-click="() => (selected = 'profile')"
    >
      Perfil
    </PtOption>
    <PtOption
      value="settings"
      :selected="selected === 'settings'"
      :on-click="() => (selected = 'settings')"
    >
      Configurações
    </PtOption>
  </div>
</template>
```

## Exemplo com adornos

```vue
<script setup lang="ts">
import { PtOption } from '@pauta/pt-core-ui';
</script>

<template>
  <PtOption value="wallet">
    <template #startAdornment>
      <span>R$</span>
    </template>

    Carteira

    <template #endAdornment>
      <span>+</span>
    </template>
  </PtOption>
</template>
```

## Regras internas

- O componente renderiza um `button` com `type="button"` para evitar submit acidental em formulários.
- Quando `selected=true`, a opção recebe `aria-pressed="true"` e um estilo visual fixo de seleção.
- `inheritAttrs: false` é usado para filtrar attrs específicos de teclado antes de repassá-los ao botão.
- O `value` é refletido em `data-value`, facilitando integrações e seleção por atributo.

## Observações

- A prop `onClick` é compatível com o padrão legado do componente.
- Listeners passados via attrs, como `@click`, continuam funcionando no botão raiz.
