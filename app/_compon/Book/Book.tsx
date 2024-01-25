'use client';

import { Box, Link, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import BookMenu from '../BookMenu/BookMenu';

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
  useEffect(() => {
    const storedFontSize = localStorage.getItem('fontSize');
    const storedTextColor = localStorage.getItem('textColor');
    if (storedFontSize && storedTextColor) {
      document.documentElement.style.setProperty('--font-size', storedFontSize);
      document.documentElement.style.setProperty(
        '--text-book',
        storedTextColor
      );
    }
  }, []);

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div>
      <BookMenu />

      {textBook.map((text, index) => {
        return (
          <Typography
            sx={{ color: 'var(--text-book)', fontSize: 'var(--font-size)' }}
            key={index}
          >
            {text}
          </Typography>
        );
      })}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href={data.nav.prevPage}>{data.nav.prevText}</Link>
        <Link href={data.nav.nextPage}>{data.nav.nextText}</Link>
      </Box>
    </div>
  );
};

export default Book;
