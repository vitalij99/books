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
      {books.map(website => (
        <ListBooksCard
          key={website.web}
          books={website.books}
          web={website.web}
        />
      ))}
    </>
  );
};

export default popular;
