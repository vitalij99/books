'use server';

import novelbin from '@/back/novelbin';
import { novelfire } from '@/back/novelfire';
import { ListbooksProps } from '@/types/book';

const WEBSITE = {
  novelfire: 'novelfire',
  novelbin: 'novelbin',
};

export const getBookSearchByNameAll = async ({
  name = '',
}: {
  name: string;
}) => {
  const result: ListbooksProps[] = [];
  try {
    const resNovelfire = await novelfire.getBookSearchByName({ name });

    result.push(resNovelfire);
    const resNovelbin = await novelbin.getBookSearchByName({ name });
    result.push(resNovelbin);

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
  if (web === WEBSITE.novelbin) {
    return await novelbin.getBookLinks({ book });
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
  try {
    if (web === WEBSITE.novelfire) {
      return await novelfire.getBookFromLink({ book, chapter });
    }
    if (web === WEBSITE.novelbin) {
      return await novelbin.getBookFromLink({ book, chapter });
    }
  } catch (error) {
    console.log(error);
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
    if (web === WEBSITE.novelbin) {
      return await novelbin.getBookLinks({ book });
    }
  } catch (error) {
    return undefined;
  }
};
