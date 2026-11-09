import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import PtToast from './PtToast.vue';
import {
  buildToastClasses,
  resolveToastIcon,
  resolveToastRole
} from './stylePtToast';

const mountToast = (props: Record<string, unknown> = {}, options = {}) =>
  mount(PtToast, {
    props: { title: 'Aposta registrada', ...props },
    ...options
  });

const close = (wrapper: ReturnType<typeof mountToast>) =>
  wrapper.find('[data-pt-toast-close]');

describe('stylePtToast', () => {
  it('tem largura fixa de pt-48 e altura livre', () => {
    const { container } = buildToastClasses({});

    expect(container).toContain('w-pt-48');
    expect(container).toContain('max-w-full');
    expect(container).not.toMatch(/\bh-/);
  });

  it('centraliza icone e fechar na primeira linha do titulo', () => {
    // icone de 16px na linha de 28px do titulo -> (28 - 16) / 2
    const { icon, close } = buildToastClasses({});

    expect(icon).toContain('mt-[6px]');
    expect(close).toContain('mt-[6px]');
  });

  it('aplica a superficie, o acento e o conteudo de cada status', () => {
    const statuses = [
      [
        'info',
        'bg-pt-surface-info',
        'border-l-pt-content-info',
        'text-pt-content-info'
      ],
      [
        'system',
        'bg-pt-surface-system',
        'border-l-pt-content-system',
        'text-pt-content-system'
      ],
      [
        'warning',
        'bg-pt-surface-warning',
        'border-l-pt-content-warning',
        'text-pt-content-warning'
      ],
      [
        'positive',
        'bg-pt-surface-positive',
        'border-l-pt-content-positive',
        'text-pt-content-positive'
      ],
      [
        'negative',
        'bg-pt-surface-negative',
        'border-l-pt-content-negative',
        'text-pt-content-negative'
      ]
    ] as const;

    statuses.forEach(([status, surface, accent, content]) => {
      const classes = buildToastClasses({ status });

      expect(classes.container).toContain(surface);
      expect(classes.container).toContain(accent);
      expect(classes.title).toContain(content);
    });
  });

  it('resolve o icone padrao de cada status', () => {
    expect(resolveToastIcon()).toBe('circle-info');
    expect(resolveToastIcon('info')).toBe('circle-info');
    expect(resolveToastIcon('system')).toBe('gear');
    expect(resolveToastIcon('warning')).toBe('triangle-exclamation');
    expect(resolveToastIcon('positive')).toBe('circle-check');
    expect(resolveToastIcon('negative')).toBe('circle-xmark');
  });

  it('interrompe a leitura apenas em erro e aviso', () => {
    expect(resolveToastRole('negative')).toEqual({
      role: 'alert',
      ariaLive: 'assertive'
    });
    expect(resolveToastRole('warning')).toEqual({
      role: 'alert',
      ariaLive: 'assertive'
    });
    expect(resolveToastRole('info')).toEqual({
      role: 'status',
      ariaLive: 'polite'
    });
    expect(resolveToastRole('positive')).toEqual({
      role: 'status',
      ariaLive: 'polite'
    });
    expect(resolveToastRole('system')).toEqual({
      role: 'status',
      ariaLive: 'polite'
    });
  });
});

describe('PtToast', () => {
  it('renderiza titulo com status info por padrao', () => {
    const wrapper = mountToast();

    expect(wrapper.text()).toContain('Aposta registrada');
    expect(wrapper.attributes('data-pt-toast-status')).toBe('info');
    expect(wrapper.classes()).toContain('bg-pt-surface-info');
    expect(wrapper.classes()).toContain('w-pt-48');
  });

  it('renderiza a descricao apenas quando informada', () => {
    expect(mountToast().find('[data-pt-toast-description]').exists()).toBe(
      false
    );

    const comDescricao = mountToast({ description: 'Bilhete 4821' });

    expect(comDescricao.find('[data-pt-toast-description]').text()).toBe(
      'Bilhete 4821'
    );
  });

  it('aplica o status recebido', () => {
    const wrapper = mountToast({ status: 'negative' });

    expect(wrapper.attributes('data-pt-toast-status')).toBe('negative');
    expect(wrapper.classes()).toContain('bg-pt-surface-negative');
    expect(wrapper.attributes('role')).toBe('alert');
    expect(wrapper.attributes('aria-live')).toBe('assertive');
  });

  it('usa role status e aria-live polite nos demais', () => {
    const wrapper = mountToast({ status: 'positive' });

    expect(wrapper.attributes('role')).toBe('status');
    expect(wrapper.attributes('aria-live')).toBe('polite');
  });

  it('mostra o icone do status e permite sobrescrever', () => {
    expect(mountToast().find('[data-pt-toast-icon]').exists()).toBe(true);
    expect(
      mountToast({ hideIcon: true }).find('[data-pt-toast-icon]').exists()
    ).toBe(false);
    expect(
      mountToast({ icon: 'xmark' }).find('[data-pt-toast-icon]').exists()
    ).toBe(true);
  });

  it('emite close no botao de fechar', async () => {
    const wrapper = mountToast();

    await close(wrapper).trigger('click');

    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('esconde o botao de fechar com closable false', () => {
    expect(close(mountToast({ closable: false })).exists()).toBe(false);
  });

  it('rotula o botao de fechar', () => {
    expect(close(mountToast()).attributes('aria-label')).toBe('Fechar aviso');
    expect(
      close(mountToast({ closeAriaLabel: 'Dispensar' })).attributes(
        'aria-label'
      )
    ).toBe('Dispensar');
  });

  it('renderiza os slots default e action', () => {
    const wrapper = mountToast(
      {},
      {
        slots: {
          default: '<span class="extra">extra</span>',
          action: '<button class="acao">Ver bilhete</button>'
        }
      }
    );

    expect(wrapper.find('.extra').exists()).toBe(true);
    expect(wrapper.find('.acao').exists()).toBe(true);
  });

  it('anexa className e encaminha class, style e demais attrs', () => {
    const wrapper = mountToast(
      { className: 'custom-x' },
      { attrs: { class: 'attr-x', style: 'opacity: 0.5', 'data-id': 'abc' } }
    );

    expect(wrapper.classes()).toContain('custom-x');
    expect(wrapper.classes()).toContain('attr-x');
    expect(wrapper.attributes('style')).toContain('opacity: 0.5');
    expect(wrapper.attributes('data-id')).toBe('abc');
  });
});
