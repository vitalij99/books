'use client';
import { ListbooksProps } from '@/type/book';
import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';

const ListBooksCard = ({ books, link, web }: ListbooksProps) => {
  return (
    <Box padding={4}>
      <Box
        sx={{
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {books.map((book, index) => (
          <Box key={index} sx={{ display: 'inline-block', p: 2 }}>
            <Link
              href={
                link
                  ? `/books/${link}/${book.book}?web=${web}`
                  : `/books/${book.book}?web=${web}`
              }
            >
              <Image src={book.img} width={90} height={120} alt={book.name} />
              <Typography>{book.name}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListBooksCard;
