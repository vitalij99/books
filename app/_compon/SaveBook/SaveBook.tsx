'use client';
import { getSaveBooks, setSaveBook } from '@/lib/db';

import { BooksSaveDB } from '@/types/book';
import { Button } from '@mui/material';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// TODO rework remove
const SaveBook = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>();

  const [isAdded, setIsAdded] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    getSaveBooks().then(data => setSaveBooks(data));
  }, [pathname]);
  useEffect(() => {
    if (!saveBooks) return;
    const nameBook = pathname.split('/');

    const res = findSaveBook(saveBooks, nameBook);

    setIsAdded(res ? true : false);
  }, [pathname, saveBooks]);

  const handleSaveBook = async () => {
    const nameBook = pathname.split('/');

    try {
      if (isAdded) {
        // TODO
        // setIsAdded(false);
      } else if (pathname.startsWith('/books/')) {
        const web = search.get('web');
        if (!web) return;

        const book = {
          title: nameBook[2],
          link: `${pathname}?web=${web}`,
          chapter: nameBook[3] ? nameBook[3] : undefined,
        };
        const newBook = await setSaveBook({
          title: book.title,
          link: book.link,
          chapter: Number(book.chapter),
          web,
        });

        if (newBook) {
          setSaveBooks(prevBooks =>
            prevBooks ? [...prevBooks, newBook] : [newBook]
          );
        }
      }
    } catch (error) {}
  };

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

const findSaveBook = (saveBooks: BooksSaveDB[], pathnameBook: string[]) => {
  return saveBooks.find(book => {
    if (pathnameBook.length >= 3) {
      if (
        book.chapter === Number(pathnameBook[3]) &&
        book.title === pathnameBook[2]
      )
        return book;
    } else if (book.title === pathnameBook[2]) {
      return book;
    }
    return undefined;
  });
};
const findAndRemoveBook = (
  saveBooks: BooksSaveDB[],
  pathnameBook: string[]
) => {
  const indexToRemove = saveBooks.findIndex(book => {
    if (pathnameBook.length >= 3) {
      return (
        book.chapter === Number(pathnameBook[3]) &&
        book.title === pathnameBook[2]
      );
    } else {
      return book.title === pathnameBook[2];
    }
  });

  if (indexToRemove !== -1) {
    saveBooks.splice(indexToRemove, 1);
  }
  return saveBooks;
};
