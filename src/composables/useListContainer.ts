import {
  computed,
  inject,
  normalizeClass,
  provide,
  reactive,
  useAttrs,
  watch
} from 'vue';

import type {
  PtListContextValue,
  PtListNavOrientation
} from '../components/list/PtList.interface';
import { ptListContextKey } from '../components/list/stylePtList';

type ListContainerProps = {
  className?: string;
  orientation?: PtListNavOrientation;
};

export const useListContainer = <T extends ListContainerProps>(
  props: T,
  buildClasses: (props: T, renderOrientation: PtListNavOrientation) => string
) => {
  const attrs = useAttrs();
  const parentContext = inject(ptListContextKey, null);

  const navOrientation = computed<PtListNavOrientation>(
    () => parentContext?.navOrientation ?? props.orientation ?? 'vertical'
  );
  const renderOrientation = computed<PtListNavOrientation>(() =>
    parentContext ? 'vertical' : navOrientation.value
  );
  const level = computed(() => (parentContext?.level ?? 0) + 1);

  const context = reactive<PtListContextValue>({
    navOrientation: navOrientation.value,
    level: level.value
  });

  watch(
    navOrientation,
    (nextOrientation) => {
      context.navOrientation = nextOrientation;
    },
    { immediate: true }
  );

  watch(
    level,
    (nextLevel) => {
      context.level = nextLevel;
    },
    { immediate: true }
  );

  provide(ptListContextKey, context);

  const classes = computed(() => buildClasses(props, renderOrientation.value));
  const wrapperClass = computed(() =>
    normalizeClass([classes.value, attrs.class])
  );
  const wrapperStyle = computed(() => attrs.style);

  const listAttrs = computed(() => {
    const next: Record<string, unknown> = { ...attrs };
    delete next.class;
    delete next.style;
    return next;
  });

  return {
    classes,
    wrapperClass,
    wrapperStyle,
    listAttrs
  };
};
