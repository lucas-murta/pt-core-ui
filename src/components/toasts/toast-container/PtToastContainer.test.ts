import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import PtToastContainer from './PtToastContainer.vue';
import {
  buildToastContainerClasses,
  isBottomPosition
} from './stylePtToastContainer';
import PtThemeProvider from '../../theme-provider/PtThemeProvider.vue';
import {
  dismissAllToasts,
  ptToastConfig,
  PT_TOAST_DEFAULT_DURATION,
  PT_TOAST_DEFAULT_MAX,
  useToast
} from '../../../composables/useToast';

const toast = useToast();

// `to: false` desliga o Teleport para o wrapper enxergar a arvore nos testes.
const mountContainer = (props: Record<string, unknown> = {}) =>
  mount(PtToastContainer, { props: { to: false, ...props } });

const items = (wrapper: ReturnType<typeof mountContainer>) =>
  wrapper.findAll('[data-pt-toast-status]');

beforeEach(() => {
  vi.useFakeTimers();
  dismissAllToasts();
  ptToastConfig.duration = PT_TOAST_DEFAULT_DURATION;
  ptToastConfig.max = PT_TOAST_DEFAULT_MAX;
});

afterEach(() => {
  dismissAllToasts();
  vi.useRealTimers();
});

describe('stylePtToastContainer', () => {
  it('identifica as posicoes de baixo', () => {
    expect(isBottomPosition('bottom-left')).toBe(true);
    expect(isBottomPosition('bottom-center')).toBe(true);
    expect(isBottomPosition('bottom-right')).toBe(true);
    expect(isBottomPosition('top-right')).toBe(false);
  });

  it('empilha ao contrario nas posicoes de baixo', () => {
    expect(
      buildToastContainerClasses({ position: 'top-right' }).container
    ).toContain('flex-col');
    expect(
      buildToastContainerClasses({ position: 'bottom-right' }).container
    ).toContain('flex-col-reverse');
  });

  it('ancora em cada canto da tela', () => {
    const posicoes = [
      ['top-left', 'top-pt-2'],
      ['top-center', 'left-1/2'],
      ['top-right', 'right-pt-2'],
      ['bottom-left', 'bottom-pt-2'],
      ['bottom-center', 'left-1/2'],
      ['bottom-right', 'bottom-pt-2']
    ] as const;

    posicoes.forEach(([position, expected]) => {
      expect(buildToastContainerClasses({ position }).container).toContain(
        expected
      );
    });
  });

  it('deixa a pagina clicavel ao redor da pilha', () => {
    const classes = buildToastContainerClasses({});

    expect(classes.container).toContain('pointer-events-none');
    expect(classes.item).toContain('pointer-events-auto');
  });
});

describe('PtToastContainer', () => {
  it('comeca sem toasts na tela', () => {
    expect(items(mountContainer())).toHaveLength(0);
  });

  it('renderiza os toasts disparados pelo composable', async () => {
    const wrapper = mountContainer();

    toast.positive({ title: 'Aposta registrada', description: 'Bilhete 4821' });
    await wrapper.vm.$nextTick();

    expect(items(wrapper)).toHaveLength(1);
    expect(wrapper.text()).toContain('Aposta registrada');
    expect(wrapper.text()).toContain('Bilhete 4821');
    expect(items(wrapper)[0].attributes('data-pt-toast-status')).toBe(
      'positive'
    );
  });

  it('mantem a ordem da fila', async () => {
    const wrapper = mountContainer();

    toast.info('Primeiro');
    toast.negative('Segundo');
    await wrapper.vm.$nextTick();

    expect(
      items(wrapper).map((item) => item.attributes('data-pt-toast-status'))
    ).toEqual(['info', 'negative']);
  });

  it('remove o toast no clique do botao de fechar', async () => {
    const wrapper = mountContainer();

    toast.info('Some no clique');
    await wrapper.vm.$nextTick();

    await wrapper.find('[data-pt-toast-close]').trigger('click');

    expect(items(wrapper)).toHaveLength(0);
    expect(toast.toasts.value).toHaveLength(0);
  });

  it('some da tela quando a duracao acaba', async () => {
    const wrapper = mountContainer();

    toast.info({ title: 'Temporario', duration: 1000 });
    await wrapper.vm.$nextTick();
    expect(items(wrapper)).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(items(wrapper)).toHaveLength(0);
  });

  it('congela a contagem enquanto o ponteiro esta sobre a pilha', async () => {
    const wrapper = mountContainer();

    toast.info({ title: 'Pausado', duration: 1000 });
    await wrapper.vm.$nextTick();

    await wrapper.find('[data-pt-toast-container]').trigger('mouseenter');
    vi.advanceTimersByTime(5000);
    await wrapper.vm.$nextTick();

    expect(items(wrapper)).toHaveLength(1);

    await wrapper.find('[data-pt-toast-container]').trigger('mouseleave');
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(items(wrapper)).toHaveLength(0);
  });

  it('nao congela quando pauseOnHover e false', async () => {
    const wrapper = mountContainer({ pauseOnHover: false });

    toast.info({ title: 'Segue contando', duration: 1000 });
    await wrapper.vm.$nextTick();

    await wrapper.find('[data-pt-toast-container]').trigger('mouseenter');
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(items(wrapper)).toHaveLength(0);
  });

  it('aplica posicao, gap e className', () => {
    const wrapper = mountContainer({
      position: 'bottom-center',
      gap: 3,
      className: 'pilha-x'
    });
    const container = wrapper.find('[data-pt-toast-container]');

    expect(container.classes()).toContain('flex-col-reverse');
    expect(container.classes()).toContain('bottom-pt-2');
    expect(container.classes()).toContain('gap-pt-3');
    expect(container.classes()).toContain('pilha-x');
  });

  it('expoe a regiao de avisos', () => {
    const wrapper = mountContainer({ ariaLabel: 'Feedback da aposta' });
    const container = wrapper.find('[data-pt-toast-container]');

    expect(container.attributes('role')).toBe('region');
    expect(container.attributes('aria-label')).toBe('Feedback da aposta');
  });

  it('reaplica o tema do provider onde o container esta declarado', () => {
    const wrapper = mount({
      components: { PtThemeProvider, PtToastContainer },
      template: `
        <PtThemeProvider theme="dark">
          <PtToastContainer :to="false" />
        </PtThemeProvider>
      `
    });

    expect(
      wrapper.find('[data-pt-toast-container]').attributes('data-theme')
    ).toBe('dark');
  });
});
