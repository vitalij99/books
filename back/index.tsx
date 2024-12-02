'use server';

import { novelbin } from '@/back/novelbin';
import { novelfire } from '@/back/novelfire';
import { scribblehub } from '@/back/scribblehub';
import { webnovel } from '@/back/webnovel';

import { ListBooksCardProps } from '@/types/book';

const WEBSITE = {
  novelfire: novelfire.web,
  novelbin: novelbin.web,
  scribblehub: scribblehub.web,
  webnovel: webnovel.web,
};

const sourcesAll = [novelfire, novelbin, scribblehub, webnovel];

export const getBookSearchByNameAll = async ({
  name = '',
}: {
  name: string;
}) => {
  if (!name) return [];

  const result: ListBooksCardProps[] = [];

  try {
    for (const web of sourcesAll) {
      try {
        const data = await web.getBookSearchByName({ name });
        result.push(data);
      } catch (error) {
        console.error(`Error fetching books from ${web}:`, error);
        result.push({ books: [], web: web.web }); // Include fallback for failed sources
      }
    }
    return result;
  } catch (error) {
    console.error('Unexpected error in getBookSearchByNameAll:', error);
    return [{ books: [], web: 'unknown' }];
  }
};

export const getBooksPopularAll = async (): Promise<ListBooksCardProps[]> => {
  const result: ListBooksCardProps[] = [];

  try {
    const sources = [
      { web: 'novelfire', fetch: novelfire.getBookPopular },
      { web: 'novelbin', fetch: novelbin.getBookPopular },
      { web: 'scribblehub', fetch: scribblehub.getBookPopular },
    ];

    for (const { web, fetch } of sources) {
      try {
        const data = await fetch();
        result.push(data);
      } catch (error) {
        console.error(`Error fetching popular books from ${web}:`, error);
        result.push({ books: [], web }); // Include empty results for failed sources
      }
    }

    return result;
  } catch (error) {
    console.error('Unexpected error in getBooksPopularAll:', error);
    return [{ books: [], web: 'unknown' }];
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
  } catch (error) {
    console.log(error);
  }
};
export const getBooksFromTagsAll = async ({ name = '' }: { name: string }) => {
  const result: ListBooksCardProps[] = [];
  try {
    const resNovelfire = await novelfire.getBooksFromTags({ name });
    result.push(resNovelfire);

    const resNovelbin = await novelbin.getBooksFromTags({ name });
    result.push(resNovelbin);

    const resScribblehub = await scribblehub.getBooksFromTags({ name });
    result.push(resScribblehub);

    return result;
  } catch (error) {
    return [{ books: [], web: 'novelfire' }];
  }
};
export const getBooksByGenreAll = async ({ name = '' }: { name: string }) => {
  const result: ListBooksCardProps[] = [];
  try {
    const resNovelfire = await novelfire.getBooksFromGenre({ name });
    result.push(resNovelfire);

    const resNovelbin = await novelbin.getBooksFromGenre({ name });
    result.push(resNovelbin);

    const resScribblehub = await scribblehub.getBooksFromGenre({ name });
    result.push(resScribblehub);

    return result;
  } catch (error) {
    return [{ books: [], web: 'novelfire' }];
  }
};
