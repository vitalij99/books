'use client';
import ItemList from '@/app/_compon/ItemList/ItemList';
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
  if (books.length === 0) {
    return <Typography>немає</Typography>;
  }
  return (
    <Box padding={4}>
      <Typography>{web}</Typography>
      <ImageList
        sx={{
          gridAutoFlow: 'column',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px)) !important',
          gridAutoColumns: 'minmax(200px)',
          overflow: 'auto',
        }}
      >
        <ItemList
          items={books}
          renderItem={(book, index) => (
            <Box
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
                    <Image
                      priority={index < 4 ? true : false}
                      src={book.img}
                      fill
                      sizes="300px"
                      alt={book.name}
                    />
                    <ImageListItemBar title={book.name} subtitle={book.name} />
                  </Box>
                </ImageListItem>
              </Link>
            </Box>
          )}
        />
      </ImageList>
    </Box>
  );
};

export default ListBooksCard;
