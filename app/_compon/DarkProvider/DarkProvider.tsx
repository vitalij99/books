'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default DarkProvider;
