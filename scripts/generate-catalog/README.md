# Generate Catalog

Gera o `catalog.json` na raiz do repositorio: um retrato da API publica da
biblioteca (componentes, props, slots, eventos, exemplos e tokens) consumido
pelo projeto `pt-ai-studio` como contexto para o LLM.

O catalogo e **gerado**, nunca escrito a mao. A fonte da verdade e o proprio
repositorio: exports de `src/index.ts`, `.interface.ts`, `.vue`,
`.stories.ts`, `README.md` de cada componente e os tokens do tema.

## Comandos

```bash
npm run build:catalog   # compila os scripts e gera o catalog.json
npm run catalog:check   # falha (exit 1) se o catalog.json estiver desatualizado
```

Flags suportadas pelo gerador:

- `--check`: nao escreve; compara o conteudo gerado com o arquivo existente e
  sai com codigo `1` quando estiver desatualizado.
- `--with-timestamp`: inclui o campo `generatedAt` (evite no uso normal, para
  manter o diff do git limpo).
- `--out <caminho>`: escreve em outro caminho (relativo a raiz do repo).

## Estrutura

- `index.ts`: entrypoint fino que chama `runGenerateCatalog()`.
- `generate-catalog.ts`: descobre os componentes, monta o objeto do catalogo,
  serializa e decide entre escrever ou verificar.
- `extract-props.ts`: props, eventos, slots e models a partir do `.vue`
  (parse do SFC com `@vue/compiler-sfc` + `TypeChecker`).
- `extract-readme.ts`: summary, descricao, descricoes de props e exemplos.
- `extract-stories.ts`: `title`, `meta.args`, `argTypes.options` e exemplos.
- `extract-tokens.ts`: tokens do tema Tailwind + variaveis CSS semanticas.
- `types.ts`: tipos do catalogo.
- `generate-catalog.test.ts`: testes dos parsers e invariantes do catalogo.

## Determinismo

Mesma entrada produz byte-a-byte o mesmo arquivo: componentes ordenados por
nome, props na ordem de declaracao, JSON com 2 espacos de indentacao e `\n`
final. Nao ha timestamps por padrao.

## Decisoes

- **Saida**: `catalog.json` na raiz (bom para o diff e para o consumo local).
- **Timestamps**: omitidos por padrao; disponiveis via `--with-timestamp`.
- **Componentes nao exportados**: marcados com `internal: true`. No estado
  atual todos os componentes estao exportados, entao nenhum item recebe a
  marca.
- **Exemplos de stories**: incluidos apenas quando ha `template` real; a
  `Playground` (sem template) fica de fora.

## Tamanho

O catalogo atual tem cerca de **417 KB** (~39 componentes e ~360 props).
Fica acima do alvo de referencia (~150 KB) por causa do `description` (corpo
dos READMEs, sem o H1 e sem a secao "Import") e dos `examples`. O conteudo e
o minimo exigido pela especificacao; se o tamanho virar problema para o
contexto do LLM, reduza primeiro `description`/`examples`.
