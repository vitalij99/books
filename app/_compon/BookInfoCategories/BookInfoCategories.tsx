import ItemList from '@/app/_compon/ItemList/ItemList';

import { Box, Card, Link, Typography } from '@mui/material';
import React from 'react';

const BookInfoCategories = ({
  categories,
  title,
}: {
  categories?: string[];
  title?: string;
}) => {
  if (categories?.length === 0 || !categories) {
    return null;
  }

  return (
    <Card variant={'outlined'} sx={{ p: 2, borderRadius: 3 }}>
      <Typography>{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <ItemList
          items={categories}
          renderItem={categori => <Link href="/">{categori}</Link>}
        />
      </Box>
    </Card>
  );
};

export default BookInfoCategories;
