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
            gridAutoFlow: 'column', // Змінити вирівнювання на рядок
            gridTemplateColumns:
              'repeat(auto-fill, minmax(160px, 1fr)) !important',
            gridAutoColumns: 'minmax(160px, 1fr)',
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
                      width: '150px',
                      height: '180px',
                    }}
                  >
                    <Image src={book.img} fill alt={book.name} />
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
