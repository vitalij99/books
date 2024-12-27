'use client';

import { getStorage, setStorage } from '@/lib/getStorage';
import { AllowedKeys } from '@/types/book';

import React, { createContext, useEffect } from 'react';

export const TranslateContext = createContext({
  handleTranslate: (_isTranslate: boolean) => {},
  translate: false,
});

const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const [translate, setTranslate] = React.useState(false);

  useEffect(() => {
    const data = getStorage(AllowedKeys.Translate);
    const result = data === 'true' ? true : false;
    setTranslate(result);
  }, []);

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
