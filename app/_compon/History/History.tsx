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

const BOOKS = [
  {
    link: '/',
    title: 'Тут будуть відвіданні книги',
    time: new Date(),
  },
];

const History = () => {
  const [books, setBooks] = useState(BOOKS);

  useEffect(() => {
    const storage = getStorageAr('historybooks');
    setBooks(storage);
  }, []);

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>Відвіданні книжки</CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Назва</Typography>
          <Typography>Час потому</Typography>
        </CardContent>
        <ItemList
          items={books}
          renderItem={({ link, title, time }) => (
            <CardActions
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Link href={link}>{title}</Link>
              <Typography>{getTimeHistoryDifference(time)}</Typography>
            </CardActions>
          )}
        />
      </Card>
    </Box>
  );
};

export default History;
