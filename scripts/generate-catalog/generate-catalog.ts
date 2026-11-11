import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

import { extractComponentApi, parseScriptSetup } from './extract-props';
import { extractReadme } from './extract-readme';
import { extractStories } from './extract-stories';
import { extractTokens } from './extract-tokens';
import type { Catalog, CatalogComponent, CatalogExample } from './types';

export const SCHEMA_VERSION = '1.0.0';
export const GENERATOR_ID = 'pt-core-ui/build:catalog';
export const PACKAGE_NAME = '@pauta/pt-core-ui';

const COMPONENT_FILE_PATTERN = /^Pt.*\.vue$/;

export type CatalogDependencies = {
  repoRoot: string;
  readFile?: (filePath: string) => string;
  fileExists?: (filePath: string) => boolean;
  listFiles?: (dir: string) => string[];
  withTimestamp?: boolean;
  now?: () => Date;
};

export type RepoRootDependencies = {
  startDir: string;
  fileExists: (filePath: string) => boolean;
  dirname: (value: string) => string;
  join: (...values: string[]) => string;
};

const toPosix = (value: string): string => value.replace(/\\/g, '/');

const defaultReadFile = (filePath: string): string =>
  readFileSync(filePath, 'utf8');

const defaultWriteFile = (filePath: string, content: string): void => {
  writeFileSync(filePath, content, 'utf8');
};

export const listFilesRecursive = (dir: string): string[] => {
  const results: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true }).sort(
    (left, right) => (left.name < right.name ? -1 : 1)
  );

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) results.push(...listFilesRecursive(fullPath));
    else if (entry.isFile()) results.push(fullPath);
  }

  return results;
};

export const findRepoRoot = ({
  startDir,
  fileExists,
  dirname,
  join
}: RepoRootDependencies): string | undefined => {
  let dir = startDir;

  for (;;) {
    if (
      fileExists(join(dir, 'package.json')) &&
      fileExists(join(dir, 'src', 'index.ts'))
    ) {
      return dir;
    }

    const parent = dirname(dir);

    if (parent === dir) return undefined;

    dir = parent;
  }
};

export const resolveRepoRoot = (): string => {
  const starts = [
    process.cwd(),
    typeof __dirname !== 'undefined' ? __dirname : undefined
  ].filter((value): value is string => Boolean(value));

  for (const startDir of starts) {
    const found = findRepoRoot({
      startDir,
      fileExists: existsSync,
      dirname: path.dirname,
      join: path.join
    });

    if (found) return found;
  }

  throw new Error(
    'Nao foi possivel localizar a raiz do repositorio (package.json + src/index.ts).'
  );
};

const resolveModuleResolution = (): ts.ModuleResolutionKind => {
  const kinds = ts.ModuleResolutionKind as unknown as Record<string, number>;
  return kinds.Bundler ?? ts.ModuleResolutionKind.NodeJs;
};

const createProgram = ({
  repoRoot,
  rootNames,
  virtualFiles
}: {
  repoRoot: string;
  rootNames: string[];
  virtualFiles: Map<string, string>;
}): ts.Program => {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: resolveModuleResolution(),
    lib: ['lib.esnext.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    strictNullChecks: true,
    skipLibCheck: true,
    noEmit: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    allowJs: false,
    types: []
  };
  const host = ts.createCompilerHost(compilerOptions);
  const baseGetSourceFile = host.getSourceFile.bind(host);
  const baseFileExists = host.fileExists.bind(host);
  const baseReadFile = host.readFile.bind(host);

  host.getSourceFile = (
    fileName,
    languageVersion,
    onError,
    shouldCreateNewSourceFile
  ) => {
    const content = virtualFiles.get(toPosix(fileName));

    if (content !== undefined) {
      return ts.createSourceFile(fileName, content, languageVersion, true);
    }

    return baseGetSourceFile(
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile
    );
  };
  host.fileExists = (fileName) =>
    virtualFiles.has(toPosix(fileName)) || baseFileExists(fileName);
  host.readFile = (fileName) => {
    const content = virtualFiles.get(toPosix(fileName));
    return content !== undefined ? content : baseReadFile(fileName);
  };
  host.getCurrentDirectory = () => repoRoot;

  const program = ts.createProgram({
    rootNames: rootNames.map(toPosix),
    options: compilerOptions,
    host
  });

  return program;
};

