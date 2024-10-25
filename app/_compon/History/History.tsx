'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Link } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { getStorageAr } from '@/lib/getStorage';

const BOOKS = [
  {
    link: '/',
    title: 'Тут будуть відвіданні книги',
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
        <ItemList
          items={books}
          renderItem={({ link, title }) => (
            <CardActions>
              <Link href={link}>{title}</Link>
            </CardActions>
          )}
        />
      </Card>
    </Box>
  );
};

export default History;
