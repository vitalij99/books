'use client';

import { BooksSave } from '@/type/book';
import { Box, Card, IconButton, Link, Typography } from '@mui/material';
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
    </Box>
  );
};

export default SaveBooksLinks;
