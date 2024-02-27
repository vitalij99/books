'use client';

import { useEffect, useState } from 'react';
import BookMenu from '../BookMenu/BookMenu';

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
