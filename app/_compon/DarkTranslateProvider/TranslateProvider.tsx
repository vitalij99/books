'use client';

import { setStorage } from '@/lib/getStorage';
import { AllowedKeys } from '@/types/book';

import React, { createContext } from 'react';

export const TranslateContext = createContext({
  handleTranslate: (isTranslate: boolean) => {},
  translate: false,
});

const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const [translate, setTranslate] = React.useState(false);

  const handleTranslate = (isTranslate: boolean) => {
    setTranslate(isTranslate);
    const storageValue = isTranslate + '';
    setStorage(storageValue, AllowedKeys.Translate);
  };

  return (
    <TranslateContext.Provider
      value={{
        handleTranslate,
        translate,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
