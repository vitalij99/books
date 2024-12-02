'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Card, Container, Skeleton, Typography } from '@mui/material';

import { BookInfoType } from '@/types/book';
import BookInfoText from '@/app/_compon/BookInfoText/BookInfoText';
import BookInfoCategories from '@/app/_compon/BookInfoCategories/BookInfoCategories';

interface BookInfoProps {
  bookInfo?: BookInfoType;
}

const BookInfo = ({ bookInfo }: BookInfoProps) => {
  return (
    <Container sx={{ p: 1 }}>
      <Typography fontSize="30px">{bookInfo?.title}</Typography>
      {bookInfo && (
        <Box
          sx={{
            display: { xs: 'block', md: 'flex' },
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {bookInfo.image && bookInfo.image.length !== 1 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 1,
              }}
            >
              <Image
                width="400"
                height="500"
                src={bookInfo.image}
                alt={'Зображення книги'}
              />
            </Box>
          ) : (
            <Skeleton />
          )}
          <Box>
            <Card
              variant={'outlined'}
              sx={{ p: 2, borderRadius: 3, marginBottom: 1 }}
            >
              <BookInfoText isEmpty={bookInfo.author}>
                Автор: {bookInfo.author}
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
              <BookInfoText isEmpty={bookInfo.chapters}>
                Кількість розділів: {bookInfo.chapters}
              </BookInfoText>
            </Card>
            <Box sx={{ marginBottom: 1 }}>
              <BookInfoCategories
                title="Категорії:"
                categories={bookInfo.categories}
              />
            </Box>
            <BookInfoCategories
              genre={false}
              title="Теги:"
              categories={bookInfo.tags}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default BookInfo;
