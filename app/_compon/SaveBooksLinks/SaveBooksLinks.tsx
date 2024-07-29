'use client';

import { BooksSaveDB } from '@/types/book';
import {
  Box,
  Button,
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

import Image from 'next/image';
import { deleteSaveBooks, getSaveBooks, updateChapter } from '@/lib/db';
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
  const handleDeleteCharpter = async (
    bookId: string,
    deleteChapter: number
  ) => {
    let bookIndex = 0;
    const book = saveBooks.find((item, index) => {
      if (item.id === bookId) {
        bookIndex = index;
        return item;
      }
    });
    console.log(book, bookIndex);
    if (!book) return;
    const newCharpters = book.chapter?.filter(
      chapter => chapter !== deleteChapter
    );
    if (!newCharpters) return;
    const res = await updateChapter(bookId, newCharpters);

    if (res) {
      setSaveBooks(prev => {
        return prev.map((item, index) => (index === bookIndex ? res : item));
      });
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
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '200px',
                          height: '250px',
                        }}
                      >
                        <Image
                          src={book.image}
                          fill
                          priority
                          sizes="300px"
                          alt={book.title}
                        />
                      </Box>
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
                    <Box sx={{ position: 'relative' }}>
                      <Link
                        href={`books/${book.title}/${chapter}?web=${book.web}`}
                      >
                        <Typography>глава {chapter}</Typography>
                      </Link>

                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: -12,
                          top: -8,
                          zIndex: 3,
                        }}
                        onClick={() => handleDeleteCharpter(book.id, chapter)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
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
