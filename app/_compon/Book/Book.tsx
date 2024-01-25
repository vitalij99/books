'use client';

import { Box, Link, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

interface BookProps {
  book: string[];
  nav: {
    nextPage: string;
    prevPage: string;
    nextText: string;
    prevText: string;
  };
}
enum AllowedKeys {
  FontSize = '--font-size',
  TextBook = '--text-book',
  BgColor = '--bg-color-book',
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
    const storedFontSize = localStorage.getItem(AllowedKeys.FontSize);
    const storedTextColor = localStorage.getItem(AllowedKeys.TextBook);
    const storedBgColor = localStorage.getItem(AllowedKeys.BgColor);
    if (storedFontSize && storedTextColor && storedBgColor) {
      document.documentElement.style.setProperty(
        AllowedKeys.FontSize,
        storedFontSize
      );
      document.documentElement.style.setProperty(
        AllowedKeys.TextBook,
        storedTextColor
      );
      document.documentElement.style.setProperty(
        AllowedKeys.BgColor,
        storedBgColor
      );
    }
  }, []);

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <Box sx={{ backgroundColor: 'var(--bg-color-book)' }}>
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
    </Box>
  );
};

export default Book;
