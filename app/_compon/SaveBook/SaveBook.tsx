'use client';
import { getStorage, setStorage } from '@/lib/getStorage';
import { BooksSave } from '@/type/book';
import { Button, SvgIcon } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SaveBook = () => {
  const [saveBooks, setSaveBooks] = useState<BooksSave[]>([]);
  const [isBooksPath, setIsBooksPath] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    setIsBooksPath(pathname.startsWith('/books/'));

    const savedBooks = getStorage('savedBooks');

    if (savedBooks) {
      setSaveBooks(JSON.parse(savedBooks));
    }
  }, [pathname]);
  useEffect(() => {
    const nameBook = pathname.split('/');

    const res = findSaveBook(saveBooks, nameBook);

    setIsAdded(res ? true : false);
  }, [pathname, saveBooks]);

  const handleSaveBook = () => {
    const nameBook = pathname.split('/');

    if (isAdded) {
      const updateBooks = findAndRemoveBook(saveBooks, nameBook);
      setSaveBooks(updateBooks);
      setIsAdded(false);
      setStorage(updateBooks, 'savedBooks');
    } else if (pathname.startsWith('/books/')) {
      setSaveBooks(prevBooks => {
        const web = search.get('web');

        const book = {
          title: nameBook[2],
          link: `${pathname}?web=${web}`,
          chapter: nameBook[3] ? nameBook[3] : undefined,
        };
        const updatedBooks = [...prevBooks, book];
        setStorage(updatedBooks, 'savedBooks');

        return updatedBooks;
      });
    }
  };
  if (!isBooksPath) {
    return <></>;
  }
  return (
    <Button onClick={handleSaveBook}>
      <SaveBookSvg isSave={isAdded} />
    </Button>
  );
};

export default SaveBook;

const SaveBookSvg = ({ isSave = false }) => {
  if (isSave) {
    return (
      <SvgIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 30 30"
        >
          <path d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"></path>
        </svg>
      </SvgIcon>
    );
  }

  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 50 50"
        fill="none"
        stroke="#fff"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 13 2 A 1.0001 1.0001 0 0 0 12 3 L 12 47 A 1.0001 1.0001 0 0 0 13.503906 47.863281 L 25 41.158203 L 36.496094 47.863281 A 1.0001 1.0001 0 0 0 38 47 L 38 3 A 1.0001 1.0001 0 0 0 37 2 L 13 2 z M 14 4 L 36 4 L 36 45.259766 L 25.503906 39.136719 A 1.0001 1.0001 0 0 0 24.496094 39.136719 L 14 45.259766 L 14 4 z"
        ></path>
      </svg>
    </SvgIcon>
  );
};

const findSaveBook = (saveBooks: BooksSave[], pathnameBook: string[]) => {
  return saveBooks.find(book => {
    if (pathnameBook.length >= 3) {
      if (book.chapter === pathnameBook[3] && book.title === pathnameBook[2])
        return book;
    } else if (book.title === pathnameBook[2]) {
      return book;
    }
    return undefined;
  });
};
const findAndRemoveBook = (saveBooks: BooksSave[], pathnameBook: string[]) => {
  const indexToRemove = saveBooks.findIndex(book => {
    if (pathnameBook.length >= 3) {
      return book.chapter === pathnameBook[3] && book.title === pathnameBook[2];
    } else {
      return book.title === pathnameBook[2];
    }
  });

  if (indexToRemove !== -1) {
    saveBooks.splice(indexToRemove, 1);
  }
  return saveBooks;
};
