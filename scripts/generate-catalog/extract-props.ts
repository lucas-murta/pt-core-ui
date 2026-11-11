import { parse } from '@vue/compiler-sfc';
import * as ts from 'typescript';

import type {
  CatalogEvent,
  CatalogModel,
  CatalogProp,
  CatalogSlot
} from './types';

const SKIP = Symbol('skip');

export type ComponentApi = {
  name?: string;
  hasDefineProps: boolean;
  props: CatalogProp[];
  events: CatalogEvent[];
  slots: CatalogSlot[];
  models: CatalogModel[];
};

export const parseScriptSetup = (source: string): string => {
  const { descriptor, errors } = parse(source, { filename: 'Component.vue' });
  const firstError = errors[0];

  if (firstError) {
    throw new Error(`SFC invalido: ${firstError.message}`);
  }

  return descriptor.scriptSetup?.content ?? '';
};

const findCallExpression = (
  sourceFile: ts.SourceFile,
  name: string
): ts.CallExpression | undefined => {
  let found: ts.CallExpression | undefined;

  const visit = (node: ts.Node): void => {
    if (found) return;

    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sourceFile) === name
    ) {
      found = node;
      return;
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return found;
};

const readObjectKey = (
  name: ts.PropertyName,
  sourceFile: ts.SourceFile
): string =>
  ts.isStringLiteral(name) || ts.isIdentifier(name)
    ? name.text
    : name.getText(sourceFile);

const resolveConstantLiteral = (
  node: ts.Expression,
  checker: ts.TypeChecker
): string | number | undefined => {
  if (!ts.isIdentifier(node)) return undefined;

  const symbol = checker.getSymbolAtLocation(node);

  if (!symbol) return undefined;

  const resolved =
    (symbol.flags & ts.SymbolFlags.Alias) !== 0
      ? checker.getAliasedSymbol(symbol)
      : symbol;
  const declaration = resolved.valueDeclaration;

  if (
    !declaration ||
    !ts.isVariableDeclaration(declaration) ||
    !declaration.initializer
  ) {
    return undefined;
  }

  const type = checker.getTypeAtLocation(declaration.initializer);

  return type.isStringLiteral() || type.isNumberLiteral()
    ? type.value
    : undefined;
};

const readLiteralValue = (
  node: ts.Expression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): unknown | typeof SKIP => {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isIdentifier(node) && node.text === 'undefined') {
    return SKIP;
  }

  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    const value = Number(node.operand.text);
    return node.operator === ts.SyntaxKind.MinusToken ? -value : value;
  }

  const constant = resolveConstantLiteral(node, checker);

  if (constant !== undefined) return constant;

  return node.getText(sourceFile).replace(/\s+/g, ' ');
};

const readDefaultValues = (
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): Map<string, unknown> => {
  const defaults = new Map<string, unknown>();
  const withDefaultsCall = findCallExpression(sourceFile, 'withDefaults');
  const argument = withDefaultsCall?.arguments[1];

  if (!argument || !ts.isObjectLiteralExpression(argument)) return defaults;

  for (const property of argument.properties) {
    if (!ts.isPropertyAssignment(property)) continue;

    const key = readObjectKey(property.name, sourceFile);
    const value = readLiteralValue(property.initializer, sourceFile, checker);

    if (value !== SKIP) defaults.set(key, value);
  }

  return defaults;
};

