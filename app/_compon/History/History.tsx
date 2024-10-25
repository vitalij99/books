'use client';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { Box, Card, CardActions, CardContent, Link } from '@mui/material';

import React from 'react';

const pages = [
  {
    link: 'asd',
    title: 'sade',
  },
  {
    link: 'asd',
    title: 'sade',
  },
  {
    link: 'asd',
    title: 'sade',
  },
  {
    link: 'asd',
    title: 'sade',
  },
];

const History = () => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>Відвідані книжки</CardContent>
        <ItemList
          items={pages}
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
