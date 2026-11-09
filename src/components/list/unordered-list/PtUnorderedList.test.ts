import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import PtUnorderedList from './PtUnorderedList.vue';

describe('PtUnorderedList', () => {
  it('renderiza ul e aplica defaults', () => {
    const wrapper = mount(PtUnorderedList, {
      slots: { default: '<li>Item</li>' }
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe('ul');

    const classList = wrapper.attributes('class');
    expect(classList).toContain('list-none');
    expect(classList).toContain('flex');
    expect(classList).toContain('flex-col');
  });

  it('aplica orientation horizontal', () => {
    const wrapper = mount(PtUnorderedList, {
      props: { orientation: 'horizontal' },
      slots: { default: '<li>Item</li>' }
    });

    const classList = wrapper.attributes('class');
    expect(classList).toContain('flex-row');
    expect(classList).toContain('flex-wrap');
  });

  it('dense remove gap', () => {
    const wrapper = mount(PtUnorderedList, {
      props: { dense: true },
      slots: { default: '<li>Item</li>' }
    });

    const classList = wrapper.attributes('class');
    expect(classList).toContain('gap-0');
    expect(classList).not.toContain('gap-pt-1');
  });

  it('força render vertical para sub-lista mesmo quando parent é horizontal', () => {
    const Host = {
      components: { PtUnorderedList },
      template: `
        <PtUnorderedList orientation="horizontal">
          <PtUnorderedList>
            <li>Sub</li>
          </PtUnorderedList>
        </PtUnorderedList>
      `
    };

    const wrapper = mount(Host);
    const lists = wrapper.findAll('ul');

    expect(lists.length).toBe(2);
    expect(lists[0].attributes('class')).toContain('flex-row');
    expect(lists[1].attributes('class')).toContain('flex-col');
  });
});
