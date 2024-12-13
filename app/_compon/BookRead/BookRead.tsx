'use client';
import React, { useRef } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getSrorageJSON, getStorage, setStorage } from '@/lib/getStorage';
import { setRootValue } from '@/lib/setRootValue';
import { translateGoogle } from '@/lib/translate';

import { TranslateContext } from '@/Providers/TranslateProvider';
import Reader from '@/app/_compon/Reader/Reader';
import NavigationPages from '@/app/_compon/NavigationPages/NavigationPages';
import ItemList from '@/app/_compon/ItemList/ItemList';

import {
  AllowedKeys,
  BookProps,
  MENUSTYLEDTEXT,
  StorageType,
} from '@/types/book';
import { InitParamsReader, PARAMSREADER } from '@/types/reader';
import { BookInfoContext } from '@/Providers/BookInfoProvider';

const IS_AUTO_SCROLL = 'isAutoScroll';

type BookReadProps = {
  book: BookProps;
  params: { chapter: string; book: string };
};

const BookRead = ({ book, params }: BookReadProps) => {
  const [textBook, setTextBook] = useState(book.book);
  const [textIsRead, setTextIsRead] = useState(-1);
  const [isAutoScroll, setisAutoScroll] = useState(false);

  const translate = useContext(TranslateContext);
  const info = useRef(useContext(BookInfoContext));

  useEffect(() => {
    info.current.setBookInfoUpdate({ title: book.title });
  }, [book.title]);

  useEffect(() => {
    const initializeStorage = () => {
      const storage: StorageType = getSrorageJSON(MENUSTYLEDTEXT);
      if (storage) {
        Object.keys(storage).forEach(cssKey => {
          if (cssKey.startsWith('--')) {
            setRootValue(cssKey, storage[cssKey as keyof StorageType]);
          }
        });
      }

      const storageAutoScroll = getStorage(IS_AUTO_SCROLL);
      if (storageAutoScroll === 'true') {
        setisAutoScroll(true);
      }

      const storageReader: InitParamsReader = getSrorageJSON(PARAMSREADER);
      if (storage && storageReader?.timer?.timeSave) {
        const dateSave = new Date(storageReader.timer.timeSave);
        if (dateSave >= new Date()) {
          setTextIsRead(0);
        }
      }
    };

    initializeStorage();
  }, []);

  useEffect(() => {
    if (!book || !book.book || !translate.translate) return;

    let isCancelled = false;

    const translateText = async (
      bookTranslate: string[],
      earlyExitIndex?: number
    ) => {
      const allTextBook: string[] = [];
      for (let index = 0; index < bookTranslate.length; index++) {
        if (isCancelled) return;
        try {
          const result = await translateGoogle(bookTranslate[index]);
          allTextBook.push(result);

          if (earlyExitIndex !== undefined && index === earlyExitIndex) {
            setTextBook([...allTextBook]);
            return;
          }
        } catch (error) {
          console.error(`Error translating text at index ${index}:`, error);
        }
      }
      setTextBook([...allTextBook]);
    };

    translateText(book.book, 20).then(() => translateText(book.book));

    return () => {
      isCancelled = true;
    };
  }, [book, translate.translate]);

  useEffect(() => {
    if (!isAutoScroll) return;

    const paragraf = document.getElementsByClassName(IS_AUTO_SCROLL);
    if (paragraf[0]) {
      paragraf[0].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isAutoScroll, textIsRead]);

  const changeTextRead = (textReadeIndex: number) => {
    setTextIsRead(textReadeIndex);
  };

  const handleAutoScroll = () => {
    setisAutoScroll(prev => {
      setStorage(!prev, IS_AUTO_SCROLL);

      return !prev;
    });
  };

  if (!book || !textBook) {
    return <></>;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-color-book)',
        paddingInline: `var(${AllowedKeys.BkPadding})`,
        minHeight: '100vh',
        maxHeight: '100%',
      }}
    >
      <Reader
        book={textBook}
        changeText={changeTextRead}
        autoScroll={{ handleAutoScroll, isAutoScroll }}
        srcNextPage={book.nav.nextPage}
      />

      <NavigationPages
        navigate={book.nav}
        title={book.title || params.book}
        charpter={params.chapter}
      />
      <ItemList
        items={textBook}
        renderItem={(text, index) => (
          <Typography
            sx={{
              color: 'var(--text-book)',
              fontSize: 'var(--font-size)',
              backdropFilter: textIsRead === index ? 'blur(10px)' : undefined,
              filter: textIsRead === index ? 'invert(1)' : undefined,
              marginBottom: 'var(--text-text-margin)',
              lineHeight: 'var(--text-line-height)',
            }}
            className={textIsRead === index ? IS_AUTO_SCROLL : ' '}
          >
            {text}
          </Typography>
        )}
      />
      <NavigationPages
        navigate={book.nav}
        title={book.title || params.book}
        charpter={params.chapter}
      />
    </Box>
  );
};

export default BookRead;
