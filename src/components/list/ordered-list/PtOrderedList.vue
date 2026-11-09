<script setup lang="ts">
import { useListContainer } from '../../../composables';

import type { PtOrderedListProps } from '../PtList.interface';
import { buildOrderedListClasses } from '../stylePtList';

defineOptions({ name: 'PtOrderedList', inheritAttrs: false });

const props = withDefaults(defineProps<PtOrderedListProps>(), {
  dense: false,
  orientation: 'vertical',
  className: ''
});

const { wrapperClass, wrapperStyle, listAttrs } = useListContainer(
  props,
  buildOrderedListClasses
);
</script>

<template>
  <ol :class="wrapperClass" :style="wrapperStyle" v-bind="listAttrs">
    <slot />
  </ol>
</template>
