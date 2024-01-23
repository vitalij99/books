'use client';
import { translate } from '@/lib/translate.google';
import { Box, Link, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

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

  // useMemo(() => {
  //   async function getTranslate() {
  //     const allTextBook: string[] = [];

  //     for (let index = 0; index < data.book.length; index++) {
  //       const element = data.book[index];
  //       const result = await translate(element);
  //       allTextBook.push(...result);
  //     }

  //     setTextBook(allTextBook);
  //   }

  //   getTranslate();
  // }, [data.book]);

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