export const extractComponentApi = ({
  sourceFile,
  checker
}: {
  sourceFile: ts.SourceFile;
  checker: ts.TypeChecker;
}): ComponentApi => {
  const documentationOf = (symbol: ts.Symbol): string | undefined => {
    const text = ts
      .displayPartsToString(symbol.getDocumentationComment(checker))
      .trim();

    return text.length > 0 ? text : undefined;
  };

  const formatType = (type: ts.Type, node: ts.Node): string => {
    const flags = ts.TypeFormatFlags.NoTruncation;
    const text = type.isUnion()
      ? type.types
          .map((part) => checker.typeToString(part, node, flags))
          .join(' | ')
      : checker.typeToString(type, node, flags);

    return text.replace(/"/g, "'");
  };

  const enumValuesOf = (type: ts.Type): Array<string | number> | undefined => {
    if (!type.isUnion()) return undefined;

    const values: Array<string | number> = [];

    for (const part of type.types) {
      if (part.isStringLiteral() || part.isNumberLiteral()) {
        values.push(part.value);
        continue;
      }

      return undefined;
    }

    return values.length > 0 ? values : undefined;
  };

  const propertySignatureOf = (
    symbol: ts.Symbol
  ): ts.PropertySignature | undefined =>
    symbol
      .getDeclarations()
      ?.find((declaration) => ts.isPropertySignature(declaration));

  let name: string | undefined;
  const optionsCall = findCallExpression(sourceFile, 'defineOptions');
  const optionsArgument = optionsCall?.arguments[0];

  if (optionsArgument && ts.isObjectLiteralExpression(optionsArgument)) {
    for (const property of optionsArgument.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      if (readObjectKey(property.name, sourceFile) !== 'name') continue;
      if (ts.isStringLiteral(property.initializer)) {
        name = property.initializer.text;
      }
    }
  }

  const defaults = readDefaultValues(sourceFile, checker);

  const props: CatalogProp[] = [];
  const propsCall = findCallExpression(sourceFile, 'defineProps');
  const propsTypeArgument = propsCall?.typeArguments?.[0];

  if (propsTypeArgument) {
    const propsType = checker.getTypeFromTypeNode(propsTypeArgument);
    const symbols = [...checker.getPropertiesOfType(propsType)];
    const startOffsetOf = (symbol: ts.Symbol): number =>
      symbol.getDeclarations()?.[0]?.getStart() ?? 0;

    symbols.sort((left, right) => startOffsetOf(left) - startOffsetOf(right));

    for (const symbol of symbols) {
      const propName = symbol.getName();
      const declaration = propertySignatureOf(symbol);
      const typeNode = declaration?.type;
      const propType = typeNode
        ? checker.getTypeFromTypeNode(typeNode)
        : checker.getTypeOfSymbolAtLocation(symbol, propsTypeArgument);

      const entry: CatalogProp = {
        name: propName,
        type: formatType(propType, typeNode ?? propsTypeArgument),
        required:
          (symbol.flags & ts.SymbolFlags.Optional) === 0 &&
          !defaults.has(propName)
      };

      if (typeNode && ts.isTypeReferenceNode(typeNode)) {
        entry.typeName = typeNode.typeName.getText(typeNode.getSourceFile());
      }

      const enumValues = enumValuesOf(propType);
      if (enumValues) entry.enumValues = enumValues;

      const description = documentationOf(symbol);
      if (description) entry.description = description;

      if (defaults.has(propName)) entry.default = defaults.get(propName);

      props.push(entry);
    }
  }

  const events: CatalogEvent[] = [];
  const emitsCall = findCallExpression(sourceFile, 'defineEmits');
  const emitsTypeArgument = emitsCall?.typeArguments?.[0];

  if (emitsTypeArgument) {
    const emitsType = checker.getTypeFromTypeNode(emitsTypeArgument);

    for (const symbol of checker.getPropertiesOfType(emitsType)) {
      const typeNode = propertySignatureOf(symbol)?.type;
      const event: CatalogEvent = { name: symbol.getName() };

      if (
        typeNode &&
        ts.isTupleTypeNode(typeNode) &&
        typeNode.elements.length
      ) {
        event.payload = typeNode.elements
          .map((element) =>
            formatType(checker.getTypeFromTypeNode(element), element)
          )
          .join(' | ');
      }

      events.push(event);
    }
  }

  const slots: CatalogSlot[] = [];
  const slotsCall = findCallExpression(sourceFile, 'defineSlots');
  const slotsTypeArgument = slotsCall?.typeArguments?.[0];

  if (slotsTypeArgument) {
    const slotsType = checker.getTypeFromTypeNode(slotsTypeArgument);

    for (const symbol of checker.getPropertiesOfType(slotsType)) {
      const slot: CatalogSlot = { name: symbol.getName() };
      const description = documentationOf(symbol);

      if (description) slot.description = description;

      slots.push(slot);
    }
  }

  const models: CatalogModel[] = events
    .filter((event) => event.name.startsWith('update:'))
    .map((event) => ({
      prop: event.name.slice('update:'.length),
      event: event.name
    }))
    .filter((model) => props.some((prop) => prop.name === model.prop));

  return {
    name,
    hasDefineProps: Boolean(propsCall),
    props,
    events,
    slots,
    models
  };
};
