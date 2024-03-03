'use client';
import { ListbooksProps } from '@/type/book';
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const ListBooksCard = ({ books, link, web }: ListbooksProps) => {
  return (
    <Box padding={4}>
      <ImageList
        sx={{
          gridAutoFlow: 'column',
          gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr)) !important',
          gridAutoColumns: 'minmax(160px, 1fr)',
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
              <ImageListItem>
                <Image
                  src={book.img}
                  width={150}
                  height={200}
                  alt={book.name}
                />
                <ImageListItemBar title={book.name} subtitle={book.name} />
              </ImageListItem>
            </Link>
          </Box>
        ))}
      </ImageList>
    </Box>
  );
};

export default ListBooksCard;
