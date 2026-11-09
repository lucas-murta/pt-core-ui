<script setup lang="ts">
import {
  findIconDefinition,
  type IconName,
  type IconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, inject } from 'vue';

import type { PtIconLibrary, PtIconSize } from './PtIcon.interface';
import {
  ptIconRendererKey,
  toFontAwesomeLookup,
  toIconifyName
} from './resolveIconName';
import { buildIconClasses } from './stylePtIcon';

const props = withDefaults(
  defineProps<{
    name: string;
    lib?: PtIconLibrary;
    size?: PtIconSize;
    ariaLabel?: string;
    className?: string;
  }>(),
  {
    lib: 'fa',
    className: ''
  }
);

/**
 * Quando a aplicacao entrega um renderizador (o `Icon` do `@nuxt/icon`, por
 * exemplo), ele desenha o icone e o Font Awesome embutido fica de fora. Sem
 * renderizador, como no Storybook e nos testes, o Font Awesome segue valendo.
 */
const renderer = inject(ptIconRendererKey, null);

const classes = computed(() => buildIconClasses(props));

const iconifyName = computed(() => toIconifyName(props.name, props.lib));

const icon = computed<IconDefinition | undefined>(() => {
  if (renderer) return undefined;

  const lookup = toFontAwesomeLookup(props.name, props.lib);
  if (!lookup) return undefined;

  return (
    findIconDefinition({
      prefix: lookup.prefix,
      iconName: lookup.iconName as IconName
    }) ?? undefined
  );
});
</script>

<template>
  <span
    :class="classes.container"
    :aria-label="props.ariaLabel"
    v-bind="$attrs"
  >
    <component
      :is="renderer"
      v-if="renderer"
      :name="iconifyName"
      :class="classes.glyph"
      :aria-label="props.ariaLabel"
      data-pt-icon-renderer
    />
    <FontAwesomeIcon
      v-else-if="icon"
      :icon="icon"
      :class="classes.glyph"
      :aria-label="props.ariaLabel"
    />
  </span>
</template>
