'use client';

import { BooksSaveDB } from '@/types/book';
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Skeleton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import Image from 'next/image';
import { deleteSaveBooks, getSaveBooks } from '@/lib/db';

const SaveBooksLinks = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>([]);

  useEffect(() => {
    getSaveBooks().then(prev => (prev ? setSaveBooks(prev) : []));
  }, []);

  const handleDeleteBook = async (bookId: string) => {
    const res = await deleteSaveBooks(bookId);
    if (res) {
      setSaveBooks(res);
    }
  };
  return (
    <Box padding={4}>
      {saveBooks.length > 0 ? (
        <ImageList
          sx={{
            gridAutoFlow: 'column',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px)) !important',
            gridAutoColumns: 'minmax(200px)',
            overflow: 'auto',
          }}
        >
          {saveBooks.map(book => (
            <Box
              key={book.id}
              sx={{
                display: 'inline-block',
                p: 2,
              }}
            >
              <ImageListItem>
                <Box
                  sx={{
                    position: 'relative',
                    width: '200px',
                    height: '250px',
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 0,
                      zIndex: 3,
                    }}
                    onClick={() => handleDeleteBook(book.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Link href={book.link}>
                    {book.image ? (
                      <Image
                        src={book.image}
                        fill
                        sizes="300px"
                        alt={book.title}
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={250}
                      />
                    )}
                  </Link>

                  <ImageListItemBar
                    title={book.title ? book.title : 'Ой щось трапилось'}
                    subtitle={book.title ? book.title : 'Ой щось трапилось'}
                  />
                </Box>
              </ImageListItem>
            </Box>
          ))}
        </ImageList>
      ) : (
        <>немає</>
      )}
    </Box>
  );
};

export default SaveBooksLinks;
