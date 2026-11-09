import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';

import PtThemeProvider from '../components/theme-provider/PtThemeProvider.vue';
import type { PtThemeContext } from '../components/theme-provider/PtThemeProvider.interface';
import { useTheme } from './useTheme';

enableAutoUnmount(afterEach);

afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
});

const flushObserver = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

let captured: PtThemeContext | null = null;

const ThemeConsumer = defineComponent({
  name: 'ThemeConsumer',
  setup() {
    const theme = useTheme();

    captured = theme;

    return { theme };
  },
  template: `<span data-testid="value">{{ theme.resolvedTheme.value }}</span>`
});

describe('useTheme', () => {
  it('le o tema do provider mais proximo', () => {
    const wrapper = mount({
      components: { PtThemeProvider, ThemeConsumer },
      template: `
        <PtThemeProvider theme="dark">
          <PtThemeProvider theme="light">
            <ThemeConsumer />
          </PtThemeProvider>
        </PtThemeProvider>
      `
    });

    expect(wrapper.get('[data-testid="value"]').text()).toBe('light');
  });

  it('troca o tema do provider pelo setTheme do contexto', async () => {
    const wrapper = mount({
      components: { PtThemeProvider, ThemeConsumer },
      template: `
        <PtThemeProvider theme="light" data-testid="provider">
          <ThemeConsumer />
        </PtThemeProvider>
      `
    });

    captured?.toggle();
    await wrapper.vm.$nextTick();

    expect(
      wrapper.get('[data-testid="provider"]').attributes('data-theme')
    ).toBe('dark');
    expect(wrapper.get('[data-testid="value"]').text()).toBe('dark');
  });

  it('sem provider, acompanha o data-theme do documento', async () => {
    const wrapper = mount(ThemeConsumer);

    expect(wrapper.get('[data-testid="value"]').text()).toBe('light');

    document.documentElement.setAttribute('data-theme', 'dark');
    await flushObserver();
    await wrapper.vm.$nextTick();

    expect(wrapper.get('[data-testid="value"]').text()).toBe('dark');
  });

  it('sem provider, setTheme e toggle nao alteram o documento', async () => {
    const wrapper = mount(ThemeConsumer);

    captured?.setTheme('dark');
    captured?.toggle();
    await wrapper.vm.$nextTick();

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(wrapper.get('[data-testid="value"]').text()).toBe('light');
  });
});
