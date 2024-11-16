import React from 'react';
import Image from 'next/image';
import { Box, Card, Typography } from '@mui/material';

import { BookInfoType } from '@/types/book';
import BookInfoText from '@/app/_compon/BookInfoText/BookInfoText';
import BookInfoCategories from '@/app/_compon/BookInfoCategories/BookInfoCategories';

interface BookInfoProps {
  bookInfo?: BookInfoType;
}

const BookInfo = ({ bookInfo }: BookInfoProps) => {
  return (
    <Box>
      <Typography fontSize="30px">{bookInfo?.title}</Typography>
      {bookInfo && (
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {bookInfo.image && (
            <Image
              width="400"
              height="500"
              src={bookInfo.image}
              alt={'Зображення книги'}
            />
          )}
          <Box>
            <Card variant={'outlined'} sx={{ p: 2, borderRadius: 3 }}>
              <BookInfoText isEmpty={bookInfo.author}>
                Автор: {bookInfo.author}
              </BookInfoText>
              <BookInfoText isEmpty={bookInfo.chapters}>
                Глави: {bookInfo.chapters}
              </BookInfoText>
              <BookInfoText isEmpty={bookInfo.publishers}>
                Видавництво: {bookInfo.publishers}
              </BookInfoText>
              <BookInfoText isEmpty={bookInfo.yearPublishing}>
                Видано: {bookInfo.yearPublishing}
              </BookInfoText>
              <BookInfoText isEmpty={bookInfo.status}>
                Видано: {bookInfo.status}
              </BookInfoText>
            </Card>
            <BookInfoCategories
              title="Категорії:"
              categories={bookInfo.categories}
            />
            <BookInfoCategories title="Теги:" categories={bookInfo.tags} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BookInfo;
