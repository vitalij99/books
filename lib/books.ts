'use client';
import { getStorageAr, setStorage } from '@/lib/getStorage';
import { BooksSaveDB } from '@/types/book';

export const findSaveBook = (
  saveBooks: BooksSaveDB[],
  pathnameBook: string[]
) => {
  return saveBooks.find(book => {
    if (book.title === pathnameBook[2]) return book;
  });
};
export const findSaveChapter = (book: BooksSaveDB, pathnameBook: string[]) => {
  if (book.title === pathnameBook[2]) {
    return book.chapter?.find(chapter => chapter === pathnameBook[3]);
  }
};
export const setHistoryBooks = (url: string, title: string) => {
  const storage = getStorageAr('historybooks');

  const link = url.split('/').slice(3).join('/');
  const book = {
    title,
    link,
    time: new Date(),
  };

  const isDuplicate = storage.some(
    (item: { title: string }) => item.title === book.title
  );
  if (!isDuplicate) {
    const updatedStorage = [book, ...storage];
    if (updatedStorage.length > 10) {
      updatedStorage.splice(10);
    }

    setStorage(updatedStorage, 'historybooks');
  }
};
export const getTimeHistoryDifference = (dateSave: string) => {
  const date = new Date(dateSave);
  if (!date) return '';

  const dateNow = new Date();
  const diffInMs = Math.abs(dateNow.getTime() - date.getTime());

  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  if (hours >= 24) {
    return `${Math.floor(hours / 24)} д. ${
      hours - Math.floor(hours / 24) * 24
    } год.`;
  } else if (hours === 0) {
    return `${String(minutes).padStart(2, '0')} хв.`;
  } else {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}`;
  }
};
