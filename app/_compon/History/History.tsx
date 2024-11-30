'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { getStorageAr } from '@/lib/getStorage';
import { getTimeHistoryDifference } from '@/lib/books';

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
    const storage: HistoryBook[] = getStorageAr('historybooks');

    if (!storage || storage.length === 0) return;

    const updatedBooks = storage.map((book: any) => ({
      ...book,
      time: getTimeHistoryDifference(book.time),
    }));

    setBooks(updatedBooks);
  }, []);

  return (
    <Box minWidth="300px">
      <Card variant="outlined">
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
