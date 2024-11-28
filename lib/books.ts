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
