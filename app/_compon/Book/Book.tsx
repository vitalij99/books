'use client';
import { Box, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

interface BookProps {
  book: string[];
  nav: {
    nextPage: string;
    prevPage: string;
    nextText: string;
    prevText: string;
  };
}

const Book = ({ data }: { data: BookProps }) => {
  const [textBook, setTextBook] = useState(data.book);

  return (
    <div>
      {data &&
        textBook.map((text, index) => {
          return <Typography key={index}>{text}</Typography>;
        })}

      <Box>
        <Link href={data.nav.nextPage}>{data.nav.nextText}</Link>
        <Link href={data.nav.prevPage}>{data.nav.prevText}</Link>
      </Box>
    </div>
  );
};

export default Book;
