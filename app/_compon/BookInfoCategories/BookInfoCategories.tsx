import React from 'react';
import { Box, Card, Link, Typography } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';

const BookInfoCategories = ({
  categories,
  title,
  genre = true,
}: {
  genre?: boolean;
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
          renderItem={categori => (
            <Link
              href={
                genre ? `/search?genre=${categori}` : `/search?tag=${categori}`
              }
            >
              {categori}
            </Link>
          )}
        />
      </Box>
    </Card>
  );
};

export default BookInfoCategories;
