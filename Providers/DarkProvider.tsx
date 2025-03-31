'use client';
import { setCookies } from '@/lib/cookis';

import {
  initTextStyled,
  InitTextStyledKeys,
  InitTextStyledType,
  MENUSTYLEDTEXT,
  THEME,
} from '@/types/book';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import React, { createContext, useMemo } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  toggleStyleText: (_key: InitTextStyledKeys, _value: string) => {},
  mode: 'light',
  styleText: initTextStyled,
});

const DarkProvider = ({
  children,
  theme,
  styleTextCookie,
}: {
  children: React.ReactNode;
  theme?: RequestCookie;
  styleTextCookie?: RequestCookie;
}) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    theme?.value === 'light' ? 'light' : 'dark'
  );
  const [styleText, setStyleText] = React.useState<InitTextStyledType>(
    styleTextCookie?.value ? JSON.parse(styleTextCookie.value) : initTextStyled
  );

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
    setCookies(THEME, newMode);
  };
  const toggleStyleText = (key: InitTextStyledKeys, value: string) => {
    const updateValue = { ...styleText, [key]: value };

    setStyleText(updateValue);
    setCookies(MENUSTYLEDTEXT, JSON.stringify(updateValue));
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
    <ColorModeContext.Provider
      value={{ toggleColorMode, mode, styleText, toggleStyleText }}
    >
      <ThemeProvider theme={themeMode}>
        {/* <CssBaseline /> */}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkProvider;
