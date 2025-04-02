'use client';
import theme from '@/app/thema';
import { setCookies } from '@/lib/cookis';

import {
  initTextStyled,
  InitTextStyledKeys,
  InitTextStyledType,
  MENUSTYLEDTEXT,
} from '@/types/book';

import { ThemeProvider } from '@mui/material';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import React, { createContext } from 'react';

export const ColorModeContext = createContext({
  toggleStyleText: (_key: InitTextStyledKeys, _value: string) => {},
  styleText: initTextStyled,
});

const DarkProvider = ({
  children,
  styleTextCookie,
}: {
  children: React.ReactNode;
  theme?: RequestCookie;
  styleTextCookie?: RequestCookie;
}) => {
  const [styleText, setStyleText] = React.useState<InitTextStyledType>(
    styleTextCookie?.value ? JSON.parse(styleTextCookie.value) : initTextStyled
  );

  const toggleStyleText = (key: InitTextStyledKeys, value: string) => {
    const updateValue = { ...styleText, [key]: value };

    setStyleText(updateValue);
    setCookies(MENUSTYLEDTEXT, JSON.stringify(updateValue));
  };

  return (
    <ColorModeContext.Provider value={{ styleText, toggleStyleText }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkProvider;
