'use server';

// import { novelbin } from '@/back/novelbin';
import { novelfire } from '@/back/novelfire';
import { scribblehub } from '@/back/scribblehub';
import { webnovel } from '@/back/webnovel';

import { ListBooksCardProps } from '@/types/book';

const sourcesAll = [novelfire, scribblehub, webnovel];

export const getBookSearchByNameAll = async ({
  name = '',
}: {
  name: string;
}) => {
  if (!name) return [];

  const result: ListBooksCardProps[] = [];

  try {
    const fetchPromises = sourcesAll.map(async web => {
      try {
        const data = await web.getBookSearchByName({ name });

        result.push(data);
      } catch (error) {
        console.error(`Error fetching books from ${web}:`, error);
        const errorResult = { books: [], web: web.web };
        result.push(errorResult);
      }
    });

    await Promise.all(fetchPromises);
    return result;
  } catch (error) {
    console.error('Unexpected error in getBookSearchByNameAll:', error);
    return [{ books: [], web: 'unknown' }];
  }
};

// TODO add Promise.all
export const getBooksPopularAll = async (): Promise<ListBooksCardProps[]> => {
  const result: ListBooksCardProps[] = [];

  try {
    const fetchPromises = sourcesAll.map(async web => {
      try {
        const data = await web.getBookPopular();

        result.push(data);
      } catch (error) {
        console.error(`Error fetching popular books from ${web}:`, error);

        const errorResult = { books: [], web: web.web };
        result.push(errorResult);
      }
    });

    await Promise.all(fetchPromises);
    return result;
  } catch (error) {
    console.error('Unexpected error in getBooksPopularAll:', error);
    return [{ books: [], web: 'unknown' }];
  }
};

// on page book
export const getBookLinksAll = async ({
  book,
  web,
}: {
  book: string;
  web: string;
}) => {
  const source = sourcesAll.find(source => source.web === web);

  if (!source) {
    throw new Error(`Unsupported web source: ${web}`);
  }

  try {
    return await source.getBookLinks({ book });
  } catch (error) {
    console.error(`Error fetching book links from ${web}:`, error);
    throw new Error(`Failed to fetch book links from ${web}`);
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
  const source = sourcesAll.find(source => source.web === web);

  if (!source) {
    throw new Error(`Unsupported web source: ${web}`);
  }

  try {
    return await source.getBookFromLink({ book, chapter });
  } catch (error) {
    console.error(`Error fetching book links from ${web}:`, error);
    throw new Error(`Failed to fetch book links from ${web}`);
  }
};

export const getBookImageLinkAll = async ({
  book,
  web,
}: {
  book: string;
  web: string;
}) => {
  const source = sourcesAll.find(source => source.web === web);

  if (!source) {
    throw new Error(`Unsupported web source: ${web}`);
  }

  try {
    return await source.getBookImageLink({ book });
  } catch (error) {
    console.error(`Error fetching book links from ${web}:`, error);
    throw new Error(`Failed to fetch book links from ${web}`);
  }
};

export const getBooksFromTagsAll = async ({ name = '' }: { name: string }) => {
  const result: ListBooksCardProps[] = [];

  const promiseAll = sourcesAll.map(async web => {
    try {
      const data = await web.getBooksFromTags({ name });
      result.push(data);
    } catch (error) {
      console.error(`Error fetching books from ${web}:`, error);
      result.push({ books: [], web: web.web });
    }
  });

  await Promise.all(promiseAll);
  return result;
};

export const getBooksByGenreAll = async ({ name = '' }: { name: string }) => {
  const result: ListBooksCardProps[] = [];

  const promiseAll = sourcesAll.map(async web => {
    try {
      const data = await web.getBooksFromGenre({ name });
      result.push(data);
    } catch (error) {
      console.error(`Error fetching books from ${web}:`, error);
      result.push({ books: [], web: web.web });
    }
  });

  await Promise.all(promiseAll);
  return result;
};
