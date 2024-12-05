'use client';

import React from 'react';

export const ReaderContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleOpen: (toggle?: boolean) => {},
  isOpen: false,
});

const ReaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = (toggle = true) => {
    setIsOpen(toggle);
  };

  return (
    <ReaderContext.Provider
      value={{
        handleOpen,
        isOpen,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};

export default ReaderProvider;
