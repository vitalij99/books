import {
  getBookFromLink as getBookFromLinkFromNovelMin,
  getBookLinks as getBookLinksFromNovelMin,
  getBookSearchByName as getBookSearchByNameFromNovelMin,
} from './novelmin';
import {
  getBookFromLink as getBookFromLinkFromNovelFire,
  getBookLinks as getBookLinksFromNovelFire,
  getBookSearchByName as getBookSearchByNameFromNovelFire,
} from './novelfire';
import { ListbooksProps } from '@/type/book';

const WEBSITE = {
  novelmin: 'novelmin',
  novelfire: 'novelfire',
};

export const getBookSearchByNameAll = async ({
  name = '',
}: {
  name: string;
}) => {
  console.log('start getBookSearchByNameAll');

  const result: ListbooksProps[] = [];

  const novelmin = await getBookSearchByNameFromNovelMin({ name });
  // const novelfire = await getBookSearchByNameFromNovelFire({ name });

  result.push(novelmin);
  // result.push(novelfire);

  return result;
};

export const getBookLinksAll = async ({
  book,
  web,
}: {
  book: string;
  web: string;
}) => {
  if (web === WEBSITE.novelmin) {
    return await getBookLinksFromNovelMin({ book });
  } else if (web === WEBSITE.novelfire) {
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
  if (web === WEBSITE.novelmin) {
    return await getBookFromLinkFromNovelMin({ book, chapter });
  } else if (web === WEBSITE.novelfire) {
    return await getBookFromLinkFromNovelFire({ book, chapter });
  }
};
