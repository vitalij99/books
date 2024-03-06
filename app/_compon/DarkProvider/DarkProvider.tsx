'use client';
import { getStorage, setStorage } from '@/lib/getStorage';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import React, { createContext, useEffect } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );

  useEffect(() => {
    const storageMode = getStorage('darkmode');
    const defaultMode =
      storageMode !== '' ? storageMode === 'dark' : prefersDarkMode;
    setMode(defaultMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const toggleColorMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    setStorage(mode === 'light' ? 'dark' : 'light', 'darkmode');
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkProvider;
