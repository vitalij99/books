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
  Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import Image from 'next/image';
import { deleteSaveBooks, getSaveBooks } from '@/lib/db';
import ItemList from '@/app/_compon/ItemList/ItemList';

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

  if (saveBooks.length === 0) {
    return <Typography>немає</Typography>;
  }
  return (
    <Box padding={4}>
      <ImageList
        sx={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px)) !important',
          gridAutoColumns: 'minmax(200px)',
          justifyItems: 'center',
        }}
      >
        <ItemList
          items={saveBooks}
          keyExtractor={book => book.id}
          renderItem={book => (
            <Box
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
              <Box sx={{ p: 1, width: '200px' }}>
                <Link
                  href={`books/${book.title}/${book.lastReadeChapter}?web=${book.web}`}
                >
                  <Typography>
                    Остання прочитана глава {book.lastReadeChapter}
                  </Typography>
                </Link>

                <ItemList
                  items={book.chapter}
                  renderItem={chapter => (
                    <Link
                      href={`books/${book.title}/${chapter}?web=${book.web}`}
                    >
                      <Typography>глава {chapter}</Typography>
                    </Link>
                  )}
                />
              </Box>
            </Box>
          )}
        />
      </ImageList>
    </Box>
  );
};

export default SaveBooksLinks;
