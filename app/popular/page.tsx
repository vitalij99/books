import React from 'react';
import ListBooksCard from '../_compon/ListBooksCard/ListBooksCard';
import Loading from '../_compon/Loading/Loading';
import { getBooksPopularAll } from '@/back';

const popular = async () => {
  const books = await getBooksPopularAll();

  if (!books) {
    return <Loading />;
  }
  return (
    <>
      <h3>popular</h3>
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