const buildComponent = ({
  componentFile,
  componentsDir,
  repoRoot,
  checker,
  virtualPath,
  getSourceFile,
  readFile,
  fileExists
}: {
  componentFile: string;
  componentsDir: string;
  repoRoot: string;
  checker: ts.TypeChecker;
  virtualPath: string;
  getSourceFile: (fileName: string) => ts.SourceFile | undefined;
  readFile: (filePath: string) => string;
  fileExists: (filePath: string) => boolean;
}): CatalogComponent => {
  const dir = path.dirname(componentFile);
  const base = path.basename(componentFile, '.vue');
  const sourceFile = getSourceFile(virtualPath);

  if (!sourceFile) {
    throw new Error(`Nao foi possivel analisar ${toPosix(componentFile)}.`);
  }

  const api = extractComponentApi({ sourceFile, checker });
  const name = api.name ?? base;
  const interfacePath = path.join(dir, `${base}.interface.ts`);
  const hasInterface = fileExists(interfacePath);

  if (!api.hasDefineProps && !hasInterface) {
    throw new Error(
      `Componente ${name} (${toPosix(
        path.relative(repoRoot, componentFile)
      )}) sem defineProps e sem ${base}.interface.ts.`
    );
  }

  const readmePath = path.join(dir, 'README.md');
  const readme = fileExists(readmePath)
    ? extractReadme(readFile(readmePath))
    : undefined;

  const storiesPath = path.join(dir, `${base}.stories.ts`);
  const stories = fileExists(storiesPath)
    ? extractStories(readFile(storiesPath))
    : undefined;

  const storyArgs = stories?.args ?? {};
  const storyOptions = stories?.argTypesOptions ?? {};

  for (const prop of api.props) {
    if (
      prop.default === undefined &&
      !prop.required &&
      storyArgs[prop.name] !== undefined
    ) {
      prop.default = storyArgs[prop.name];
    }

    if (!prop.description && readme?.propDescriptions[prop.name]) {
      prop.description = readme.propDescriptions[prop.name];
    }

    if (!prop.enumValues && storyOptions[prop.name]?.length) {
      prop.enumValues = storyOptions[prop.name];
    }
  }

  const examples: CatalogExample[] = [
    ...(readme?.examples ?? []),
    ...(stories?.examples ?? [])
  ];

  const category = toPosix(path.relative(componentsDir, componentFile)).split(
    '/'
  )[0];

  return {
    name,
    import: `import { ${name} } from '${PACKAGE_NAME}'`,
    sourcePath: toPosix(path.relative(repoRoot, componentFile)),
    category,
    summary: readme?.summary,
    description: readme?.description,
    props: api.props,
    slots: api.slots,
    events: api.events,
    models: api.models,
    examples,
    storybook: stories?.title ? { title: stories.title } : undefined
  };
};

const isExported = (indexContent: string, name: string): boolean =>
  new RegExp(`\\b${name}\\b`).test(indexContent);

