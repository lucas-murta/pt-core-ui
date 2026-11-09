import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';

import PtRadio from './PtRadio.vue';

describe('PtRadio', () => {
  const getInput = (wrapper: ReturnType<typeof mount>) =>
    wrapper.find('input[type="radio"]');

  it('renderiza label via prop e aplica input type=radio', () => {
    const wrapper = mount(PtRadio, { props: { label: 'Option' } });

    expect(wrapper.text()).toContain('Option');
    expect(getInput(wrapper).exists()).toBe(true);
  });

  it('renderiza label via slot quando fornecido', () => {
    const wrapper = mount(PtRadio, { slots: { default: 'Slot label' } });

    expect(wrapper.text()).toContain('Slot label');
  });

  it('aplica defaultChecked sem travar o comportamento nativo do grupo', async () => {
    const Host = defineComponent({
      components: { PtRadio },
      template: `
        <div>
          <PtRadio name="g" value="a" label="A" :default-checked="true" />
          <PtRadio name="g" value="b" label="B" />
        </div>
      `
    });

    const wrapper = mount(Host, { attachTo: document.body });
    const inputs = wrapper.findAll('input[type="radio"]');

    expect((inputs[0].element as HTMLInputElement).checked).toBe(true);
    expect((inputs[1].element as HTMLInputElement).checked).toBe(false);

    await inputs[1].setValue(true);
    await nextTick();

    expect((inputs[1].element as HTMLInputElement).checked).toBe(true);
    expect((inputs[0].element as HTMLInputElement).checked).toBe(false);

    wrapper.unmount();
  });

  it('suporta modo controlado via v-model:checked', async () => {
    const Host = defineComponent({
      components: { PtRadio },
      setup() {
        const checked = ref(false);
        return { checked };
      },
      template: `<PtRadio v-model:checked="checked" label="X" />`
    });

    const wrapper = mount(Host);
    const input = wrapper.find('input[type="radio"]');

    expect((input.element as HTMLInputElement).checked).toBe(false);

    await input.setValue(true);
    await nextTick();

    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('desabilita o input quando disabled=true', () => {
    const wrapper = mount(PtRadio, {
      props: { disabled: true, label: 'X' }
    });

    expect(getInput(wrapper).attributes('disabled')).toBeDefined();
  });
});
