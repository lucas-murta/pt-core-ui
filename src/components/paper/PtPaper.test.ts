import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import PtPaper from './PtPaper.vue';

describe('PtPaper', () => {
  it('renderiza o slot e aplica defaults', () => {
    const wrapper = mount(PtPaper, {
      slots: { default: '<div data-testid="x" />' }
    });

    expect(wrapper.find('[data-testid="x"]').exists()).toBe(true);

    const cls = wrapper.attributes('class');
    expect(cls).toContain('bg-pt-surface-1');
    expect(cls).toContain('border-0');
    expect(cls).toContain('rounded-pt-1');
    expect(cls).toContain('shadow-pt-paper-1');
  });

  it('aplica variant, border e elevation', () => {
    const wrapper = mount(PtPaper, {
      props: {
        variant: 'surface-warning',
        border: '2',
        elevation: 3,
        borderRadius: '2'
      }
    });

    const cls = wrapper.attributes('class');
    expect(cls).toContain('bg-pt-surface-warning');
    expect(cls).toContain('border-pt-border-2');
    expect(cls).toContain('rounded-pt-2');
    expect(cls).toContain('shadow-pt-paper-3');
  });

  it('aplica interactive com hover e active', () => {
    const wrapper = mount(PtPaper, {
      props: { interactive: true, elevation: 2 }
    });

    const cls = wrapper.attributes('class');
    expect(cls).toContain('cursor-pointer');
    expect(cls).toContain('active:translate-y-px');
    expect(cls).toContain('hover:shadow-pt-paper-3');
  });

  it('aplica width, height e spacing shorthand', () => {
    const wrapper = mount(PtPaper, {
      props: { width: '2', height: '16', padding: '2 4', margin: '4 auto' }
    });

    const cls = wrapper.attributes('class');
    expect(cls).toContain('w-pt-2');
    expect(cls).toContain('h-pt-16');
    expect(cls).toContain('py-pt-2');
    expect(cls).toContain('px-pt-4');
    expect(cls).toContain('my-pt-4');
    expect(cls).toContain('mx-auto');
  });

  it('permite trocar a tag via as', () => {
    const wrapper = mount(PtPaper, { props: { as: 'section' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('section');
  });

  it('aplica bgImage via style e classes auxiliares', () => {
    const wrapper = mount(PtPaper, {
      props: { bgImage: '/assets/imgs/screens/screen-aviator.png' }
    });

    const cls = wrapper.attributes('class');
    expect(cls).toContain('bg-cover');
    expect(cls).toContain('bg-center');
    expect(cls).toContain('bg-no-repeat');

    const style = wrapper.attributes('style');
    expect(style).toContain('background-image');
    expect(style).toContain('screen-aviator');
  });
});
