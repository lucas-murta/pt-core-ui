import { create } from '@storybook/theming/create';

type StorybookThemeConfig = {
  brandImage?: string;
};

const storybookDarkThemeValues = {
  surface2: '#171717',
  surface3: '#0a0a0a',
  border1: 'rgba(216, 207, 236, 0.24)',
  contentDefault: '#ecfdf5',
  contentBright: '#ffffff',
  contentSecondary: '#34d399'
} as const;

export const createStorybookTheme = ({
  brandImage
}: StorybookThemeConfig = {}) =>
  create({
    base: 'dark',
    colorPrimary: storybookDarkThemeValues.contentSecondary,
    colorSecondary: storybookDarkThemeValues.contentSecondary,
    appBg: storybookDarkThemeValues.surface2,
    appContentBg: storybookDarkThemeValues.surface3,
    appPreviewBg: storybookDarkThemeValues.surface3,
    appBorderColor: storybookDarkThemeValues.border1,
    appBorderRadius: 8,
    textColor: storybookDarkThemeValues.contentDefault,
    textInverseColor: storybookDarkThemeValues.contentBright,
    barTextColor: storybookDarkThemeValues.contentDefault,
    barSelectedColor: storybookDarkThemeValues.contentSecondary,
    barHoverColor: storybookDarkThemeValues.contentSecondary,
    barBg: storybookDarkThemeValues.surface2,
    inputBg: storybookDarkThemeValues.surface3,
    inputBorder: storybookDarkThemeValues.border1,
    inputTextColor: storybookDarkThemeValues.contentDefault,
    inputBorderRadius: 8,
    brandTitle: 'Pauta Core UI',
    ...(brandImage ? { brandImage } : {})
  });
