'use server';

import { novelfire } from '@/back/novelfire';
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

    const resNovelfire = await novelfire.getBookSearchByName({ name });

    result.push(resNovelfire);

    return result;
  } catch (error) {
    return [{ books: [], web: 'novelfire' }];
  }
};

export const getBooksPopularAll = async () => {
  try {
    const result: ListbooksProps[] = [];

    const resNovelfire = await novelfire.getBookPopular();

    result.push(resNovelfire);

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
    return await novelfire.getBookLinks({ book });
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
    return await novelfire.getBookFromLink({ book, chapter });
  }
};

export const getBookImageLinkAll = async ({
  book,
  web,
}: {
  book: string;
  web: string;
}) => {
  try {
    if (web === WEBSITE.novelfire) {
      return await novelfire.getBookImageLink({ book });
    }
  } catch (error) {
    return undefined;
  }
};
