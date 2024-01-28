'use client';

import { getStorage } from '@/lib/getStorage';
import { setRootValue } from '@/lib/setRootValue';
import { translate } from '@/lib/translate.google';
import { AllowedKeys, STORAGE_KEY } from '@/type/book';
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

// add  reader
const Book = ({
  data,
  translate: tran,
}: {
  data: BookProps;
  translate?: string;
}) => {
  const [textBook, setTextBook] = useState(data.book);

  useMemo(() => {
    async function getTranslate() {
      const allTextBook: string[] = [];

      for (let index = 0; index < data.book.length; index++) {
        const element = data.book[index];
        const result = await translate(element);
        allTextBook.push(...result);
        if (index === 10) {
          setTextBook(allTextBook);
        }
      }

      setTextBook(allTextBook);
    }

    if (tran) {
      getTranslate();
    }
  }, [data.book, tran]);
  useEffect(() => {
    const storage = STORAGE_KEY.map(key => getStorage(key));
    if (storage) {
      storage.forEach((value, index) => {
        if (value) {
          setRootValue(STORAGE_KEY[index], value);
        }
      });
    }
  }, []);

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-color-book)',
        paddingInline: `var(${AllowedKeys.BkPadding})`,
      }}
    >
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
