'use client';

import { getSrorageJSON, getStorage, setStorage } from '@/lib/getStorage';

import { setRootValue } from '@/lib/setRootValue';
import { translateGoogle } from '@/lib/translate';
import { AllowedKeys, MENUSTYLEDTEXT, StorageType } from '@/types/book';
import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { getBookFromLinkAll } from '@/back';
import { TranslateContext } from '@/Providers/TranslateProvider';
import Reader from '@/app/_compon/Reader/Reader';
import NavigationPages from '@/app/_compon/NavigationPages/NavigationPages';
import ItemList from '@/app/_compon/ItemList/ItemList';
import React from 'react';
import { InitParamsReader, PARAMSREADER } from '@/types/reader';

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

const BookRead = ({
  params,
  searchParams,
}: {
  params: { chapter: string; book: string };
  searchParams: { [key: string]: string | '' };
}) => {
  const [data, setData] = useState<BookProps>();
  const [textBook, setTextBook] = useState(['loading']);
  const [textIsRead, setTextIsRead] = useState(-1);
  const [isAutoScroll, setisAutoScroll] = useState(false);

  const translate = useContext(TranslateContext);

  useEffect(() => {
    const storage: StorageType = getSrorageJSON(MENUSTYLEDTEXT);
    if (storage) {
      for (const cssKey in storage) {
        if (cssKey.startsWith('--')) {
          setRootValue(cssKey, storage[cssKey as keyof StorageType]);
        }
      }
    }

    const storageAutoScroll = getStorage(IS_AUTO_SCROLL);

    if (storageAutoScroll === 'true') {
      setisAutoScroll(true);
    }

    const storageReader: InitParamsReader = getSrorageJSON(PARAMSREADER);

    if (storage && storageReader.timer.timeSave) {
      const dateSave = new Date(storageReader.timer.timeSave);
      const date2 = new Date();

      if (dateSave >= date2) {
        setTextIsRead(0);
      }
    }
  }, []);

  useEffect(() => {
    const getBook = async () => {
      const result = await getBookFromLinkAll({
        chapter: params.chapter,
        book: params.book,
        web: searchParams.web,
      });
      if (result) {
        setData(result);
      }
    };
    getBook();
  }, [params.book, params.chapter, searchParams.web]);

  useEffect(() => {
    async function getTranslate(bookTranslate: string | any[]) {
      const allTextBook: string[] = [];

      for (let index = 0; index < bookTranslate.length; index++) {
        const element = bookTranslate[index];
        const result = await translateGoogle(element);
        allTextBook.push(...result);
        if (index === 20) {
          setTextBook(allTextBook);
        }
      }

      setTextBook(allTextBook);
    }

    if (!data || !data.book) {
      return;
    }
    if (translate.translate) {
      getTranslate(data.book);
    } else setTextBook(data.book);
  }, [data, translate.translate]);

  // autoScroll
  useEffect(() => {
    if (!isAutoScroll) return;

    const paragraf = document.getElementsByClassName(IS_AUTO_SCROLL);

    paragraf[0]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
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

  if (!data || !textBook) {
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
        srcNextPage={data.nav.nextPage}
      />

      <NavigationPages
        navigate={data.nav}
        title={params.book}
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
        navigate={data.nav}
        title={params.book}
        charpter={params.chapter}
      />
    </Box>
  );
};

export default BookRead;
