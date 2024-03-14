'use client';
import { setCookies } from '@/lib/cookis';
import { setStorage } from '@/lib/getStorage';
import { AllowedKeys, THEME } from '@/type/book';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import React, { createContext, useMemo } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const TranslateContext = createContext({
  handleTranslate: (isTranslate: boolean) => {},
  translate: false,
});

const DarkTranslateProvider = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: RequestCookie;
}) => {
  const [translate, setTranslate] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    theme?.value === 'light' ? 'light' : 'dark'
  );
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
    setCookies(THEME, newMode);
  };
  const handleTranslate = (isTranslate: boolean) => {
    setTranslate(isTranslate);
    const storageValue = isTranslate + '';
    setStorage(storageValue, AllowedKeys.Translate);
  };
  const themeMode = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <TranslateContext.Provider
        value={{
          handleTranslate,
          translate,
        }}
      >
        <ThemeProvider theme={themeMode}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </TranslateContext.Provider>{' '}
    </ColorModeContext.Provider>
  );
};

export default DarkTranslateProvider;
