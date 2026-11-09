<script setup lang="ts">
import { useListContainer } from '../../../composables';

import type { PtUnorderedListProps } from '../PtList.interface';
import { buildUnorderedListClasses } from '../stylePtList';

defineOptions({ name: 'PtUnorderedList', inheritAttrs: false });

const props = withDefaults(defineProps<PtUnorderedListProps>(), {
  dense: false,
  orientation: 'vertical',
  className: ''
});

const { wrapperClass, wrapperStyle, listAttrs } = useListContainer(
  props,
  buildUnorderedListClasses
);
</script>

<template>
  <ul :class="wrapperClass" :style="wrapperStyle" v-bind="listAttrs">
    <slot />
  </ul>
</template>
