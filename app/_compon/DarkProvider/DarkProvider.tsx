'use client';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React from 'react';

const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default DarkProvider;
