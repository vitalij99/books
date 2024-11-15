import React from 'react';
import Image from 'next/image';
import { Box, Card, Link, Typography } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { BookInfoType } from '@/types/book';
import BookInfoText from '@/app/_compon/BookInfoText/BookInfoText';

interface BookInfoProps {
  bookInfo?: BookInfoType;
}

const BookInfo = ({ bookInfo }: BookInfoProps) => {
  return (
    <Box>
      <BookInfoText>{bookInfo.title}</BookInfoText>
      {bookInfo && (
        <Box sx={{ display: 'flex', gap: '10px' }}>
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
            <Card variant={'outlined'} sx={{ p: 2, borderRadius: 3 }}>
              <BookInfoText>Автор: {bookInfo.author}</BookInfoText>
              <BookInfoText>Глави: {bookInfo.chapters}</BookInfoText>
              <BookInfoText>Видавництво: {bookInfo.publishers}</BookInfoText>
              <BookInfoText>Видано: {bookInfo.yearPublishing}</BookInfoText>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BookInfo;
