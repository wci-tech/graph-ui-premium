import type { ThemesModeEnum } from '@wci-tech/core-ui-premium';

export interface ThemeModeContextType {
  isDark: boolean;
  mode: ThemesModeEnum;
  toggleTheme: (checked: boolean) => void;
}
