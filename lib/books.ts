'use client';
import { getStorageAr, setStorage } from '@/lib/getStorage';
import { AllowedKeys, BookSaveDB, BooksSaveDB } from '@/types/book';

export const findSaveBook = (
  saveBooks: BooksSaveDB,
  pathnameBook: string[]
) => {
  return saveBooks.find(book => {
    if (book.title === pathnameBook[2]) return book;
  });
};
export const findSaveChapter = (book: BookSaveDB, pathnameBook: string[]) => {
  if (book.title === pathnameBook[2]) {
    return book.chapter?.find(chapter => chapter === pathnameBook[3]);
  }
};
export const setHistoryBooks = (url: string, title: string) => {
  const storage = getStorageAr(AllowedKeys.HistoryBooks);

  const link = url.split('/').slice(3).join('/');
  const book = {
    title,
    link,
    time: new Date(),
  };

  const isDuplicateIndex = storage.findIndex(
    (item: { title: string }) => item.title === book.title
  );

  if (isDuplicateIndex === -1) {
    const updatedStorage = [book, ...storage];

    updatedStorage.splice(10);
    setStorage(updatedStorage, AllowedKeys.HistoryBooks);
  } else {
    const updatedStorage = [book, ...storage];
    updatedStorage.splice(isDuplicateIndex + 1, 1);

    setStorage(updatedStorage, AllowedKeys.HistoryBooks);
  }
};
export const getTimeHistoryDifference = (dateSave: string) => {
  const date = new Date(dateSave);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffInMs = Math.abs(now.getTime() - date.getTime());

  const totalMinutes = Math.floor(diffInMs / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (totalHours >= 24) {
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    return `${days} д. ${hours} год.`;
  } else if (totalHours === 0) {
    return `${String(minutes).padStart(2, '0')} хв.`;
  } else {
    return `${String(totalHours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}`;
  }
};

export const textShorten = (text: string, num = 20) => {
  return text.length >= num ? text.slice(0, num) + '...' : text;
};
