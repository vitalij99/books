'use client';

import { BooksSave } from '@/type/book';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { setStorage } from '@/lib/getStorage';

const SaveBooksLinks = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSave[]>([]);
  useEffect(() => {
    const savedBooksString = localStorage.getItem('savedBooks');

    if (savedBooksString) {
      const savedBooksData = JSON.parse(savedBooksString);
      setSaveBooks(savedBooksData);
    }
  }, []);

  const handleDeleteBook = (bookLink: string) => {
    const updatedBooks = saveBooks.filter(book => book.link !== bookLink);
    setSaveBooks(updatedBooks);
    setStorage(JSON.stringify(updatedBooks), 'savedBooks');
  };
  return (
    <Box sx={{ paddingInline: 5 }}>
      <Typography>Збережені</Typography>
      {saveBooks.map((book, index) => {
        return (
          <Box
            key={book.link + index}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Link href={book.link}>
              <Typography>
                {book.title} Параграф {book.chapter}
              </Typography>
            </Link>
            <IconButton
              onClick={() => handleDeleteBook(book.link)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default SaveBooksLinks;
