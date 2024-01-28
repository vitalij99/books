'use client';

import BookMenu from '../BookMenu/BookMenu';

const BookHeader = () => {
  const pathname = document.location.pathname;

  const isBooksPath = pathname.startsWith('/books/');

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
