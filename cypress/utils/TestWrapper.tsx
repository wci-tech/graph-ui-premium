import { ThemeProvider, ThemesEnum, ThemesModeEnum } from '@wci-tech/core-ui-premium';
import type { ReactNode } from 'react';

interface TestWrapperProps {
  children: ReactNode;
}

export const TestWrapper = ({ children }: TestWrapperProps) => {
  return (
    <ThemeProvider selectedTheme={ThemesEnum.PRIMARY} mode={ThemesModeEnum.LIGHT}>
      {children}
    </ThemeProvider>
  );
};
