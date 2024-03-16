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

    const savedBooksString = localStorage.getItem('savedBooks');

    if (savedBooksString) {
      const savedBooksData = JSON.parse(savedBooksString);
      setSaveBooks(savedBooksData);
    }
  }, [pathname]);
  useEffect(() => {
    const nameBook = pathname.split('/');
    const isSaveBook = saveBooks.find(book => book.title === nameBook[2]);

    setIsAdded(isSaveBook ? true : false);
  }, [pathname, saveBooks]);

  const handleSaveBook = () => {
    if (pathname.startsWith('/books/')) {
      const nameBook = pathname.split('/');
      const web = search.get('web');

      const book = {
        title: nameBook[2],
        link: `${pathname}?web=${web}`,
        chapter: nameBook[3] ? nameBook[3] : undefined,
      };

      setSaveBooks(prevBooks => {
        const updatedBooks = [...prevBooks, book];
        setStorage(JSON.stringify(updatedBooks), 'savedBooks');

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
