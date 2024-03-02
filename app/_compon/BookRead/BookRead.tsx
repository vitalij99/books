'use client';

import { getStorageRootValue } from '@/lib/getStorage';

import { setRootValue } from '@/lib/setRootValue';
import { translateGoogle } from '@/lib/translate';
import { AllowedKeys, STORAGE_KEY } from '@/type/book';
import { Box, Link, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Reader from '../Reader/Reader';

interface BookProps {
  book: string[];
  nav: {
    nextPage: string;
    prevPage: string;
    nextText: string;
    prevText: string;
  };
}
const initTextIsRead = {
  p: -1,
  allTextmass: 0,
};
const BookRead = ({
  data,
  translate: tran,
  timeReader,
}: {
  data: BookProps;
  translate?: boolean;
  timeReader?: string;
}) => {
  const [textBook, setTextBook] = useState(data.book);
  const [textIsRead, setTextIsRead] = useState(initTextIsRead);

  useMemo(() => {
    async function getTranslate() {
      const allTextBook: string[] = [];

      for (let index = 0; index < data.book.length; index++) {
        const element = data.book[index];
        const result = await translateGoogle(element);
        allTextBook.push(...result);
        if (index % 10 === 0) {
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
    const storage = STORAGE_KEY.map(key => getStorageRootValue(key));
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

  const changeTextRead = (textReadeIndex: number) => {
    if (textReadeIndex === -1) {
      setTextIsRead(initTextIsRead);
      return;
    }
    let allTextref = textIsRead.allTextmass;

    const startIndexPar = textIsRead.p === -1 ? 0 : textIsRead.p;

    for (let index = startIndexPar; index < data.book.length; index++) {
      const text = data.book[index];
      allTextref += text.length;
      if (allTextref >= textReadeIndex) {
        setTextIsRead({
          p: index,
          allTextmass: allTextref,
        });
        break;
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-color-book)',
        paddingInline: `var(${AllowedKeys.BkPadding})`,
      }}
    >
      <Box sx={{ position: 'fixed', right: '0' }}>
        <Reader book={textBook} changeText={changeTextRead} />
      </Box>
      {textBook.map((text, index) => {
        const sxStyled = textIsRead.p === index;
        return (
          <Typography
            sx={{
              color: 'var(--text-book)',
              fontSize: 'var(--font-size)',
              bgcolor: sxStyled ? '#FFFF00' : undefined,
            }}
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

export default BookRead;