export const buildCatalog = ({
  repoRoot,
  readFile = defaultReadFile,
  fileExists = existsSync,
  listFiles = listFilesRecursive,
  withTimestamp = false,
  now = () => new Date()
}: CatalogDependencies): Catalog => {
  const packageJson = JSON.parse(
    readFile(path.join(repoRoot, 'package.json'))
  ) as { name: string; version: string };
  const componentsDir = path.join(repoRoot, 'src', 'components');
  const indexContent = readFile(path.join(repoRoot, 'src', 'index.ts'));

  const componentFiles = listFiles(componentsDir)
    .filter((filePath) => COMPONENT_FILE_PATTERN.test(path.basename(filePath)))
    .sort();

  const virtualFiles = new Map<string, string>();
  const componentVirtualPaths = new Map<string, string>();

  for (const componentFile of componentFiles) {
    const virtualPath = toPosix(`${componentFile}.ts`);
    virtualFiles.set(virtualPath, parseScriptSetup(readFile(componentFile)));
    componentVirtualPaths.set(componentFile, virtualPath);
  }

  const sourceRoots = listFiles(path.join(repoRoot, 'src')).filter(
    (filePath) =>
      filePath.endsWith('.ts') &&
      !filePath.endsWith('.d.ts') &&
      !filePath.endsWith('.test.ts') &&
      !filePath.endsWith('.stories.ts')
  );

  const program = createProgram({
    repoRoot,
    rootNames: [...sourceRoots, ...virtualFiles.keys()],
    virtualFiles
  });
  const checker = program.getTypeChecker();

  const components = componentFiles.map((componentFile) =>
    buildComponent({
      componentFile,
      componentsDir,
      repoRoot,
      checker,
      virtualPath: componentVirtualPaths.get(componentFile) as string,
      getSourceFile: (fileName) => program.getSourceFile(fileName),
      readFile,
      fileExists
    })
  );

  const seen = new Map<string, string>();

  for (const component of components) {
    const previous = seen.get(component.name);

    if (previous) {
      throw new Error(
        `Nome de componente duplicado: ${component.name} em ${previous} e ${component.sourcePath}.`
      );
    }

    seen.set(component.name, component.sourcePath);
  }

  const withInternal = components.map((component) => {
    if (isExported(indexContent, component.name)) return component;

    return { ...component, internal: true };
  });

  withInternal.sort((left, right) => (left.name < right.name ? -1 : 1));

  return {
    schemaVersion: SCHEMA_VERSION,
    generator: GENERATOR_ID,
    package: {
      name: packageJson.name,
      version: packageJson.version
    },
    ...(withTimestamp ? { generatedAt: now().toISOString() } : {}),
    components: withInternal,
    tokens: extractTokens({ repoRoot, readFile })
  };
};

export const serializeCatalog = (catalog: Catalog): string =>
  `${JSON.stringify(catalog, null, 2)}\n`;

export type RunCatalogOptions = {
  argv?: string[];
  repoRoot?: string;
  readFile?: (filePath: string) => string;
  writeFile?: (filePath: string, content: string) => void;
  fileExists?: (filePath: string) => boolean;
  listFiles?: (dir: string) => string[];
  now?: () => Date;
  exit?: (code: number) => void;
  log?: (message: string) => void;
  logError?: (message: string) => void;
};

export const runGenerateCatalog = (options: RunCatalogOptions = {}): void => {
  const {
    argv = process.argv.slice(2),
    readFile = defaultReadFile,
    writeFile = defaultWriteFile,
    fileExists = existsSync,
    listFiles = listFilesRecursive,
    now = () => new Date(),
    exit = (code: number) => {
      process.exit(code);
    },
    log = (message: string) => {
      console.log(message);
    },
    logError = (message: string) => {
      console.error(message);
    }
  } = options;

  const check = argv.includes('--check');
  const withTimestamp = argv.includes('--with-timestamp');
  const outIndex = argv.indexOf('--out');
  const outValue = outIndex === -1 ? undefined : argv[outIndex + 1];

  try {
    const repoRoot = options.repoRoot ?? resolveRepoRoot();
    const outputPath = outValue
      ? path.resolve(repoRoot, outValue)
      : path.join(repoRoot, 'catalog.json');
    const content = serializeCatalog(
      buildCatalog({
        repoRoot,
        readFile,
        fileExists,
        listFiles,
        withTimestamp,
        now
      })
    );

    if (check) {
      if (!fileExists(outputPath)) {
        logError(
          `catalog.json nao encontrado em ${toPosix(
            outputPath
          )}. Rode "npm run build:catalog".`
        );
        exit(1);
        return;
      }

      const current = readFile(outputPath).replace(/\r\n/g, '\n');

      if (current !== content) {
        logError(
          'catalog.json esta desatualizado. Rode "npm run build:catalog" para regenerar.'
        );
        exit(1);
        return;
      }

      log('catalog.json esta atualizado.');
      exit(0);
      return;
    }

    writeFile(outputPath, content);
    log(
      `catalog.json gerado em ${toPosix(path.relative(repoRoot, outputPath))}.`
    );
  } catch (error: unknown) {
    logError('Falha ao gerar o catalog.json.');
    logError(error instanceof Error ? error.message : String(error));
    exit(1);
  }
};
