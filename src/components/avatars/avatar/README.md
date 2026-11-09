# PtAvatar

Area redonda que representa um usuario. Com `src` mostra a imagem; sem imagem monta as iniciais do `name` sobre uma cor fixa da paleta; sem imagem e sem nome cai em um icone neutro.

## Import

```ts
import { PtAvatar } from '@pauta/pt-core-ui';
```

## Props

| Prop              | Tipo                       | Default     | Descricao                                                           |
| ----------------- | -------------------------- | ----------- | ------------------------------------------------------------------- |
| `name`            | `string`                   | `''`        | Nome do usuario: gera as iniciais e a cor quando nao existe imagem. |
| `src`             | `string`                   | `''`        | URL da imagem do usuario.                                           |
| `alt`             | `string`                   | `''`        | Texto alternativo da imagem; por padrao usa `name`.                 |
| `size`            | `small \| medium \| large` | `medium`    | Escala do avatar.                                                   |
| `fit`             | `cover \| contain`         | `cover`     | `contain` deixa respiro para imagens vazadas.                       |
| `color`           | `PtAvatarColor`            | `undefined` | Forca uma cor da paleta, ignorando a cor derivada do nome.          |
| `placeholderIcon` | `string`                   | `user`      | Icone exibido quando nao ha imagem nem nome.                        |
| `className`       | `string`                   | `''`        | Classes extras no container.                                        |

### Tamanhos disponiveis

| Tamanho  | Diametro      | Fonte das iniciais | Icone do placeholder |
| -------- | ------------- | ------------------ | -------------------- |
| `small`  | 32px (`pt-4`) | `text-pt-xs`       | `pt-base` (16px)     |
| `medium` | 40px (`pt-5`) | `text-pt-base`     | `pt-lg` (20px)       |
| `large`  | 56px (`pt-7`) | `text-pt-lg`       | `pt-2xl` (30px)      |

## Exemplo basico

```vue
<script setup lang="ts">
import { PtAvatar } from '@pauta/pt-core-ui';
</script>

<template>
  <PtAvatar name="Arthur Morgan" src="https://cdn.exemplo.com/arthur.png" />
</template>
```

## Iniciais a partir do nome

Primeira letra do primeiro nome + primeira letra do ultimo nome:

| Nome                       | Palavras | Iniciais |
| -------------------------- | -------- | -------- |
| `Uncle`                    | 1        | `U`      |
| `Arthur Morgan`            | 2        | `AM`     |
| `Reverend Orville Swanson` | 3        | `RS`     |
| `Dutch van der Linde`      | 4        | `DL`     |

Palavras do meio sao ignoradas, inclusive particulas como `van der`. Espacos extras, acentos e caixa sao normalizados: `  javier   escuella  ` vira `JE`.

## Cor fixa por inicial

A cor sai da inicial do primeiro nome, por uma tabela fixa. Nao ha sorteio em tempo de execucao: o mesmo nome gera sempre o mesmo avatar, em qualquer sessao, dispositivo ou deploy.

| Inicial | Cor      | Inicial | Cor      | Inicial | Cor      | Inicial | Cor      |
| ------- | -------- | ------- | -------- | ------- | -------- | ------- | -------- |
| `A`     | `blue`   | `H`     | `purple` | `O`     | `pink`   | `V`     | `red`    |
| `B`     | `ocean`  | `I`     | `blue`   | `P`     | `purple` | `W`     | `blue`   |
| `C`     | `green`  | `J`     | `ocean`  | `Q`     | `blue`   | `X`     | `pink`   |
| `D`     | `yellow` | `K`     | `green`  | `R`     | `ocean`  | `Y`     | `purple` |
| `E`     | `orange` | `L`     | `yellow` | `S`     | `green`  | `Z`     | `ocean`  |
| `F`     | `red`    | `M`     | `orange` | `T`     | `yellow` |         |          |
| `G`     | `pink`   | `N`     | `red`    | `U`     | `orange` |         |          |

Iniciais fora de `A-Z` (numeros, simbolos) caem em `blue`. A tabela esta exportada como `ptAvatarLetterColors` e a resolucao como `resolveAvatarColor`.

Para fugir da tabela em um caso especifico, informe `color`:

```vue
<template>
  <PtAvatar name="Arthur Morgan" color="purple" />
</template>
```

## Imagens vazadas

`fit="contain"` encaixa a imagem inteira com respiro e coloca uma superficie neutra com borda atras — o formato usado por emblemas de times e logotipos com fundo transparente. `fit="cover"` (padrao) preenche o circulo e recorta o excedente, que e o esperado para fotos.

```vue
<template>
  <PtAvatar :src="emblemaDaGangue" fit="contain" name="Van der Linde" />
</template>
```

## Fallbacks

1. `src` valido: renderiza a imagem.
2. `src` que falha ao carregar: cai para as iniciais, sem precisar de tratamento no consumidor. Trocar o `src` faz o componente tentar de novo.
3. Sem `src`: iniciais do `name`.
4. Sem `src` e sem `name`: icone `placeholderIcon` sobre superficie neutra.

## Regras internas

- `resolveAvatarInitials` monta as iniciais; `resolveAvatarColor` resolve a cor; `resolveAvatarContent` decide entre `image`, `initials` e `placeholder`.
- O atributo `data-pt-avatar-content` expoe qual dos tres estados esta na tela.
- O erro de carregamento e reiniciado sempre que `src` muda.

## Tokens usados

- Iniciais: fundo `bg-pt-<cor>-700` com texto `text-pt-<cor>-100`, nas escalas diretas `blue`, `ocean`, `green`, `yellow`, `orange`, `red`, `pink` e `purple`. Sao cores fixas da plataforma, sem variacao por tema.
- Imagem em `cover`: fundo `bg-pt-surface-2` enquanto carrega.
- Imagem em `contain`: `bg-pt-surface-1` com borda `pt-border-2` e respiro proporcional ao tamanho.
- Placeholder: `bg-pt-surface-2`, borda `pt-border-2` e icone em `pt-content-ghost`.
- Tipografia: `font-pt-body` com `font-bold` nas iniciais.

## Acessibilidade

- Com imagem, o `img` carrega o `alt` (`alt` ou `name`); sem nenhum dos dois o `alt` fica vazio e a imagem e tratada como decorativa.
- Sem imagem, o container recebe `role="img"` e `aria-label` com o nome; as iniciais e o icone ficam `aria-hidden`.
- Atributos extras passados ao componente sao encaminhados para o container.

## Observacoes

- O icone `user` do placeholder ja vem registrado no componente. Outros icones em `placeholderIcon` precisam ser registrados na `library` do Font Awesome pelo projeto consumidor.
- Para empilhar varios usuarios, use o [`PtAvatarGroup`](../avatar-group/README.md).
