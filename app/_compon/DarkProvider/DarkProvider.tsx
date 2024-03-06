'use client';
import { getStorage, setStorage } from '@/lib/getStorage';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import React, { createContext } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const storageMode = getStorage('darkmode');
  const defaultMode =
    storageMode !== '' ? storageMode === 'dark' : prefersDarkMode;

  const [mode, setMode] = React.useState<'light' | 'dark'>(
    defaultMode ? 'dark' : 'light'
  );

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
