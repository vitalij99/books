'use client';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import React, { createContext } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );

  const toggleColorMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
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
