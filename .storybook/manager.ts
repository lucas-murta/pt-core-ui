import { addons } from '@storybook/manager-api';
import brandImage from './pt-core-ui.svg';
import { createStorybookTheme } from './storybook-theme';

import './manager.css';
import '../src/css/tokens.css';

addons.setConfig({
  theme: createStorybookTheme({ brandImage })
});
