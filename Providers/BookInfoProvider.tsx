'use client';

import { BookInfoType } from '@/types/book';

import React, { createContext, useState } from 'react';

export const BookInfoContext = createContext<{
  setBookInfoUpdate: (info: BookInfoType) => void;
  bookInfo: BookInfoType | undefined;
}>({
  setBookInfoUpdate: () => {},
  bookInfo: undefined,
});

const BookInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookInfo, setBookInfo] = useState<BookInfoType>();

  const setBookInfoUpdate = (info: BookInfoType) => {
    setBookInfo(info);
  };

  return (
    <BookInfoContext.Provider
      value={{
        setBookInfoUpdate,
        bookInfo,
      }}
    >
      {children}
    </BookInfoContext.Provider>
  );
};

export default BookInfoProvider;
