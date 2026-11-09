import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import PtOption from './PtOption.vue';

describe('PtOption', () => {
  const classList = (cls: string | undefined) =>
    (cls ?? '').trim().split(/\s+/).filter(Boolean);

  it('renderiza o slot default', () => {
    const wrapper = mount(PtOption, { slots: { default: 'Option' } });

    expect(wrapper.text()).toContain('Option');
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('aplica selected e aria-pressed', () => {
    const wrapper = mount(PtOption, {
      props: { selected: true },
      slots: { default: 'X' }
    });

    expect(wrapper.attributes('aria-pressed')).toBe('true');

    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('bg-pt-surface-1');
  });

  it('mantém aria-pressed=false quando não está selecionado', () => {
    const wrapper = mount(PtOption, {
      props: { selected: false },
      slots: { default: 'X' }
    });

    expect(wrapper.attributes('aria-pressed')).toBe('false');
  });

  it('aplica data-value quando value é informado', () => {
    const wrapper = mount(PtOption, {
      props: { value: 10 },
      slots: { default: 'X' }
    });

    expect(wrapper.attributes('data-value')).toBe('10');
  });

  it('chama onClick (prop)', async () => {
    const onClick = vi.fn();
    const wrapper = mount(PtOption, {
      props: { onClick },
      slots: { default: 'X' }
    });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza startAdornment e endAdornment quando slots existem', () => {
    const wrapper = mount(PtOption, {
      slots: {
        default: 'Content',
        startAdornment: '<span data-testid="start">S</span>',
        endAdornment: '<span data-testid="end">E</span>'
      }
    });

    expect(wrapper.find('[data-testid="start"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="end"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Content');
  });

  it('executa onClick quando fornecido via attrs', async () => {
    const attrsOnClick = vi.fn();
    const wrapper = mount(PtOption, {
      attrs: { onClick: attrsOnClick },
      slots: { default: 'X' }
    });

    await wrapper.trigger('click');

    expect(attrsOnClick).toHaveBeenCalledTimes(1);
  });
});
