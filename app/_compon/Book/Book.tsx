'use client';
import { Box, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface BookProps {
  book: string[];
  nav: {
    nextPage: string;
    prevPage: string;
    nextText: string;
    prevText: string;
  };
}

// add translate and reader
const Book = ({ data }: { data: BookProps }) => {
  const [textBook, setTextBook] = useState(data.book);

  useEffect(() => {
    const textParagref = textBook.slice(0, 10);
    console.log(textParagref);
  }, [textBook]);

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div>
      {textBook.map((text, index) => {
        return <Typography key={index}>{text}</Typography>;
      })}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href={data.nav.nextPage}>{data.nav.nextText}</Link>
        <Link href={data.nav.prevPage}>{data.nav.prevText}</Link>
      </Box>
    </div>
  );
};

export default Book;
