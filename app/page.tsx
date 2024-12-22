import React from 'react';

import { getBooksPopularAll } from '@/back';
import Loader from '@/app/_compon/Loader/Loader';
import ListBooksCard from '@/app/_compon/ListBooksCard/ListBooksCard';

const popular = async () => {
  const books = await getBooksPopularAll();

  if (!books) {
    return <Loader />;
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
