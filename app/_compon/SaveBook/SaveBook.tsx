'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { findSaveBook, findSaveChapter, setHistoryBooks } from '@/lib/books';
import {
  getSaveBooks,
  setSaveBook,
  updateChapter,
  updateChapterLastReader,
} from '@/lib/db';

import { BooksSaveDB } from '@/types/book';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

interface ExtendedBooksSaveDB extends BooksSaveDB {
  thisChapter?: string;
}

const SaveBook = () => {
  const { data: session } = useSession();

  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>();

  const [stringPathname, setStringPathname] = useState<string[]>([]);

  const [bookSaveDB, setBookSaveDB] = useState<ExtendedBooksSaveDB>();
  const [isAdded, setIsAdded] = useState(false);

  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!session) return;
    getSaveBooks().then(data => setSaveBooks(data ? data : []));
  }, [pathname, session]);

  useEffect(() => {
    const nameBook = pathname.split('/');
    if (nameBook[1] === 'books') {
      setHistoryBooks(window.location.href, nameBook[2]);
    }
    if (!saveBooks) return;
    setStringPathname(nameBook);

    const res = findSaveBook(saveBooks, nameBook);

    if (nameBook.length > 3 && res) {
      const findSaveBook = findSaveChapter(res, nameBook);

      setBookSaveDB({ ...res, thisChapter: findSaveBook });
      setIsAdded(findSaveBook ? true : false);
    } else {
      setBookSaveDB(res);
      setIsAdded(res ? true : false);
    }
  }, [pathname, saveBooks]);

  useEffect(() => {
    if (!bookSaveDB || !stringPathname[3]) return;

    const lastReadeChapter = stringPathname[3];

    if (lastReadeChapter) {
      updateChapterLastReader(bookSaveDB.id, lastReadeChapter);
    }
  }, [bookSaveDB, stringPathname]);

  const handleSaveBook = async () => {
    if (!saveBooks || !stringPathname) return;

    if (isAdded) {
      if (!bookSaveDB) return;

      if (bookSaveDB && bookSaveDB.chapter) {
        const newCharpters = bookSaveDB.chapter.filter(
          chapter => chapter !== bookSaveDB.thisChapter
        );
        const result = await updateChapter(bookSaveDB.id, newCharpters);
        if (result) {
          setIsAdded(false);
        }
      }
    } else if (pathname.startsWith('/books/')) {
      const web = search.get('web');
      if (!web) return;

      const book = {
        title: stringPathname[2],
        link: `books/${stringPathname[2]}?web=${web}`,
        web,
        chapter: stringPathname[3] ? stringPathname[3] : undefined,
      };

      if (bookSaveDB && book.chapter) {
        const newCharpters = bookSaveDB.chapter
          ? [...bookSaveDB.chapter, book.chapter]
          : [book.chapter];
        const result = await updateChapter(bookSaveDB.id, newCharpters);

        if (result) {
          setIsAdded(true);
        }
      } else {
        const newBook = await setSaveBook({
          title: book.title,
          link: book.link,
          chapter: book.chapter ? [book.chapter] : undefined,
          web,
        });

        if (newBook) {
          setSaveBooks(prevBooks =>
            prevBooks ? [...prevBooks, newBook] : [newBook]
          );
        }
      }
    }
  };

  if (!session || stringPathname.length < 3) {
    return <></>;
  }

  return (
    <Button onClick={handleSaveBook}>
      <Image
        src={isAdded ? '/save-book.svg' : '/save-book-add.svg'}
        alt="зберегти книжку"
        width={24}
        height={24}
      />
    </Button>
  );
};

export default SaveBook;
