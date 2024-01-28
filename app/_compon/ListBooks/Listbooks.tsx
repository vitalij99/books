'use client';
import { Link, Typography } from '@mui/material';
import Loading from '../Loading/Loading';

interface Book {
  name: string;
  book: string;
  web: string;
}
interface ListbooksProps {
  books: Book[];
}
export const Listbooks = ({ books }: ListbooksProps) => {
  return (
    <>
      {books ? (
        books.map((book, index) => (
          <Link key={index} href={`/books/${book.book}?web=${book.web}`}>
            <Typography>{book.name}</Typography>
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};