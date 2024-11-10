import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';

interface BookInfoProps {
  bookInfo?: { categories?: string[]; image?: string };
}

const BookInfo = ({ bookInfo }: BookInfoProps) => {
  return (
    <Box>
      {bookInfo && (
        <Box>
          {bookInfo.image && (
            <Image
              width="300"
              height="400"
              src={bookInfo.image}
              alt={'Зображення книги'}
            />
          )}
          <ItemList
            items={bookInfo?.categories}
            renderItem={categori => <Typography>{categori}</Typography>}
          />
        </Box>
      )}
    </Box>
  );
};

export default BookInfo;
