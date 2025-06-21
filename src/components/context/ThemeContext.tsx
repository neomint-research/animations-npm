/**
 * @neomint/animations - Theme Context Provider
 * 
 * Standalone theme context for applications that only need theme management
 * without the full network context.
 * 
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NetworkTheme, ThemePreset, ThemeMode } from '../types';
import { THEME_PRESETS } from '../constants';

interface ThemeContextValue {
  theme: NetworkTheme;
  mode: ThemeMode;
  setTheme: (theme: NetworkTheme | ThemePreset) => void;
  setMode: (mode: ThemeMode) => void;
  availablePresets: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: NetworkTheme | ThemePreset;
  initialMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  initialTheme = 'default',
  initialMode = 'auto'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<NetworkTheme>(
    typeof initialTheme === 'string' ? THEME_PRESETS[initialTheme] : initialTheme
  );
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  
  const setTheme = useCallback((newTheme: NetworkTheme | ThemePreset) => {
    if (typeof newTheme === 'string') {
      setThemeState(THEME_PRESETS[newTheme]);
    } else {
      setThemeState(newTheme);
    }
  }, []);
  
  const contextValue: ThemeContextValue = {
    theme,
    mode,
    setTheme,
    setMode,
    availablePresets: Object.keys(THEME_PRESETS) as ThemePreset[]
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
