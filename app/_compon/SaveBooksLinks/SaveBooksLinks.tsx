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
import { deleteSaveBooks, getSaveBooks, updateChapter } from '@/lib/db';
import ItemList from '@/app/_compon/ItemList/ItemList';
import DropDownLinks from '@/app/_compon/DropDownLinks/DropDownLinks';
import SaveOptionsBooks from '@/app/_compon/SaveOptionsBooks/SaveOptionsBooks';

const SaveBooksLinks = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>([]);
  const [showBooks, setShowBooks] = useState<BooksSaveDB[]>(saveBooks);

  useEffect(() => {
    getSaveBooks().then(result => {
      setSaveBooks(result ? result : []);
      setShowBooks(result ? result : []);
    });
  }, []);

  const selectShowBooks = (web: string) => {
    if (web === 'all') {
      setShowBooks(saveBooks);
    } else setShowBooks(saveBooks.filter(book => book.web === web));
  };

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
    const bookIndex = saveBooks.findIndex(item => item.id === bookId);
    if (bookIndex === -1) return;

    const book = saveBooks[bookIndex];
    if (!book.chapter) return;

    const newCharpters = book.chapter?.filter(
      chapter => chapter !== deleteChapter
    );

    const res = await updateChapter(bookId, newCharpters);

    if (res) {
      setSaveBooks(prev => {
        return prev.map((item, index) => (index === bookIndex ? res : item));
      });
      setShowBooks(prev => {
        return prev.map(item =>
          item.id === saveBooks[bookIndex].id ? res : item
        );
      });
    }
  };

  if (saveBooks.length === 0) {
    return null;
  }
  return (
    <Box>
      <SaveOptionsBooks selectShowBooks={selectShowBooks} />
      <Box
        sx={{
          overflowX: 'auto',
          whiteSpace: { xs: 'nowrap', md: 'wrap' },
          maxWidth: '1000px',
          maxHeight: { xs: '1200px', md: 'none' },
        }}
      >
        <ImageList
          sx={{
            display: 'grid',
            gridAutoFlow: { xs: 'column', md: 'row' },
            gridTemplateRows: 'repeat(2, 370px)',
            gridAutoColumns: '230px',
            gap: 10,
            width: 'auto',
          }}
        >
          <ItemList
            items={showBooks.slice(0, 10)}
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
                      title={book.title || 'Ой щось трапилось'}
                      subtitle={book.title || 'Ой щось трапилось'}
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
    </Box>
  );
};

export default SaveBooksLinks;
