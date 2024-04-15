'use client';

import { getStorage, getStorageRootValue, setStorage } from '@/lib/getStorage';

import { setRootValue } from '@/lib/setRootValue';
import { translateGoogle } from '@/lib/translate';
import { AllowedKeys, STORAGE_KEY } from '@/types/book';
import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import Reader from '../Reader/Reader';
import { TranslateContext } from '../DarkTranslateProvider/DarkTranslateProvider';
import NavigationPages from '../NavigationPages/NavigationPages';

interface BookProps {
  book: string[];
  nav: {
    nextPage?: string;
    prevPage?: string;
    nextText?: string;
    prevText?: string;
  };
}

const IS_AUTO_SCROLL = 'isAutoScroll';

const BookRead = ({ data }: { data: BookProps }) => {
  const [textBook, setTextBook] = useState(data.book);
  const [textIsRead, setTextIsRead] = useState(-1);
  const [isAutoScroll, setisAutoScroll] = useState(false);

  const translate = useContext(TranslateContext);

  useEffect(() => {
    const storage = STORAGE_KEY.map(key => getStorageRootValue(key));
    if (storage) {
      storage.forEach((value, index) => {
        if (value) {
          setRootValue(STORAGE_KEY[index], value);
        }
      });
    }

    const storageAutoScroll = getStorage(IS_AUTO_SCROLL);

    if (storageAutoScroll === 'true') {
      setisAutoScroll(true);
    }
  }, []);

  useMemo(() => {
    async function getTranslate(bookTranslate: string | any[]) {
      const allTextBook: string[] = [];

      for (let index = 0; index < bookTranslate.length; index++) {
        const element = bookTranslate[index];
        const result = await translateGoogle(element);
        allTextBook.push(...result);
        if (index % 10 === 0) {
          setTextBook(allTextBook);
        }
      }

      setTextBook(allTextBook);
    }

    if (translate.translate) {
      getTranslate(data.book);
    } else setTextBook(data.book);
  }, [data.book, translate]);

  // autoScroll
  useEffect(() => {
    if (!isAutoScroll) return;

    const paragraf = document.getElementsByClassName(IS_AUTO_SCROLL);

    paragraf[0]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [isAutoScroll, textIsRead]);

  if (!data) {
    return <div>Error</div>;
  }

  const changeTextRead = (textReadeIndex: number) => {
    setTextIsRead(textReadeIndex);
  };

  const handleAutoScroll = () => {
    setisAutoScroll(prev => {
      setStorage(!prev, IS_AUTO_SCROLL);

      return !prev;
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-color-book)',
        paddingInline: `var(${AllowedKeys.BkPadding})`,
      }}
    >
      <Box sx={{ position: 'fixed', right: '0' }}>
        <Reader
          book={textBook}
          changeText={changeTextRead}
          autoScroll={{ handleAutoScroll, isAutoScroll }}
          srcNextPage={data.nav.nextPage}
        />
      </Box>
      <NavigationPages navigate={data.nav} />
      {textBook.map((text, index) => {
        const sxStyled = textIsRead === index;
        return (
          <Typography
            sx={{
              color: 'var(--text-book)',
              fontSize: 'var(--font-size)',
              bgcolor: sxStyled ? '#FFFF00' : undefined,
            }}
            className={sxStyled ? IS_AUTO_SCROLL : ' '}
            key={index}
          >
            {text}
          </Typography>
        );
      })}

      <NavigationPages navigate={data.nav} />
    </Box>
  );
};

export default BookRead;
