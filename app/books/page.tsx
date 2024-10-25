import React from 'react';
import SaveBooksLinks from '@/app/_compon/SaveBooksLinks/SaveBooksLinks';
import Container from '@/app/_compon/Container/Container';
import { Box } from '@mui/material';
import History from '@/app/_compon/History/History';

const Books = async () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplate: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            p: 2,
            gap: 2,
          }}
        >
          <Box sx={{ gridArea: '1 / 1 / 2 / 5' }}>
            <SaveBooksLinks />
          </Box>
          <Box sx={{ gridArea: '1 / 5 / 2 / 6' }}>
            <History />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Books;
