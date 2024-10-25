import React from 'react';
import SaveBooksLinks from '@/app/_compon/SaveBooksLinks/SaveBooksLinks';
import Container from '@/app/_compon/Container/Container';
import History from '@/app/_compon/History/History';
import { Box } from '@mui/material';

const Books = async () => {
  return (
    <>
      <Container>
        <Box sx={{ display: 'flex' }}>
          <SaveBooksLinks />
          <History />
        </Box>
      </Container>
    </>
  );
};

export default Books;
