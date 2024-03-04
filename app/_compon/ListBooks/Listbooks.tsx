'use client';
import { Box, Link, Pagination, Typography } from '@mui/material';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';

import { ListbooksLink, ListbooksProps } from '@/type/book';

const amountBook = 10;
export const Listbooks = ({ books, link, web }: ListbooksLink) => {
  const [corectBooks, setCorectBooks] = useState(books.slice(0, amountBook));
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    setCorectBooks(
      books.slice(
        (pagination - 1) * amountBook,
        pagination * amountBook + amountBook
      )
    );
  }, [books, pagination]);

  const handlePagination = (even: any, page: number) => {
    setPagination(page);
  };

  if (books.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <Box padding={3}>
        <Pagination
          onChange={handlePagination}
          count={Math.floor(books.length / amountBook)}
        />
      </Box>
      <Box width={400} padding={3}>
        {corectBooks.map((book, index) => (
          <Link
            key={index}
            href={
              link
                ? `/books/${link}/${book.book}?web=${web}`
                : `/books/${book.book}?web=${web}`
            }
          >
            <Typography paddingTop={1}>{book.name}</Typography>
          </Link>
        ))}
      </Box>
    </>
  );
};
