'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Link, Typography } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { getStorageAr } from '@/lib/getStorage';
import { getTimeHistoryDifference } from '@/lib/books';
import { AllowedKeys } from '@/types/book';
import { HISTORY_BOOKS, HistoryBook } from '@/types/history';

const History = () => {
  const [books, setBooks] = useState<HistoryBook[]>(HISTORY_BOOKS);

  useEffect(() => {
    const storage: HistoryBook[] = getStorageAr(AllowedKeys.HistoryBooks);

    if (!storage || storage.length === 0) return;

    const sortBooks = storage.sort((a, b) => {
      const dateA = a.time ? new Date(a.time).getTime() : 0;
      const dateB = b.time ? new Date(b.time).getTime() : 0;
      return dateB - dateA;
    });
    const updatedBooks = sortBooks.map(book => ({
      ...book,
      time: getTimeHistoryDifference(book.time || ''),
    }));

    setBooks(updatedBooks);
  }, []);

  return (
    <Box minWidth="330px">
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
              <Link sx={{ maxWidth: '65%' }} href={link}>
                {title}
              </Link>
              <Typography>{time || 'Колись'}</Typography>
            </Box>
          )}
        />
      </Card>
    </Box>
  );
};

export default History;
