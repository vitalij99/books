'use client';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@mui/material';
import {
  getSaveBooks,
  setSaveBook,
  updateChapter,
  updateChapterLastReader,
} from '@/lib/db';
import { findSaveBook, findSaveChapter, setHistoryBooks } from '@/lib/books';

import { BookSaveDB, BooksSaveDB } from '@/types/book';
import { BookInfoContext } from '@/Providers/BookInfoProvider';
import Loader from '@/app/_compon/Loader/Loader';

interface ExtendedBooksSaveDB extends BookSaveDB {
  thisChapter?: string;
}

const SaveBook = () => {
  const { data: session } = useSession();

  const [saveBooks, setSaveBooks] = useState<BooksSaveDB>([]);

  const [stringPathname, setStringPathname] = useState<string[]>([]);

  const [bookSaveDB, setBookSaveDB] = useState<ExtendedBooksSaveDB>();
  const [isAdded, setIsAdded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const bookContext = useContext(BookInfoContext);

  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    if (!session) return;

    if (!pathname.startsWith('/books')) return;
    (async () => {
      const data = await getSaveBooks();
      setSaveBooks(data || []);
    })();
  }, [pathname, session]);

  useEffect(() => {
    if (!pathname.startsWith('/books')) return;

    const nameBook = pathname.split('/');
    setStringPathname(nameBook);

    const title = bookContext.bookInfo?.title || nameBook[2];
    setHistoryBooks(window.location.href, title);
  }, [pathname, bookContext.bookInfo?.title]);

  useEffect(() => {
    if (!saveBooks.length) return;

    const nameBook = pathname.split('/');
    const matchedBook = findSaveBook(saveBooks, nameBook);

    if (nameBook.length > 3 && matchedBook) {
      const currentChapter = findSaveChapter(matchedBook, nameBook);

      setBookSaveDB({ ...matchedBook, thisChapter: currentChapter });
      setIsAdded(!!currentChapter);
    } else {
      setBookSaveDB(matchedBook || undefined);
      setIsAdded(!!matchedBook);
    }
  }, [pathname, saveBooks]);

  useEffect(() => {
    if (bookSaveDB && stringPathname[3]) {
      const lastReadChapter = stringPathname[3];
      updateChapterLastReader(bookSaveDB.id, lastReadChapter);
    }
  }, [bookSaveDB, stringPathname]);

  const handleSaveBook = async () => {
    if (isProcessing) return;
    if (!saveBooks || !stringPathname.length) return;

    const web = search.get('web');
    if (!web || !pathname.startsWith('/books')) return;

    const bookTitle = stringPathname[2];
    const chapter = stringPathname[3] || undefined;

    try {
      if (isAdded && bookSaveDB) {
        const updatedChapters = bookSaveDB.chapter?.filter(
          ch => ch !== bookSaveDB.thisChapter
        );
        const result = await updateChapter(
          bookSaveDB.id,
          updatedChapters || []
        );
        if (result) setIsAdded(false);
      } else {
        const newBookData = {
          title: bookTitle,
          link: `books/${bookTitle}?web=${web}`,
          web,
          chapter: chapter ? [chapter] : undefined,
        };

        if (bookSaveDB && chapter) {
          const updatedChapters = bookSaveDB.chapter
            ? [...bookSaveDB.chapter, chapter]
            : [chapter];
          const result = await updateChapter(bookSaveDB.id, updatedChapters);
          if (result) setIsAdded(true);
        } else {
          const newBook = await setSaveBook(newBookData);

          if (newBook) {
            setSaveBooks(prevBooks => [...(prevBooks || []), newBook]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!session || stringPathname.length < 3) {
    return null;
  }

  return (
    <>
      {isProcessing ? (
        <Loader />
      ) : (
        <Button onClick={handleSaveBook}>
          <Image
            src={isAdded ? '/save-book.svg' : '/save-book-add.svg'}
            alt="зберегти книжку"
            width={24}
            height={24}
          />
        </Button>
      )}
    </>
  );
};

export default SaveBook;
