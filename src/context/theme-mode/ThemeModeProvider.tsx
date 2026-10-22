'use client';

import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { ThemeProvider, ThemesEnum, ThemesModeEnum } from '@wci-tech/core-ui-premium';

import { ThemeModeContext } from './ThemeModeContext';

const STORAGE_KEY = 'raspberry-ui-theme';

interface ThemeModeProviderProps {
  children: ReactNode;
  mode?: ThemesModeEnum;
}

export const ThemeModeProvider = ({ children, mode: controlledMode }: ThemeModeProviderProps) => {
  const [mode, setMode] = useState<ThemesModeEnum>(controlledMode ?? ThemesModeEnum.LIGHT);

  useEffect(() => {
    if (controlledMode) {
      setMode(controlledMode);
      return;
    }

    const savedMode = localStorage.getItem(STORAGE_KEY) as ThemesModeEnum;

    if (savedMode && Object.values(ThemesModeEnum).includes(savedMode)) {
      setMode(savedMode);
    }
  }, [controlledMode]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      mode === ThemesModeEnum.DARK ? 'dark' : 'light',
    );
  }, [mode]);

  const toggleTheme = useCallback(
    (checked: boolean) => {
      const newMode = checked ? ThemesModeEnum.DARK : ThemesModeEnum.LIGHT;

      setMode(newMode);

      if (!controlledMode) {
        localStorage.setItem(STORAGE_KEY, newMode);
      }
    },
    [controlledMode],
  );

  return (
    <ThemeProvider mode={mode} selectedTheme={ThemesEnum.PRIMARY}>
      <ThemeModeContext.Provider
        value={{
          isDark: mode === ThemesModeEnum.DARK,
          mode,
          toggleTheme,
        }}
      >
        {children}
      </ThemeModeContext.Provider>
    </ThemeProvider>
  );
};
