'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Link, Typography } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { getStorageAr } from '@/lib/getStorage';
import { getTimeHistoryDifference } from '@/lib/books';
import { AllowedKeys } from '@/types/book';

type HistoryBook = {
  link?: string;
  title?: string;
  time?: string;
};

const BOOKS = [
  {
    link: '/',
    title: 'Тут будуть відвіданні книги',
    time: '00 хв',
  },
];

const History = () => {
  const [books, setBooks] = useState<HistoryBook[]>(BOOKS);

  useEffect(() => {
    const storage: HistoryBook[] = getStorageAr(AllowedKeys.HistoryBooks);

    if (!storage || storage.length === 0) return;

    const sortBooks = storage.sort((a, b) => {
      const dateA = a.time ? new Date(a.time).getTime() : 0;
      const dateB = b.time ? new Date(b.time).getTime() : 0;
      return dateB - dateA;
    });
    const updatedBooks = sortBooks.map((book: any) => ({
      ...book,
      time: getTimeHistoryDifference(book.time),
    }));

    setBooks(updatedBooks);
  }, []);

  return (
    <Box minWidth="300px">
      <Card variant="outlined" sx={{ p: 1 }}>
        <CardContent>Відвіданні книжки</CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Назва</Typography>
          <Typography>Час потому</Typography>
        </CardContent>
        <ItemList
          items={books}
          renderItem={({ link, title, time }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Link sx={{ maxWidth: '200px' }} href={link}>
                {title}
              </Link>
              {time && <Typography>{time}</Typography>}
            </Box>
          )}
        />
      </Card>
    </Box>
  );
};

export default History;
