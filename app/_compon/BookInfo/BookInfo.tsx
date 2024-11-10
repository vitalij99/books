import React from 'react';
import Image from 'next/image';
import { Box, Card, Link, Typography } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';

interface BookInfoProps {
  bookInfo?: { categories?: string[]; image?: string };
}

const BookInfo = ({ bookInfo }: BookInfoProps) => {
  return (
    <Box sx={{ width: '400px' }}>
      {bookInfo && (
        <Box>
          {bookInfo.image && (
            <Image
              width="400"
              height="500"
              src={bookInfo.image}
              alt={'Зображення книги'}
            />
          )}
          <Card variant={'outlined'} sx={{ p: 2, borderRadius: 3 }}>
            <Typography>Жанри:</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <ItemList
                items={bookInfo?.categories}
                renderItem={categori => <Link href="/">{categori}</Link>}
              />
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default BookInfo;
