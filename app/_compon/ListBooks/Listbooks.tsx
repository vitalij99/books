'use client';
import { Box, Link, Pagination, Typography } from '@mui/material';

import { useEffect, useState } from 'react';

import { ListBooksLinkProps } from '@/types/book';
import Loading from '@/app/_compon/Loading/Loading';
import ItemList from '@/app/_compon/ItemList/ItemList';

import BookInfo from '@/app/_compon/BookInfo/BookInfo';

const amountBook = 10;
export const Listbooks = ({
  books,
  link,
  web,
  bookInfo,
}: ListBooksLinkProps) => {
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
    <Box padding={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <BookInfo bookInfo={bookInfo} />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            onChange={handlePagination}
            page={pagination}
            count={Math.floor(books.length / amountBook)}
          />
        </Box>
        <Box>
          <ItemList
            items={corectBooks}
            renderItem={book => (
              <Link
                href={
                  link
                    ? `/books/${link}/${book.book}?web=${web}`
                    : `/books/${book.book}?web=${web}`
                }
              >
                <Typography sx={{ textAlign: 'center', marginTop: 1 }}>
                  {book.name}
                </Typography>
              </Link>
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 1 }}>
          <Pagination
            onChange={handlePagination}
            count={Math.floor(books.length / amountBook)}
            page={pagination}
          />
        </Box>
      </Box>
    </Box>
  );
};
