# Levantamento: referências a StartBet / st-core-ui

Documento de acompanhamento da migração da identidade **StartBet / `st-core-ui`** para **Pauta.io**.

> Status: levantamento concluído. Renomeação de nomenclaturas **aplicada**.
> Escopo deste momento: renomear nomenclaturas. Cor/logo da marca e publicação ficam para etapas seguintes.
> Nota: a marca foi definida como **Pauta.io** (2ª rodada). A primeira rodada usou "Posta.io"; tudo que era `Posta`/`posta` passou para `Pauta`/`pauta`. Os prefixos técnicos `pt-` / `Pt` foram mantidos de propósito.

---

## Decisões

| De | Para |
|---|---|
| prefixo `st-` | `pt-` |
| prefixo `St` | `Pt` |
| string `startbet` | `pauta` |
| string `StartBet` | `PautaIo` |
| string `Posta` (2ª rodada) | `Pauta` |
| string `posta` (2ª rodada) | `pauta` |

- **Publicação:** não será alterada nesta etapa (semantic-release, `publishConfig`, `CHANGELOG.md`). Apenas as nomenclaturas passam para a versão Pauta.
- **Escopo npm:** `@startbet/st-core-ui` → `@pauta/pt-core-ui` (passou por `@posta/pt-core-ui` na 1ª rodada).
- **`package.json` (nesta rodada):** alterados apenas `name` e `description`. `repository.url`, `publishConfig` e configuração do semantic-release permanecem intactos.
- **`package-lock.json`:** sincronizado via `npm install` (gerado; não editado à mão).
- **Documento de acompanhamento:** renomeado para `REBRANDING-STARTBET-PAUTA.md`.
- **Falsos positivos preservados:** palavras com o mesmo radical (`aposta`, `Aposta`, `apostar`, `composta`, `postagem`, `postal`) **não** foram alteradas — a substituição usou fronteira de palavra.

---

## Resumo

| Categoria | Onde | Impacto |
|---|---|---|
| Identidade do pacote (nome, repo, descrição) | `package.json`, `package-lock.json` | Alto |
| Prefixo `st-` em tokens CSS e utilitários Tailwind | 100 arquivos, ~2.439 ocorrências | Alto |
| Prefixo `St` em componentes/APIs públicas | 43 componentes + exports | Alto |
| Branding do Storybook | `.storybook/*` | Médio |
| URLs `startbet.io` | breadcrumb | Baixo |
| Documentação / Stories | ~52 `README.md` + 4 stories | Médio |
| Arquivo gerado | `CHANGELOG.md` | Baixo |

Totais: **55 arquivos** citam `StartBet` / `startbet` / `st-core-ui`; **100 arquivos** usam os prefixos `st-`.

---

## 1. Identidade do pacote

- `package.json`
  - `"name": "@startbet/st-core-ui"`
  - `"description": "Biblioteca de componentes Start Bet Vue 3 com Vite, Tailwind CSS e Storybook"`
  - `"repository.url": "https://github.com/StartBet/st-core-ui.git"`
- `package-lock.json` — mesmo nome (2x)
- `README.md` — título `# @startbet/st-core-ui` + ~29 imports `from '@startbet/st-core-ui'`
- `CHANGELOG.md` — ~94 links `github.com/StartBet/st-core-ui` (gerado pelo semantic-release)

## 2. Prefixo `st-` — tokens e utilitários (núcleo da renomeação)

- `src/css/tokens.css` — **471 linhas** de variáveis `--st-*` (`--st-brand-primary-*`, `--st-color-*`, `--st-neutral-*`...)
- `src/tokens/tailwind-theme.ts` — utilitários `st-*` (tamanhos `st-xxs`…`st-7xl`, espaçamentos `st-1`…`st-240`, cores `st-brand` / `st-primary` / …) + export `stCssTokenImport = '@startbet/st-core-ui/tokens.css'`
- Uso do prefixo nas classes dos componentes: `text-st-*`, `bg-st-*`, `gap-st-*`, `rounded-st-*`, `font-st-*`, `px-st-*` (ex.: `src/components/buttons/button/styleStButton.ts`)
- Totais: **~2.439 ocorrências** de `-st-` em 100 arquivos; **706** ocorrências de `--st-`

## 3. Prefixo `St` — componentes e API pública

- **43 componentes `.vue`** nomeados `St*` (StButton, StInput, StModal, StCarousel…), cada um com arquivos `St*.interface.ts`, `St*.test.ts`, `St*.stories.ts` e `styleSt*.ts`
- `src/index.ts` — exporta todos os `St*` e símbolos `st*`: `stToastConfig`, `ST_TOAST_DEFAULT_DURATION`, `ST_TOAST_DEFAULT_MAX`, `stIconRendererKey`, `stTailwindTheme`, `stTailwindPlugins`, `stCssTokenImport`
- `src/components/theme-provider/styleStThemeProvider.ts` — `Symbol('st-theme-context')`, constantes `ST_THEME_*`
- `src/tokens/index.ts`
- Também em `styleSt*` dos produtos: game-card, promotion-card, super-odds-card

> Ponto mais sensível: renomear `St` quebra a API pública consumida por outros projetos.

