import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import PtChip from './PtChip.vue';

describe('PtChip', () => {
  const classList = (cls: string | undefined) =>
    (cls ?? '').trim().split(/\s+/).filter(Boolean);

  it('renderiza o slot e aplica defaults', () => {
    const wrapper = mount(PtChip, { slots: { default: 'Chip' } });

    expect(wrapper.text()).toContain('Chip');

    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('h-pt-3');
    expect(list).toContain('rounded-pt-1');
    expect(list).toContain('bg-pt-content-primary');
    expect(list).toContain('text-pt-surface-primary');
  });

  it('aplica variant warning', () => {
    const wrapper = mount(PtChip, {
      props: { variant: 'warning' },
      slots: { default: 'Warning' }
    });
    const list = classList(wrapper.attributes('class'));

    expect(list).toContain('bg-pt-content-warning');
    expect(list).toContain('border-pt-content-warning');
    expect(list).toContain('text-pt-surface-warning');
  });

  it('dispara click por mouse e teclado apenas quando clickable=true', async () => {
    const onClick = vi.fn();
    const wrapper = mount(PtChip, {
      props: { clickable: true },
      attrs: { onClick },
      slots: { default: 'Clickable' }
    });

    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('tabindex')).toBe('0');

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });
    await wrapper.trigger('keydown', { key: 'Escape' });

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('não dispara click quando clickable=false', async () => {
    const onClick = vi.fn();
    const wrapper = mount(PtChip, {
      props: { clickable: false },
      attrs: { onClick },
      slots: { default: 'Static' }
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
    expect(wrapper.attributes('role')).toBeUndefined();
  });

  it('renderiza botão de close e chama onClose sem propagar o click', async () => {
    const onClick = vi.fn();
    const onClose = vi.fn();
    const wrapper = mount(PtChip, {
      props: { clickable: true, closable: true, onClose },
      attrs: { onClick },
      slots: { default: 'Closable' }
    });

    const closeButton = wrapper.find('button[aria-label="Close"]');

    expect(closeButton.exists()).toBe(true);
    expect(closeButton.find('svg').exists()).toBe(true);
    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.attributes('tabindex')).toBeUndefined();

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });

    await closeButton.trigger('click');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
