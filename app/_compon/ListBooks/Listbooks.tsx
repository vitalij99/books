'use client';
import { Link, Typography } from '@mui/material';
import Loading from '../Loading/Loading';

interface Book {
  name: string;
  href: string;
}
interface ListbooksProps {
  books: Book[];
}
export const Listbooks = ({ books }: ListbooksProps) => {
  return (
    <>
      {books ? (
        books.map((book, index) => (
          <Link key={index} href={book.href}>
            <Typography>{book.name}</Typography>
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};
