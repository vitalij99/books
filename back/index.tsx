'use server';

import novelbin from '@/back/novelbin';
import { novelfire } from '@/back/novelfire';
import { scribblehub } from '@/back/scribblehub';

import { ListbooksProps } from '@/types/book';

const WEBSITE = {
  novelfire: 'novelfire',
  novelbin: 'novelbin',
  scribblehub: scribblehub.web,
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

    const resScribblehub = await scribblehub.getBookSearchByName({ name });
    result.push(resScribblehub);

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

    const resNovelbin = await novelbin.getBookPopular();
    result.push(resNovelbin);

    const resScribblehub = await scribblehub.getBookPopular();
    result.push(resScribblehub);

    // const resHelheimscan = await helheimscan.getBookPopular();
    // result.push(resHelheimscan);

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
  if (web === WEBSITE.scribblehub) {
    return await scribblehub.getBookLinks({ book });
  }
  // if (web === WEBSITE.helheimscan) {
  //   return await helheimscan.getBookLinks({ book });
  // }
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
    if (web === WEBSITE.scribblehub) {
      return await scribblehub.getBookFromLink({ book, chapter });
    }
    // if (web === WEBSITE.helheimscan) {
    //   return await helheimscan.getBookFromLink({ book, chapter });
    // }
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
      return await novelbin.getBookImageLink({ book });
    }
    if (web === WEBSITE.scribblehub) {
      return await scribblehub.getBookImageLink({ book });
    }
    // if (web === WEBSITE.helheimscan) {
    //   return await helheimscan.getBookImageLink({ book });
    // }
  } catch (error) {
    console.log(error);
  }
};
