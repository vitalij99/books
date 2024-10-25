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
