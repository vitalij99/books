'use client';
import React, { useRef } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getSrorageJSON, getStorage, setStorage } from '@/lib/getStorage';

import { translateGoogle } from '@/lib/translate';

import { TranslateContext } from '@/Providers/TranslateProvider';
import Reader from '@/app/_compon/Reader/Reader';
import NavigationPages from '@/app/_compon/NavigationPages/NavigationPages';
import ItemList from '@/app/_compon/ItemList/ItemList';

import { AllowedKeys, BookProps } from '@/types/book';
import { InitParamsReader, PARAMSREADER } from '@/types/reader';
import { BookInfoContext } from '@/Providers/BookInfoProvider';
import Loader from '@/app/_compon/Loader/Loader';
import { ColorModeContext } from '@/Providers/DarkProvider';

const IS_AUTO_SCROLL = 'isAutoScroll';

type BookReadProps = {
  book: BookProps;
  params: { chapter: string; book: string };
};

const BookRead = ({ book, params }: BookReadProps) => {
  const [textBook, setTextBook] = useState(book.book);
  const [textIsRead, setTextIsRead] = useState(-1);
  const [isAutoScroll, setisAutoScroll] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const translate = useContext(TranslateContext);
  const info = useRef(useContext(BookInfoContext));
  const colorMode = React.useContext(ColorModeContext);

  useEffect(() => {
    info.current.setBookInfoUpdate({ title: book.title });
  }, [book.title]);

  useEffect(() => {
    const storageAutoScroll = getStorage(IS_AUTO_SCROLL);
    if (storageAutoScroll === 'true') {
      setisAutoScroll(true);
    }
    const storageReader: InitParamsReader = getSrorageJSON(PARAMSREADER);
    if (storageReader?.timer?.timeSave) {
      const dateSave = new Date(storageReader.timer.timeSave);
      if (dateSave >= new Date()) {
        setTextIsRead(0);
      }
    }
  }, []);

  useEffect(() => {
    if (!book || !book.book) return;
    let isCancelled = false;
    if (!translate.translate) {
      setTextBook(book.book);
    } else {
      const translateText = async (
        bookTranslate: string[],
        earlyExitIndex?: number
      ) => {
        const allTextBook: string[] = [];
        setIsLoding(true);
        try {
          for (let index = 0; index < bookTranslate.length; index++) {
            if (isCancelled) return;
            const result = await translateGoogle(bookTranslate[index]);
            allTextBook.push(result);

            if (earlyExitIndex !== undefined && index === earlyExitIndex) {
              setTextBook([...allTextBook]);
              return;
            }
          }
        } catch (error) {
          console.error(`Error translating text at index `, error);
        } finally {
          setIsLoding(false);
        }
        setTextBook([...allTextBook]);
      };

      translateText(book.book, 20).then(() => translateText(book.book));
    }
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
        backgroundColor: colorMode.styleText.BgColor,
        paddingInline: colorMode.styleText.BkPadding + '%',
        minHeight: '100vh',
        maxHeight: '100%',
      }}
    >
      {isLoding && <Loader font="10px" position="fixed" />}
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
              color: colorMode.styleText.TextBook,
              fontSize: colorMode.styleText.FontSize + 'px',
              backdropFilter: textIsRead === index ? 'blur(10px)' : undefined,
              filter: textIsRead === index ? 'invert(1)' : undefined,
              marginBottom: colorMode.styleText.TextMargin + 'px',
              lineHeight: colorMode.styleText.TextLineHeight,
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
