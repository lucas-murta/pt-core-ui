import type { Meta, StoryObj } from '@storybook/vue3';

import PtAvatar from './PtAvatar.vue';
import { ptAvatarLetterColors } from './stylePtAvatar';

const svgImage = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/** Retrato cheio: mostra o recorte do `fit="cover"`. */
const photo = svgImage(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <rect width="160" height="160" fill="#2563eb"/>
    <circle cx="80" cy="62" r="30" fill="#dbeafe"/>
    <path d="M20 160c0-33 27-60 60-60s60 27 60 60z" fill="#dbeafe"/>
  </svg>`
);

/** Emblema vazado: fundo transparente, pede `fit="contain"`. */
const badge = svgImage(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <path d="M80 12l58 22v46c0 38-25 60-58 68-33-8-58-30-58-68V34z" fill="none" stroke="#16a34a" stroke-width="9"/>
    <circle cx="80" cy="82" r="24" fill="none" stroke="#16a34a" stroke-width="9"/>
    <path d="M56 82h48" stroke="#16a34a" stroke-width="9"/>
  </svg>`
);

const colorOptions = [
  'blue',
  'ocean',
  'green',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple'
] as const;

const meta = {
  title: 'Components/PtAvatar',
  component: PtAvatar,
  tags: ['autodocs'],
  args: {
    name: 'Arthur Morgan',
    src: '',
    alt: '',
    size: 'medium',
    fit: 'cover',
    color: undefined,
    className: ''
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    fit: {
      control: 'radio',
      options: ['cover', 'contain']
    },
    color: {
      control: 'select',
      options: [undefined, ...colorOptions]
    },
    name: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' }
  },
  render: (args) => ({
    components: { PtAvatar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-pt-2 p-pt-3">
        <PtAvatar v-bind="args" />
        <span class="text-pt-body-small text-pt-content-default">
          Sem imagem o avatar monta as iniciais e a cor a partir do nome.
        </span>
      </div>
    `
  })
} satisfies Meta<typeof PtAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { PtAvatar },
    setup() {
      return { photo };
    },
    template: `
      <div class="flex flex-col gap-pt-3 p-pt-3">
        <div class="flex items-center gap-pt-2">
          <PtAvatar size="small" name="Arthur Morgan" />
          <PtAvatar size="medium" name="Arthur Morgan" />
          <PtAvatar size="large" name="Arthur Morgan" />
        </div>
        <div class="flex items-center gap-pt-2">
          <PtAvatar size="small" :src="photo" name="Sadie Adler" />
          <PtAvatar size="medium" :src="photo" name="Sadie Adler" />
          <PtAvatar size="large" :src="photo" name="Sadie Adler" />
        </div>
      </div>
    `
  })
};

export const WithImage: Story = {
  render: () => ({
    components: { PtAvatar },
    setup() {
      return { photo };
    },
    template: `
      <div class="flex items-center gap-pt-2 p-pt-3">
        <PtAvatar :src="photo" name="Sadie Adler" size="large" />
      </div>
    `
  })
};

export const CutoutImage: Story = {
  name: 'Imagem vazada (emblema)',
  render: () => ({
    components: { PtAvatar },
    setup() {
      return { badge, photo };
    },
    template: `
      <div class="flex flex-col gap-pt-3 p-pt-3">
        <div class="flex items-center gap-pt-2">
          <PtAvatar :src="badge" fit="contain" name="Van der Linde" size="small" />
          <PtAvatar :src="badge" fit="contain" name="Van der Linde" size="medium" />
          <PtAvatar :src="badge" fit="contain" name="Van der Linde" size="large" />
        </div>
        <span class="text-pt-body-small text-pt-content-default">
          Com <code>fit="contain"</code> a imagem ganha respiro e uma superficie
          neutra; com <code>cover</code> ela preenche e e recortada.
        </span>
        <div class="flex items-center gap-pt-2">
          <PtAvatar :src="badge" fit="cover" name="Van der Linde" size="large" />
          <PtAvatar :src="photo" fit="contain" name="Sadie Adler" size="large" />
        </div>
      </div>
    `
  })
};

export const Initials: Story = {
  render: () => ({
    components: { PtAvatar },
    setup() {
      return {
        examples: [
          'Uncle',
          'Arthur Morgan',
          'Reverend Orville Swanson',
          'Dutch van der Linde'
        ]
      };
    },
    template: `
      <div class="flex flex-col gap-pt-2 p-pt-3">
        <div
          v-for="example in examples"
          :key="example"
          class="flex items-center gap-pt-2"
        >
          <PtAvatar :name="example" />
          <span class="text-pt-body-small text-pt-content-default">
            {{ example }}
          </span>
        </div>
      </div>
    `
  })
};

export const Palette: Story = {
  name: 'Cor fixa por inicial',
  render: () => ({
    components: { PtAvatar },
    setup() {
      return {
        letters: Object.entries(ptAvatarLetterColors).map(
          ([letter, color]) => ({ letter, color })
        )
      };
    },
    template: `
      <div class="flex flex-wrap gap-pt-2 p-pt-3">
        <div
          v-for="item in letters"
          :key="item.letter"
          class="flex w-pt-9 flex-col items-center gap-[4px]"
        >
          <PtAvatar :name="item.letter" />
          <span class="text-pt-xs text-pt-content-default">
            {{ item.color }}
          </span>
        </div>
      </div>
    `
  })
};

export const Fallbacks: Story = {
  render: () => ({
    components: { PtAvatar },
    template: `
      <div class="flex items-center gap-pt-3 p-pt-3">
        <div class="flex flex-col items-center gap-[4px]">
          <PtAvatar src="https://exemplo.invalido/foto.png" name="Sadie Adler" />
          <span class="text-pt-xs text-pt-content-default">imagem quebrada</span>
        </div>
        <div class="flex flex-col items-center gap-[4px]">
          <PtAvatar />
          <span class="text-pt-xs text-pt-content-default">sem nome</span>
        </div>
      </div>
    `
  })
};
