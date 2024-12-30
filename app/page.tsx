import React from 'react';

import { getBooksPopularAll } from '@/back';

import ListBooksCard from '@/app/_compon/ListBooksCard/ListBooksCard';

const popular = async () => {
  const books = await getBooksPopularAll();

  if (!books) {
    return null;
  }
  return (
    <>
      {books.map((website, index) => (
        <ListBooksCard
          key={website.web}
          books={website.books}
          web={website.web}
          firstPriority={index === 0 ? 2 : 0}
        />
      ))}
    </>
  );
};

export default popular;
