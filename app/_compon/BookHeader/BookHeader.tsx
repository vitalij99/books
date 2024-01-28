'use client';

import BookMenu from '../BookMenu/BookMenu';
import Reader from '../Reader/Reader';

const BookHeader = () => {
  const pathname = document.location.pathname;

  const isBooksPath = pathname.startsWith('/books/');

  if (!isBooksPath) {
    return <></>;
  }
  return (
    <>
      <Reader />
      <BookMenu />
    </>
  );
};

export default BookHeader;
