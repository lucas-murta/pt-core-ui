import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import PtLoading from './PtLoading.vue';

describe('PtLoading', () => {
  it('renderiza o container e usa primary por default', () => {
    const wrapper = mount(PtLoading);

    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
    expect(wrapper.attributes('role')).toBe('status');
    expect(wrapper.attributes('aria-busy')).toBe('true');
    expect(
      wrapper.find('[data-loading-arrow]').attributes('data-variant')
    ).toBe('primary');
  });

  it('renderiza variant secondary', () => {
    const wrapper = mount(PtLoading, {
      props: { variant: 'secondary' }
    });

    expect(
      wrapper.find('[data-loading-arrow]').attributes('data-variant')
    ).toBe('secondary');
    expect(wrapper.find('[data-loading-arrow]').attributes('style')).toContain(
      'color: var(--pt-color-primary);'
    );
  });

  it('renderiza variant tertiary', () => {
    const wrapper = mount(PtLoading, {
      props: { variant: 'tertiary' }
    });

    expect(
      wrapper.find('[data-loading-arrow]').attributes('data-variant')
    ).toBe('tertiary');
    expect(wrapper.find('[data-loading-arrow]').attributes('style')).toContain(
      'color: var(--pt-color-content-bright);'
    );
  });

  it('renderiza a seta play arredondada em branco na variante primary', () => {
    const wrapper = mount(PtLoading);

    expect(wrapper.find('[data-loading-arrow]').attributes('style')).toContain(
      'color: var(--pt-color-content-bright);'
    );
    expect(wrapper.find('[data-loading-arrow] path').attributes('d')).toBe(
      'M7.2 3.6C5.7 2.7 4 3.8 4 5.5v13c0 1.7 1.7 2.8 3.2 1.9l11.7-7.1c1.3-.8 1.3-2.2 0-3L7.2 3.6Z'
    );
  });

  it('renderiza spinner', () => {
    const wrapper = mount(PtLoading, {
      props: { type: 'spinner', size: '3' }
    });

    expect(wrapper.find('[data-loading-arrow]').exists()).toBe(false);
    expect(wrapper.find('[data-loading-spinner]').exists()).toBe(true);
    expect(wrapper.find('[data-loading-spinner]').classes()).toContain(
      'animate-pt-spinner-infinite'
    );
    expect(
      wrapper.find('[data-loading-spinner]').attributes('style')
    ).toContain('color: var(--pt-color-content-bright);');
  });

  it('renderiza cyclical e atualiza com value', async () => {
    const wrapper = mount(PtLoading, {
      props: { type: 'cyclical', value: 50 }
    });

    const circle = wrapper.find('circle');
    expect(circle.exists()).toBe(true);
    expect(circle.attributes('stroke')).toBe('var(--pt-color-content-bright)');

    const circumference = 2 * Math.PI * 46;
    const offset50 = Number(circle.attributes('stroke-dashoffset'));
    expect(offset50).toBeCloseTo(circumference * 0.5, 3);

    await wrapper.setProps({ value: 100 });

    const offset100 = Number(
      wrapper.find('circle').attributes('stroke-dashoffset')
    );
    expect(offset100).toBeCloseTo(0, 3);
  });

  it('aplica size no container', () => {
    const wrapper = mount(PtLoading, {
      props: { size: '3' }
    });

    expect(wrapper.classes()).toContain('h-pt-3');
    expect(wrapper.classes()).toContain('w-pt-3');
  });
});
