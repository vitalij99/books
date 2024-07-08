'use client';

import BookMenu from '@/app/_compon/BookMenu/BookMenu';
import { useEffect, useState } from 'react';

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
      <BookMenu />
    </>
  );
};

export default BookHeader;
