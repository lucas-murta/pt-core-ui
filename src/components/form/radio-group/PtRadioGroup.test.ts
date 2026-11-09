import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';

import PtRadio from '../radio/PtRadio.vue';
import PtRadioGroup from './PtRadioGroup.vue';

describe('PtRadioGroup', () => {
  it('renderiza com role="radiogroup" e aplica orientação', () => {
    const wrapper = mount(PtRadioGroup, {
      props: { orientation: 'horizontal' },
      slots: {
        default: '<div data-testid="child" />'
      }
    });

    expect(wrapper.attributes('role')).toBe('radiogroup');
    expect(wrapper.find('[data-testid="child"]').exists()).toBe(true);
    expect(wrapper.attributes('class')).toContain('flex-row');
  });

  it('não-controlado: atualiza estado interno e emite update:value/value-change', async () => {
    const onValueChange = vi.fn();
    const wrapper = mount(PtRadioGroup, {
      props: { defaultValue: 'a', onValueChange },
      slots: {
        default:
          '<PtRadio value="a" label="A" /><PtRadio value="b" label="B" /><PtRadio value="c" label="C" />'
      },
      global: { components: { PtRadio } },
      attachTo: document.body
    });

    const inputs = wrapper.findAll('input[type="radio"]');
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true);

    await inputs[1].setValue(true);
    await nextTick();

    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(wrapper.emitted('value-change')?.[0]).toEqual(['b']);
    expect(wrapper.emitted('update:value')?.[0]).toEqual(['b']);
    expect((inputs[1].element as HTMLInputElement).checked).toBe(true);

    wrapper.unmount();
  });

  it('controlado: emite update:value, mas checked reflete prop value', async () => {
    const Host = defineComponent({
      components: { PtRadioGroup, PtRadio },
      setup() {
        const value = ref('a');
        return { value };
      },
      template: `
        <PtRadioGroup v-model:value="value">
          <PtRadio value="a" label="A" />
          <PtRadio value="b" label="B" />
        </PtRadioGroup>
      `
    });

    const wrapper = mount(Host, { attachTo: document.body });
    const inputs = wrapper.findAll('input[type="radio"]');

    expect((inputs[0].element as HTMLInputElement).checked).toBe(true);
    expect((inputs[1].element as HTMLInputElement).checked).toBe(false);

    await inputs[1].setValue(true);
    await nextTick();

    expect((inputs[0].element as HTMLInputElement).checked).toBe(false);
    expect((inputs[1].element as HTMLInputElement).checked).toBe(true);

    wrapper.unmount();
  });

  it('propaga disabled para os radios filhos', () => {
    const wrapper = mount(PtRadioGroup, {
      props: { disabled: true },
      slots: {
        default:
          '<PtRadio value="a" label="A" /><PtRadio value="b" label="B" />'
      },
      global: { components: { PtRadio } }
    });

    const inputs = wrapper.findAll('input[type="radio"]');
    expect(inputs.length).toBe(2);
    expect(inputs[0].attributes('disabled')).toBeDefined();
    expect(inputs[1].attributes('disabled')).toBeDefined();
  });
});
