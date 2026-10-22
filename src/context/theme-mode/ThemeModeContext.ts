import { createContext } from 'react';

import type { ThemeModeContextType } from './ThemeMode.types';

export const ThemeModeContext = createContext<ThemeModeContextType | null>(null);