## 4. Branding do Storybook

- `.storybook/storybook-theme.ts` — `brandTitle: 'Start Core UI'`
- `.storybook/manager.ts` — importa a logo `./start-core-ui.png`
- `.storybook/start-core-ui.png` — único asset de imagem do repositório
- `.storybook/manager.css` — variáveis `--sb-st-*`
- `.storybook/preview.ts` — usa `--st-color-surface-3`

## 5. Domínio `startbet.io`

- `src/components/breadcrumb/StBreadcrumb.interface.ts` — comentário de doc (`https://startbet.io`)
- `src/components/breadcrumb/StBreadcrumb.test.ts` — 7 URLs `startbet.io` / `blog.startbet.io` em fixtures

## 6. Stories e documentação

- `src/stories/Overview.stories.ts` — renderiza `@startbet/` + `st-core-ui`
- `src/stories/GetStarted.stories.ts` — comando `npm install @startbet/st-core-ui` e imports
- `src/stories/Typography.stories.ts` — imports `base-neue.css` / `montserrat.css`
- ~52 `README.md` (em `src/components/**`, `src/products/**`, `src/tokens`, `src/css`) com `from '@startbet/st-core-ui'`
- `src/css/README.md`

---

## Observações para o próximo passo

1. **Dois níveis de mudança:**
   - (a) *identidade textual* (nome do pacote, docs, branding) — simples;
   - (b) *prefixos técnicos* `st-` / `St` — profundo, espalhado em ~100 arquivos e é a API pública da lib.
2. **Arquivos gerados:** `CHANGELOG.md` (e possivelmente `package-lock.json`) devem ser regenerados, não editados à mão.
3. **Nome local já diverge:** a pasta é `pt-core-ui`, mas o pacote npm ainda é `@startbet/st-core-ui`. Vale alinhar o escopo npm (definir antes de substituir).

---

## Checklist de execução

- [x] Definir novo escopo/nome do pacote npm (`@pauta/pt-core-ui`)
- [x] Definir prefixo técnico novo (`st-` → `pt-` / `St` → `Pt`)
- [x] Substituir identidade do pacote (`package.json` — nome e descrição)
- [x] Substituir prefixos de tokens/utilitários (`tokens.css`, `tailwind-theme.ts` + classes nos componentes)
- [x] Substituir prefixos de componentes/APIs (`St*`, `st*`, `styleSt*`, `ST_*`)
- [x] Substituir branding do Storybook (`storybook-theme.ts`, `manager.ts`, logo `start-core-ui.png` → `pt-core-ui.png` → `pt-core-ui.svg`, `manager.css`)
- [x] Substituir domínios `startbet.io` (breadcrumb)
- [x] Atualizar Stories e READMEs
- [x] Renomear arquivos (`St*.vue` / `St*.interface.ts` / `St*.test.ts` / `St*.stories.ts` / `styleSt*.ts`)
- [x] Recriar arquivos de configuração ausentes (`vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.scripts.json`, `tailwind.config.ts`)
- [x] Rodar testes e build (`npm run test:run` → 56 arquivos / 746 testes OK; `npm run build` → OK)
- [x] 2ª rodada: `Posta`/`posta` → `Pauta`/`pauta` (59 arquivos) + renomear este doc para `REBRANDING-STARTBET-PAUTA.md`
- [x] Sincronizar `package-lock.json` (`npm install`) e revalidar build/testes
- [x] Limpeza de marca: remover `PtIllustration` (pasta `src/components/illustrations` + exports em `src/index.ts`)
- [x] Limpeza de marca: remover componentes de produto `PtGameCard`, `PtPromotionCard`, `PtSuperOddsCard` (pasta `src/products` + exports em `src/index.ts` + grupo `Products` do `storybook/preview.ts`)
- [ ] Regenerar `CHANGELOG.md` (etapa de publicação)
- [ ] Ajustar `repository.url` / publicações (etapa seguinte)

Resultado da aplicação (1ª rodada): **322 arquivos alterados** e **202 arquivos renomeados**.
Resultado da aplicação (2ª rodada): **59 arquivos atualizados** (`Posta`/`posta` → `Pauta`/`pauta`) e **1 arquivo renomeado** (este documento).
Configs recriadas: `tsconfig.json` (paths `@/*` e `@pauta/pt-core-ui`, sem `baseUrl`), `tsconfig.lib.json` (`vue-tsc` → `dist/types`), `tsconfig.scripts.json` (`tsc` → `.cache/hooks-dist`, `module`/`moduleResolution` = `Node16`), `vite.config.ts` e `vitest.config.ts` (plugin `vue`, alias `@` → `src`), `tailwind.config.ts` (`content` = `src` + `.storybook`, `theme.extend` = `ptTailwindTheme`, `plugins` = `ptTailwindPlugins`).
Pendências conhecidas: `CHANGELOG.md` mantém o nome antigo (gerado); `repository.url` mantém `github.com/StartBet/st-core-ui`.

Backup do estado anterior (pré-renomeação): `%TEMP%\pt-core-ui-rebrand-backup` (movido para fora do projeto para não ser varrido pelo vitest).
