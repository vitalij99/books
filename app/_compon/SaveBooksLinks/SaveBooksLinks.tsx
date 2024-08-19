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
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import Image from 'next/image';
import { deleteSaveBooks, getSaveBooks, updateChapter } from '@/lib/db';
import ItemList from '@/app/_compon/ItemList/ItemList';
import DropDownLinks from '@/app/_compon/DropDownLinks/DropDownLinks';
import SaveOptionsBooks from '@/app/_compon/SaveOptionsBooks/SaveOptionsBooks';

// TODO showBooks
const SaveBooksLinks = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>([]);
  const [showBooks, setShowBooks] = useState<BooksSaveDB[]>([]);

  useEffect(() => {
    getSaveBooks().then(prev => {
      prev ? setSaveBooks(prev) : [];
      prev ? setShowBooks(prev) : [];
    });
  }, []);

  const selectShowBooks = () => {};

  const handleDeleteBook = async (bookId: string) => {
    const res = await deleteSaveBooks(bookId);
    if (res) {
      setSaveBooks(res);
    }
  };
  const handleDeleteCharpter = async (
    bookId: string,
    deleteChapter: string
  ) => {
    let bookIndex = 0;
    const book = saveBooks.find((item, index) => {
      if (item.id === bookId) {
        bookIndex = index;
        return item;
      }
    });

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
      <SaveOptionsBooks />
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
              <DropDownLinks
                book={book}
                handleDeleteCharpter={handleDeleteCharpter}
              />
            </Box>
          )}
        />
      </ImageList>
    </Box>
  );
};

export default SaveBooksLinks;
