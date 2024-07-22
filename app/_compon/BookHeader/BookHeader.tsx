'use client';
import { useEffect, useState } from 'react';

import BookMenu from '@/app/_compon/BookMenu/BookMenu';
import SaveBook from '@/app/_compon/SaveBook/SaveBook';

const BookHeader = () => {
  const [isBooksPath, setIsBooksPath] = useState(false);

  useEffect(() => {
    const pathname = document.location.pathname;
    setIsBooksPath(pathname.startsWith('/books'));
  }, []);

  if (!isBooksPath) {
    return <></>;
  }
  return (
    <>
      <SaveBook />
      <BookMenu />
    </>
  );
};

export default BookHeader;
