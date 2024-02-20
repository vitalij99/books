'use client';
import { Link, Typography } from '@mui/material';
import Loading from '../Loading/Loading';

interface Book {
  name: string;
  book: string;
}
interface ListbooksProps {
  books: Book[];
  link?: string;
  web?: string;
}
export const Listbooks = ({ books, link, web }: ListbooksProps) => {
  return (
    <>
      {books ? (
        books.map((book, index) => (
          <Link
            key={index}
            href={
              link
                ? `/books/${link}/${book.book}?web=${web}`
                : `/books/${book.book}?web=${web}`
            }
          >
            <Typography>{book.name}</Typography>
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};
