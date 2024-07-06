'use client';
import { setCookies } from '@/lib/cookis';

import { THEME } from '@/types/book';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import React, { createContext, useMemo } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const DarkProvider = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: RequestCookie;
}) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    theme?.value === 'light' ? 'light' : 'dark'
  );

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
    setCookies(THEME, newMode);
  };

  const themeMode = useMemo(
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
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkProvider;
