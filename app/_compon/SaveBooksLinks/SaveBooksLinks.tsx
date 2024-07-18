'use client';

import { BooksSaveDB } from '@/types/book';
import {
  Box,
  Card,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSaveBooks } from '@/lib/db';
import Image from 'next/image';

const SaveBooksLinks = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>([]);

  useEffect(() => {
    getSaveBooks().then(prev => {
      if (prev) {
        setSaveBooks(prev);
      }
      console.log(prev);
    });
  }, []);

  const handleDeleteBook = (bookLink: string) => {};
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant={'h4'}>Збережені</Typography>
      <Box sx={{ margin: '0 auto' }} width={600}>
        {saveBooks.map((book, index) => {
          const titleBook = book.chapter
            ? `${book.title} Параграф: ${book.chapter}`
            : book.title;

          return (
            <Card
              key={book.link + index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Link href={book.link} underline={'none'}>
                <Typography padding={'10px 15px'}>{titleBook}</Typography>
              </Link>
              <Box sx={{ flex: '1' }} />
              <IconButton
                onClick={() => handleDeleteBook(book.link)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          );
        })}
      </Box>

      <Box padding={4}>
        {saveBooks.length > 0 ? (
          <ImageList
            sx={{
              gridAutoFlow: 'column',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(200px)) !important',
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
                <Link href={book.link}>
                  <ImageListItem>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '200px',
                        height: '250px',
                      }}
                    >
                      {book.image ? (
                        <Image
                          src={book.image}
                          fill
                          sizes="300px"
                          alt={book.title}
                        />
                      ) : (
                        <Skeleton
                          sx={{ position: 'absolute' }}
                          width="100%"
                          height="100%"
                        />
                      )}

                      <ImageListItemBar
                        title={book.title}
                        subtitle={book.title}
                      />
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
    </Box>
  );
};

export default SaveBooksLinks;
