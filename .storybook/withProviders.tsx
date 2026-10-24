import type { Decorator } from '@storybook/react';

import { ThemesModeEnum } from '@wci-tech/core-ui-premium';

import { ThemeModeProvider } from '../src/context/';

export const WithProviders: Decorator = (Story, context) => {
  const selectedTheme = context.globals.theme as 'light' | 'dark';
  const mode = selectedTheme === 'dark' ? ThemesModeEnum.DARK : ThemesModeEnum.LIGHT;

  return (
    <ThemeModeProvider mode={mode}>
      <Story />
    </ThemeModeProvider>
  );
};
