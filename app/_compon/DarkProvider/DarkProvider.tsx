'use client';
import { getStorage, setStorage } from '@/lib/getStorage';
import { AllowedKeys } from '@/type/book';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';

import React, { createContext, useEffect } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const TranslateContext = createContext({
  handleTranslate: (isTranslate: boolean) => {},
  translate: false,
});

const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [translate, setTranslate] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );

  useEffect(() => {
    const storageMode = getStorage('darkmode');
    const defaultMode =
      storageMode !== '' ? storageMode === 'dark' : prefersDarkMode;
    setMode(defaultMode ? 'dark' : 'light');

    const isTranslate =
      getStorage(AllowedKeys.Translate) === 'true' ? true : false;

    handleTranslate(isTranslate);
  }, [prefersDarkMode]);

  const toggleColorMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    setStorage(mode === 'light' ? 'dark' : 'light', 'darkmode');
  };
  const handleTranslate = (isTranslate: boolean) => {
    console.log(isTranslate);
    setTranslate(isTranslate);
    const storageValue = isTranslate + '';
    setStorage(storageValue, AllowedKeys.Translate);
  };
  const theme = React.useMemo(
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </TranslateContext.Provider>
    </ColorModeContext.Provider>
  );
};

export default DarkProvider;
