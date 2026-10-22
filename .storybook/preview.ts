import type { Preview } from '@storybook/react';

import { WithProviders } from './withProviders';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    react: {
      strictMode: false,
    },
    a11y: {
      context: '#storybook-root',
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
        },
      },
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Toggle between light/dark themes',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },

  decorators: [WithProviders],
};

export default preview;
