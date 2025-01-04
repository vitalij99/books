import React from 'react';
import SaveBooksLinks from '@/app/_compon/SaveBooksLinks/SaveBooksLinks';
import Container from '@/app/_compon/Container/Container';
import { Box } from '@mui/material';
import History from '@/app/_compon/History/History';
import { getSaveBooks } from '@/lib/db';

const Books = async () => {
  const initSaveBook = await getSaveBooks();
  return (
    <>
      <Container>
        <Box
          sx={{
            display: { xs: 'block', md: 'grid' },
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '1fr',
            p: 2,
            gap: 2,
          }}
        >
          <Box sx={{ gridArea: '1 / 1 / 2 / 4' }}>
            <SaveBooksLinks initSaveBook={initSaveBook} />
          </Box>
          <Box sx={{ gridArea: '1 / 4 / 2 / 5' }}>
            <History />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Books;
