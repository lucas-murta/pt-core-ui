import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref
} from 'vue';

import type {
  ActiveBreakpoints,
  ResponsiveValue,
  PtBreakpoint
} from '../types/responsive';

export const ptBreakpointMinWidths: Record<PtBreakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024
};

export const ptBreakpointOrder: PtBreakpoint[] = ['sm', 'md', 'lg'];

export const createInactiveBreakpoints = (): ActiveBreakpoints => ({
  sm: false,
  md: false,
  lg: false
});

export const resolveResponsiveValue = <T>(
  value: ResponsiveValue<T>,
  active: ActiveBreakpoints
): T => {
  let resolved = value.base;

  for (const breakpoint of ptBreakpointOrder) {
    const candidate = value[breakpoint];

    if (active[breakpoint] && candidate !== undefined) {
      resolved = candidate;
    }
  }

  return resolved;
};

export const toResponsiveValue = <T>(
  base: T,
  overrides: Partial<Record<PtBreakpoint, T | undefined>>
): ResponsiveValue<T> => ({
  base,
  sm: overrides.sm,
  md: overrides.md,
  lg: overrides.lg
});

export const useActiveBreakpoints = (): Ref<ActiveBreakpoints> => {
  const active = ref<ActiveBreakpoints>(createInactiveBreakpoints());
  const disposers: (() => void)[] = [];

  const setBreakpoint = (breakpoint: PtBreakpoint, matches: boolean) => {
    if (active.value[breakpoint] === matches) return;

    active.value = { ...active.value, [breakpoint]: matches };
  };

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    for (const breakpoint of ptBreakpointOrder) {
      const query = window.matchMedia(
        `(min-width: ${ptBreakpointMinWidths[breakpoint]}px)`
      );

      setBreakpoint(breakpoint, query.matches);

      const listener = (event: MediaQueryListEvent) =>
        setBreakpoint(breakpoint, event.matches);

      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', listener);
        disposers.push(() => query.removeEventListener('change', listener));
      }
    }
  });

  onBeforeUnmount(() => {
    for (const dispose of disposers) dispose();
    disposers.length = 0;
  });

  return active;
};

export const useResponsiveValue = <T>(
  source: MaybeRefOrGetter<ResponsiveValue<T>>,
  active: Ref<ActiveBreakpoints>
): ComputedRef<T> =>
  computed(() => resolveResponsiveValue(toValue(source), active.value));
