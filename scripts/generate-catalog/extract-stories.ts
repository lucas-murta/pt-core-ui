import type { CatalogExample } from './types';

export type StoriesContent = {
  title?: string;
  args: Record<string, unknown>;
  argTypesOptions: Record<string, Array<string | number>>;
  examples: CatalogExample[];
};

const readBalanced = (
  text: string,
  start: number,
  open = '{',
  close = '}'
): string | undefined => {
  if (text[start] !== open) return undefined;

  let depth = 0;
  let index = start;
  let mode:
    | 'code'
    | 'single'
    | 'double'
    | 'template'
    | 'line-comment'
    | 'block-comment' = 'code';

  for (; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];

    if (mode === 'line-comment') {
      if (character === '\n') mode = 'code';
      continue;
    }

    if (mode === 'block-comment') {
      if (character === '*' && next === '/') {
        mode = 'code';
        index += 1;
      }
      continue;
    }

    if (mode === 'single' || mode === 'double' || mode === 'template') {
      if (character === '\\') {
        index += 1;
        continue;
      }

      const closing = mode === 'single' ? "'" : mode === 'double' ? '"' : '`';
      if (character === closing) mode = 'code';
      continue;
    }

    if (character === '/' && next === '/') {
      mode = 'line-comment';
      index += 1;
      continue;
    }

    if (character === '/' && next === '*') {
      mode = 'block-comment';
      index += 1;
      continue;
    }

    if (character === "'") {
      mode = 'single';
      continue;
    }

    if (character === '"') {
      mode = 'double';
      continue;
    }

    if (character === '`') {
      mode = 'template';
      continue;
    }

    if (character === open) {
      depth += 1;
      continue;
    }

    if (character === close) {
      depth -= 1;
      if (depth === 0) return text.slice(start + 1, index);
    }
  }

  return undefined;
};

const findObjectAfter = (text: string, key: string): string | undefined => {
  const match = new RegExp(`(?:^|[\\s,{])${key}\\s*:\\s*\\{`, 'm').exec(text);

  if (!match) return undefined;

  return readBalanced(text, match.index + match[0].length - 1);
};

const parseArrayLiteral = (text: string): Array<string | number> => {
  const values: Array<string | number> = [];
  const pattern = /'([^']*)'|"([^"]*)"|(-?\d+(?:\.\d+)?)/g;
  const inner = text.startsWith('[') ? text.slice(1, -1) : text;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(inner)) !== null) {
    if (match[1] !== undefined) values.push(match[1]);
    else if (match[2] !== undefined) values.push(match[2]);
    else if (match[3] !== undefined) values.push(Number(match[3]));
  }

  return values;
};

const readConstArrays = (
  text: string
): Record<string, Array<string | number>> => {
  const arrays: Record<string, Array<string | number>> = {};
  const pattern = /const\s+([A-Za-z0-9_$]+)\s*=\s*(\[[^\]]*\])/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    arrays[match[1]] = parseArrayLiteral(match[2]);
  }

  return arrays;
};

const readArguments = (text: string): Record<string, unknown> => {
  const args: Record<string, unknown> = {};
  const body = findObjectAfter(text, 'args');

  if (!body) return args;

  const pattern =
    /^\s*(?:([A-Za-z0-9_$]+)|'([^']*)'|"([^"]*)")\s*:\s*(.+?)\s*,?\s*$/;

  for (const line of body.split('\n')) {
    const match = pattern.exec(line);

    if (!match) continue;

    const key = match[1] ?? match[2] ?? match[3];
    const value = parseLiteral(match[4]);

    if (value !== undefined) args[key] = value;
  }

  return args;
};

const parseLiteral = (raw: string): unknown | undefined => {
  const value = raw.trim();

  if (value === 'undefined') return undefined;
  if (value === 'null') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;

  const quoted = /^'(.*)'$/.exec(value) ?? /^"(.*)"$/.exec(value);
  if (quoted) return quoted[1];

  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);

  return value;
};

const readArgTypesOptions = (
  text: string
): Record<string, Array<string | number>> => {
  const options: Record<string, Array<string | number>> = {};
  const body = findObjectAfter(text, 'argTypes');

  if (!body) return options;

  const constArrays = readConstArrays(text);
  const keyPattern = /([A-Za-z0-9_$]+)\s*:\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = keyPattern.exec(body)) !== null) {
    const braceIndex = match.index + match[0].length - 1;
    const subBody = readBalanced(body, braceIndex);

    if (subBody === undefined) continue;

    keyPattern.lastIndex = braceIndex + subBody.length + 2;

    const optionsMatch = /options\s*:\s*(\[[^\]]*\]|[A-Za-z0-9_$.]+)/.exec(
      subBody
    );

    if (!optionsMatch) continue;

    const values = optionsMatch[1].startsWith('[')
      ? parseArrayLiteral(optionsMatch[1])
      : constArrays[optionsMatch[1]];

    if (values) options[match[1]] = values;
  }

  return options;
};

const dedent = (text: string): string => {
  const lines = text.replace(/\r\n/g, '\n').split('\n');

  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

  const indents = lines
    .filter((line) => line.trim() !== '')
    .map((line) => (/^ */.exec(line)?.[0] ?? '').length);
  const indent = indents.length > 0 ? Math.min(...indents) : 0;

  return lines.map((line) => line.slice(indent)).join('\n');
};

const readTemplate = (body: string): string | undefined => {
  const match = /template\s*:\s*/.exec(body);

  if (!match) return undefined;

  const start = match.index + match[0].length;
  const character = body[start];

  if (character === '`') {
    let index = start + 1;

    while (index < body.length) {
      if (body[index] === '\\') {
        index += 2;
        continue;
      }

      if (body[index] === '`') break;

      index += 1;
    }

    return dedent(body.slice(start + 1, index));
  }

  const single = /^'((?:\\.|[^'])*)'/.exec(body.slice(start));
  if (single) return single[1];

  const double = /^"((?:\\.|[^"])*)"/.exec(body.slice(start));
  if (double) return double[1];

  return undefined;
};

const readExamples = (text: string): CatalogExample[] => {
  const examples: CatalogExample[] = [];
  const pattern = /export\s+const\s+([A-Za-z0-9_$]+)\s*:[^=\n]*=\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const braceIndex = match.index + match[0].length - 1;
    const body = readBalanced(text, braceIndex);

    if (body === undefined) continue;

    pattern.lastIndex = braceIndex + body.length + 2;

    const nameMatch = /name\s*:\s*['"]([^'"]+)['"]/.exec(body);
    const template = readTemplate(body);

    if (template !== undefined) {
      examples.push({
        title: nameMatch ? nameMatch[1] : match[1],
        source: 'Storybook',
        code: template
      });
    }
  }

  return examples;
};

export const extractStories = (source: string): StoriesContent => {
  const text = source.replace(/\r\n/g, '\n');
  const metaMatch = /const\s+meta\b[^=]*=\s*\{/.exec(text);
  const metaBody = metaMatch
    ? readBalanced(text, metaMatch.index + metaMatch[0].length - 1)
    : undefined;

  const titleMatch = metaBody
    ? /title\s*:\s*['"]([^'"]+)['"]/.exec(metaBody)
    : null;

  return {
    title: titleMatch ? titleMatch[1] : undefined,
    args: readArguments(text),
    argTypesOptions: readArgTypesOptions(text),
    examples: readExamples(text)
  };
};
