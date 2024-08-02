'use client';

import React from 'react';

export const ReaderContext = React.createContext({
  handleOpen: (toggle?: boolean) => {},
  isOpern: false,
});

const ReaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpern, setIsOpern] = React.useState(false);

  const handleOpen = (toggle = true) => {
    setIsOpern(toggle);
  };

  return (
    <ReaderContext.Provider
      value={{
        handleOpen,
        isOpern,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};

export default ReaderProvider;
