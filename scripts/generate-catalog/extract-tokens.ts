import { readFileSync } from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

import type { CatalogTokens } from './types';

export type TokenDependencies = {
  readFile?: (filePath: string) => string;
};

const themePathOf = (repoRoot: string): string =>
  path.join(repoRoot, 'src', 'tokens', 'tailwind-theme.ts');

const cssPathOf = (repoRoot: string): string =>
  path.join(repoRoot, 'src', 'css', 'tokens.css');

const loadTailwindTheme = (
  themePath: string,
  readFile: (filePath: string) => string
): Record<string, unknown> => {
  const source = readFile(themePath);
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext
    }
  }).outputText;

  const module = { exports: {} as Record<string, unknown> };
  const evaluate = new Function('exports', 'require', 'module', transpiled);
  evaluate(module.exports, () => ({}), module);

  const theme = module.exports.ptTailwindTheme;

  if (!theme || typeof theme !== 'object') {
    throw new Error(
      `Nao foi possivel carregar ptTailwindTheme de ${themePath}.`
    );
  }

  return theme as Record<string, unknown>;
};

const matchingBrace = (css: string, start: number): number => {
  let depth = 0;

  for (let index = start; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    else if (css[index] === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return css.length;
};

export const extractSemanticCssVariables = (css: string): string[] => {
  const normalized = css.replace(/\r\n/g, '\n');
  const selectors = /\[data-theme='(?:light|dark)'\]/g;
  const variables: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = selectors.exec(normalized)) !== null) {
    const braceIndex = normalized.indexOf('{', match.index);

    if (braceIndex === -1) break;

    const body = normalized.slice(
      braceIndex + 1,
      matchingBrace(normalized, braceIndex)
    );
    const pattern = /(--pt-[\w-]+)\s*:/g;
    let declaration: RegExpExecArray | null;

    while ((declaration = pattern.exec(body)) !== null) {
      if (!variables.includes(declaration[1])) {
        variables.push(declaration[1]);
      }
    }

    selectors.lastIndex = braceIndex;
  }

  return variables;
};

export const extractTokens = ({
  repoRoot,
  readFile = (filePath: string) => readFileSync(filePath, 'utf8')
}: TokenDependencies & { repoRoot: string }): CatalogTokens => {
  const theme = loadTailwindTheme(themePathOf(repoRoot), readFile);
  const css = readFile(cssPathOf(repoRoot));

  const group = (key: string): Record<string, unknown> => {
    const value = theme[key];
    return value && typeof value === 'object'
      ? (value as Record<string, unknown>)
      : {};
  };

  return {
    fontFamily: group('fontFamily'),
    fontSize: group('fontSize'),
    spacing: group('spacing'),
    borderRadius: group('borderRadius'),
    boxShadow: group('boxShadow'),
    colors: group('colors'),
    semanticCssVariables: extractSemanticCssVariables(css)
  };
};
