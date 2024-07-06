'use server';
import {
  getBookFromLink as getBookFromLinkFromNovelFire,
  getBookLinks as getBookLinksFromNovelFire,
  getBookSearchByName as getBookSearchByNameFromNovelFire,
  getBookPopular as getBookPopularFromNovelFire,
} from './novelfire';
import { ListbooksProps } from '@/types/book';

const WEBSITE = {
  novelfire: 'novelfire',
};

export const getBookSearchByNameAll = async ({
  name = '',
}: {
  name: string;
}) => {
  try {
    const result: ListbooksProps[] = [];

    const novelfire = await getBookSearchByNameFromNovelFire({ name });

    result.push(novelfire);

    return result;
  } catch (error) {
    return [{ books: [], web: 'novelfire' }];
  }
};

export const getBooksPopularAll = async () => {
  try {
    const result: ListbooksProps[] = [];

    const novelfire = await getBookPopularFromNovelFire();

    result.push(novelfire);

    return result;
  } catch (error) {
    return [{ books: [], web: 'novelfire' }];
  }
};

export const getBookLinksAll = async ({
  book,
  web,
}: {
  book: string;
  web: string;
}) => {
  if (web === WEBSITE.novelfire) {
    return await getBookLinksFromNovelFire({ book });
  }
};
export const getBookFromLinkAll = async ({
  chapter,
  book,
  web,
}: {
  book: string;
  chapter: string;
  web: string;
}) => {
  if (web === WEBSITE.novelfire) {
    return await getBookFromLinkFromNovelFire({ book, chapter });
  }
};
