'use client';
import { ListbooksProps } from '@/types/book';
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const ListBooksCard = ({ books, web }: ListbooksProps) => {
  return (
    <Box padding={4}>
      <Typography>{web}</Typography>
      {books.length > 0 ? (
        <ImageList
          sx={{
            gridAutoFlow: 'column',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px)) !important',
            gridAutoColumns: 'minmax(200px)',
            overflow: 'auto',
          }}
        >
          {books.map((book, index) => (
            <Box
              key={index}
              sx={{
                display: 'inline-block',
                p: 2,
              }}
            >
              <Link href={`/books/${book.book}?web=${web}`}>
                <ImageListItem>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '200px',
                      height: '250px',
                    }}
                  >
                    <Image src={book.img} fill sizes="300px" alt={book.name} />
                    <ImageListItemBar title={book.name} subtitle={book.name} />
                  </Box>
                </ImageListItem>
              </Link>
            </Box>
          ))}
        </ImageList>
      ) : (
        <>немає</>
      )}
    </Box>
  );
};

export default ListBooksCard;
