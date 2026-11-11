import type { CatalogExample } from './types';

export type ReadmeContent = {
  summary?: string;
  description?: string;
  propDescriptions: Record<string, string>;
  examples: CatalogExample[];
};

type Section = {
  heading: string;
  level: number;
  title: string;
  content: string[];
};

const HEADING = /^(#{1,6})\s+(.*?)\s*$/;
const FENCE_OPEN = /^```([^\s`]*)\s*$/;
const FENCE_CLOSE = /^```\s*$/;
const IMPORT_SECTION = 'import';
const PROPS_SECTION = 'props principais';

const splitSections = (lines: string[]): Section[] => {
  const sections: Section[] = [];
  let current: Section | undefined;
  let inFence = false;

  for (const line of lines) {
    if (!inFence && FENCE_OPEN.test(line)) {
      inFence = true;
      current?.content.push(line);
      continue;
    }

    if (inFence) {
      current?.content.push(line);
      if (FENCE_CLOSE.test(line)) inFence = false;
      continue;
    }

    const heading = HEADING.exec(line);

    if (heading) {
      if (current) sections.push(current);
      current = {
        heading: line.trim(),
        level: heading[1].length,
        title: heading[2].trim().toLowerCase(),
        content: []
      };
      continue;
    }

    current?.content.push(line);
  }

  if (current) sections.push(current);

  return sections;
};

const extractSummary = (lines: string[]): string | undefined => {
  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line));

  if (titleIndex === -1) return undefined;

  const paragraph: string[] = [];

  for (let index = titleIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (line === '') {
      if (paragraph.length > 0) break;
      continue;
    }

    if (HEADING.test(line) || FENCE_OPEN.test(line)) break;

    paragraph.push(line);
  }

  return paragraph.length > 0 ? paragraph.join(' ').trim() : undefined;
};

const extractPropDescriptions = (
  sections: Section[]
): Record<string, string> => {
  const descriptions: Record<string, string> = {};
  const section = sections.find((item) => item.title === PROPS_SECTION);

  if (!section) return descriptions;

  const pattern = /^-\s*`([A-Za-z0-9_$]+)`\s*:?\s*(.*)$/;

  for (const line of section.content) {
    const match = pattern.exec(line.trim());

    if (match && match[2].trim().length > 0) {
      descriptions[match[1]] = match[2].trim();
    }
  }

  return descriptions;
};

const extractExamples = (lines: string[]): CatalogExample[] => {
  const examples: CatalogExample[] = [];
  let currentHeading = '';
  let headingForBlock = '';
  let inFence = false;
  let buffer: string[] = [];

  for (const line of lines) {
    if (!inFence) {
      if (FENCE_OPEN.test(line)) {
        inFence = true;
        headingForBlock = currentHeading;
        buffer = [];
        continue;
      }

      const heading = HEADING.exec(line);
      if (heading) currentHeading = heading[2].trim();
      continue;
    }

    if (FENCE_CLOSE.test(line)) {
      inFence = false;

      if (
        headingForBlock.toLowerCase() !== IMPORT_SECTION &&
        buffer.length > 0
      ) {
        examples.push({
          title: headingForBlock || 'Exemplo',
          source: 'README',
          code: buffer.join('\n')
        });
      }

      continue;
    }

    buffer.push(line);
  }

  return examples;
};

export const extractReadme = (markdown: string): ReadmeContent => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const sections = splitSections(lines);
  const kept = sections.filter(
    (section) => section.level >= 2 && section.title !== IMPORT_SECTION
  );

  const description = kept
    .map((section) => [section.heading, ...section.content].join('\n'))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    summary: extractSummary(lines),
    description: description.length > 0 ? description : undefined,
    propDescriptions: extractPropDescriptions(sections),
    examples: extractExamples(lines)
  };
};
