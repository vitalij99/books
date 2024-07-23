'use client';
import { deleteSaveBooks, getSaveBooks, setSaveBook } from '@/lib/db';

import { BooksSaveDB } from '@/types/book';
import { Button } from '@mui/material';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SaveBook = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSaveDB[]>();

  const [stringPathname, setStringPathname] = useState<string[]>([]);

  const [isAdded, setIsAdded] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    getSaveBooks().then(data => setSaveBooks(data));
  }, [pathname]);
  useEffect(() => {
    if (!saveBooks) return;
    const nameBook = pathname.split('/');
    setStringPathname(nameBook);

    const res = findSaveBook(saveBooks, nameBook);

    setIsAdded(res ? true : false);
  }, [pathname, saveBooks]);

  const handleSaveBook = async () => {
    if (!saveBooks || !stringPathname) return;

    try {
      if (isAdded) {
        const res = findSaveBook(saveBooks, stringPathname);

        if (res && res.id) {
          const result = await deleteSaveBooks(res.id);
          setSaveBooks(result);
          setIsAdded(false);
        }
      } else if (pathname.startsWith('/books/')) {
        const web = search.get('web');
        if (!web) return;

        const book = {
          title: stringPathname[2],
          link: `${pathname}?web=${web}`,
          chapter: stringPathname[3] ? Number(stringPathname[3]) : 0,
        };
        const newBook = await setSaveBook({
          title: book.title,
          link: book.link,
          chapter: [Number(book.chapter)],
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

  if (stringPathname.length < 3) {
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

const findSaveBook = (saveBooks: BooksSaveDB[], pathnameBook: string[]) => {
  return saveBooks.find(book => {
    if (pathnameBook.length >= 3) {
      if (book.title === pathnameBook[2]) {
        return book.chapter?.find(
          chapter => chapter === Number(pathnameBook[3])
        );
      }
    } else return undefined;
  });
};
