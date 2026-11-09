import { describe, expect, it, vi } from 'vitest';

import {
  ptCssTokenImport,
  ptTailwindPlugins,
  ptTailwindTheme
} from './tailwind-theme';

const runTextShadowPlugin = (textShadow?: Record<string, string>) => {
  const addUtilities = vi.fn();
  const plugin = ptTailwindPlugins[0];

  plugin({
    addUtilities,
    theme: (path) => (path === 'textShadow' ? textShadow : undefined)
  });

  return addUtilities;
};

describe('tailwind theme tokens', () => {
  it('should expose the token CSS entry for external consumers', () => {
    expect(ptCssTokenImport).toBe('@pauta/pt-core-ui/tokens.css');
  });

  it('should expose CSS variable based semantic colors, scales and fonts', () => {
    expect(ptTailwindTheme.colors['pt-primary']).toBe(
      'var(--pt-color-primary)'
    );
    expect(ptTailwindTheme.colors['pt-surface'][0]).toBe(
      'var(--pt-color-surface-0)'
    );
    expect(ptTailwindTheme.colors.pt['brand-primary'][700]).toBe(
      'var(--pt-brand-primary-700)'
    );
    expect(ptTailwindTheme.colors.pt.neutral[0]).toBe(
      'var(--pt-neutral-color-0)'
    );
    expect(ptTailwindTheme.colors.pt['neutral-tint'][950]).toBe(
      'var(--pt-neutral-tint-color-950)'
    );
    expect(ptTailwindTheme.colors.pt['neutral-tint-din-scale'][300]).toBe(
      'var(--pt-neutral-tint-din-scale-300)'
    );
    expect(ptTailwindTheme.fontFamily['pt-heading']).toEqual([
      '"Afacad"',
      'sans-serif'
    ]);
    expect(ptTailwindTheme.fontSize['pt-base']).toBe('1rem');
    expect(ptTailwindTheme.spacing['pt-base']).toBe('1rem');
  });

  it('should keep the utility plugin for text shadows available', () => {
    expect(ptTailwindPlugins).toHaveLength(1);
    expect(typeof ptTailwindPlugins[0]).toBe('function');
  });

  it('should register text shadow utilities from the theme configuration', () => {
    const addUtilities = runTextShadowPlugin({
      'pt-small': '0 0 4px var(--pt-color-shadow-1)',
      'pt-action-hover': '0 0 16px var(--pt-color-shadow-hover)'
    });

    expect(addUtilities).toHaveBeenCalledWith([
      {
        '.text-shadow-pt-small': {
          textShadow: '0 0 4px var(--pt-color-shadow-1)'
        }
      },
      {
        '.text-shadow-pt-action-hover': {
          textShadow: '0 0 16px var(--pt-color-shadow-hover)'
        }
      }
    ]);
  });

  it('should register an empty utility list when text shadows are not configured', () => {
    const addUtilities = runTextShadowPlugin();

    expect(addUtilities).toHaveBeenCalledWith([]);
  });
});
