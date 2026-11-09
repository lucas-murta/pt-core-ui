import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';

import PtThemeProvider from './PtThemeProvider.vue';
import PtButton from '../buttons/button/PtButton.vue';
import PtModal from '../modal/PtModal.vue';
import PtPaper from '../paper/PtPaper.vue';
import PtTypography from '../typography/PtTypography.vue';
import { useTheme } from '../../composables/useTheme';

const themeOptions = ['inherit', 'light', 'dark', 'system'] as const;

const meta = {
  title: 'Components/PtThemeProvider',
  component: PtThemeProvider,
  tags: ['autodocs'],
  args: {
    theme: 'dark',
    as: 'div',
    root: false,
    inline: false,
    className: ''
  },
  argTypes: {
    theme: {
      control: 'select',
      options: themeOptions
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article']
    },
    root: {
      control: 'boolean'
    },
    inline: {
      control: 'boolean'
    },
    className: {
      control: 'text'
    }
  }
} satisfies Meta<typeof PtThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { PtThemeProvider, PtPaper, PtTypography },
    setup() {
      return { args };
    },
    template: `
      <PtThemeProvider v-bind="args">
        <PtPaper variant="surface-1" padding="3">
          <PtTypography as="h3" variant="heading-4">
            Superficie no tema {{ args.theme }}
          </PtTypography>
          <PtTypography variant="body-medium">
            Os tokens vem do escopo criado pelo provider, nao do documento.
          </PtTypography>
        </PtPaper>
      </PtThemeProvider>
    `
  })
};

export const IlhasAninhadas: Story = {
  name: 'Ilhas aninhadas',
  render: () => ({
    components: { PtThemeProvider, PtPaper, PtTypography },
    template: `
      <PtThemeProvider theme="dark">
        <PtPaper variant="surface-1" padding="3">
          <PtTypography as="h3" variant="heading-4">Escopo escuro</PtTypography>

          <PtThemeProvider theme="light">
            <PtPaper variant="surface-1" padding="3" margin="1 0">
              <PtTypography as="h4" variant="body-large">
                Ilha clara dentro do escuro
              </PtTypography>

              <PtThemeProvider theme="dark">
                <PtPaper variant="surface-1" padding="3" margin="1 0">
                  <PtTypography variant="body-medium">
                    E outra ilha escura dentro da clara
                  </PtTypography>
                </PtPaper>
              </PtThemeProvider>
            </PtPaper>
          </PtThemeProvider>
        </PtPaper>
      </PtThemeProvider>
    `
  })
};

export const PreferenciaDoSistema: Story = {
  name: 'Preferencia do sistema',
  render: () => ({
    components: { PtThemeProvider, PtPaper, PtTypography },
    template: `
      <PtThemeProvider theme="system">
        <PtPaper variant="surface-1" padding="3">
          <PtTypography variant="body-medium">
            Segue o prefers-color-scheme do sistema operacional.
          </PtTypography>
        </PtPaper>
      </PtThemeProvider>
    `
  })
};

const ThemeSwitch = {
  name: 'ThemeSwitch',
  components: { PtButton, PtTypography },
  setup() {
    const { resolvedTheme, toggle } = useTheme();

    return { resolvedTheme, toggle };
  },
  template: `
    <div>
      <PtTypography variant="body-medium">
        Tema atual: {{ resolvedTheme }}
      </PtTypography>
      <PtButton variant="solid" color="primary" size="small" @click="toggle">
        Alternar tema
      </PtButton>
    </div>
  `
};

export const ConteudoTeleportado: Story = {
  name: 'Conteudo teleportado',
  render: () => ({
    components: { PtThemeProvider, PtButton, PtModal, PtPaper, PtTypography },
    setup() {
      const open = ref(false);

      return { open };
    },
    template: `
      <PtThemeProvider theme="dark">
        <PtPaper variant="surface-1" padding="3">
          <PtTypography as="h3" variant="heading-4">App escuro</PtTypography>

          <PtThemeProvider theme="light">
            <PtPaper variant="surface-1" padding="3" margin="1 0">
              <PtTypography variant="body-medium">
                O modal e declarado nesta ilha clara e teleportado para o body.
              </PtTypography>
              <PtButton
                variant="solid"
                color="primary"
                size="small"
                @click="open = true"
              >
                Abrir modal
              </PtButton>

              <PtModal
                :open="open"
                show-close-button
                close-on-outside-click
                width="64"
                padding="4"
                @update:open="open = $event"
              >
                <PtTypography variant="body-medium">
                  Teleportado para o body, mas ainda no tema da ilha.
                </PtTypography>
              </PtModal>
            </PtPaper>
          </PtThemeProvider>
        </PtPaper>
      </PtThemeProvider>
    `
  })
};

export const AlternandoComUseTheme: Story = {
  name: 'Alternando com useTheme',
  render: () => ({
    components: { PtThemeProvider, PtPaper, ThemeSwitch },
    template: `
      <PtThemeProvider theme="light">
        <PtPaper variant="surface-1" padding="3">
          <ThemeSwitch />
        </PtPaper>
      </PtThemeProvider>
    `
  })
};
