import { BookInfoType } from '@/types/book';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://www.webnovel.com/';
const web = 'webnovel';

const getBookPopular = async () => {
  // https://www.webnovel.com/ranking/novel/all_time/popular_rank
  const linkSearch = `${link}ranking/novel/all_time/popular_rank`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksListType(textData);
};
const getBooksListType = (textData: string) => {
  try {
    const result = transformInHtml({
      html: textData,
      elem: '.j_rank_wrapper section',
    });
    if (!result) throw new Error();
    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    result.forEach(link => {
      if (link !== null) {
        const name = link.querySelector('img')?.getAttribute('alt') || '';
        const image = link.querySelector('img');

        const modifiedImg = image?.getAttribute('data-original');
        const img = 'https:' + modifiedImg || '';
        const book =
          link.querySelector('a')?.getAttribute('data-report-did') || '';

        if (book) {
          linkInfoArray.push({ name, book, img });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    console.log('web error:', error);
    return { books: [], web };
  }
};
const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://www.webnovel.com/search?keywords=barb
  const linkSearch = `${link}search?keywords=${name}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksListSearch(textData);
};
const getBooksListSearch = (textData: string) => {
  try {
    const result = transformInHtml({
      html: textData,
      elem: '.search-result-container li',
    });
    if (!result) throw new Error();
    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    result.forEach(link => {
      if (link !== null) {
        const name = link.querySelector('h3')?.textContent || '';
        const image = link.querySelector('img');

        const modifiedImg = image?.getAttribute('src');
        const img = 'https:' + modifiedImg || '';
        const book = link.querySelector('a')?.getAttribute('data-bookid') || '';

        if (book) {
          linkInfoArray.push({ name, book, img });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    console.log('web error:', error);
    return { books: [], web };
  }
};
const getBookLinks = async ({ book }: { book: string }) => {
  // https://www.webnovel.com/book/30240152305644005/catalog

  const linksBook = await getBooksChaptersLink({ book });
  if (!linksBook) return undefined;

  const bookInfo: BookInfoType = await getBookInfoLink({ book });

  return {
    linksBook,
    web,
    bookHref: book,
    bookInfo,
  };
};

const getBooksChaptersLink = async ({ book }: { book: string }) => {
  // https://www.webnovel.com/book/30240152305644005/catalog
  const linkBook = `${link}book/${book}/catalog`;

  const res = await fetch(linkBook);

  const data = await res.text();

  const result = transformInHtml({
    html: data,
    elem: '.volume-item a',
  });
  if (!result) return undefined;

  const linksBook = [];

  for (let i = 0; i < result.length; i++) {
    const parag = result[i];
    const url = parag.getAttribute('href');
    if (url) {
      linksBook.push({
        book: transformLink(url),
        name: parag.getAttribute('title') || parag.textContent,
      });
    }
  }
  return linksBook;
};

const getBookInfoLink = async ({ book }: { book: string }) => {
  // https://www.webnovel.com/book/30240152305644005
  const linkBook = `${link}book/${book}`;
  const data = await fetch(linkBook);
  const textData = await data.text();

  const resultInfo = getBookInfo(textData);
  const image = getBookImage(textData);
  const title = getBookTitle(textData);

  return {
    ...resultInfo,
    image,

    title,
  };
};

const getBookInfo = (textData: string) => {
  try {
    const info = transformInHtml({
      html: textData,
      elem: '.det-info',
    });

    const result = {} as BookInfoType;

    info[0].querySelectorAll('strong').forEach(strong => {
      const title = strong?.textContent.replace(':', '').trim().toLowerCase();

      if (!title) return;

      if (title === 'author') {
        result.author = strong.parentNode
          ?.querySelector('span')
          ?.textContent.trim();
      } else if (title.includes('chapters')) {
        result.chapters = strong.textContent;
      }
    });

    return result;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};

const getBookImage = (textData: string) => {
  const info = transformInHtml({
    html: textData,
    elem: 'i.g_thumb img ',
  });

  const modifiedImg = info[0]?.getAttribute('src');
  const result = 'https:' + modifiedImg || '';

  return result;
};
const getBookTitle = (textData: string) => {
  const info = transformInHtml({
    html: textData,
    elem: 'i.g_thumb img ',
  });

  const title = info[0]?.getAttribute('alt') || '';

  return title;
};

const getBookFromLink = async ({
  book,
  chapter,
}: {
  book: string;
  chapter: string;
}) => {
  // https://www.webnovel.com/book/22883421205730405/61427216130562225
  const linkBook = reTransformLink(book, chapter);
  const res = await fetch(linkBook);

  const data = await res.text();

  const result = transformInHtml({
    html: data,
    elem: '.cha-content p',
  });

  if (!result) return undefined;

  const allText = result.map(parag => parag.textContent);

  // next page

  const chapters = await getBooksChaptersLink({ book });
  if (!chapters) return;

  let corentIndex = 0;

  for (let index = 0; index < chapters.length; index++) {
    if (chapters[index].book === chapter) {
      corentIndex = index;
      break;
    }
  }

  const prevPage = chapters[corentIndex - 1];
  const nextPage = chapters[corentIndex + 1];

  const prevText = prevPage ? prevPage.name : 'Попередння';
  const nextText = nextPage ? nextPage.name : 'Наступна';

  const nav = {
    nextPage: nextPage && transformLink(nextPage.book) + `?web=${web}`,
    prevPage: prevPage && transformLink(prevPage.book) + `?web=${web}`,
    nextText,
    prevText,
  };

  return { book: allText, nav };
};
const getBookImageLink = async ({ book }: { book: string }) => {
  const linkBook = `${link}book/${book}`;
  const data = await fetch(linkBook);
  const textData = await data.text();

  return await getBookImage(textData);
};

const transformLink = (url: string) => {
  const arr = url.split('/');
  return arr[arr.length - 1];
};
const reTransformLink = (book: string, chapter: string) => {
  // https://www.webnovel.com/book/22883421205730405/61427216130562225
  return `${link}book/${book}/${chapter}`;
};
// TODO
const getBooksFromGenre = async ({ name }: { name: string }) => {
  // https://novelbin.com/genre/adventure
  const linkSearch = `${link}genre/${name.toLocaleLowerCase()}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksListType(textData);
};
const getBooksFromTags = async ({ name }: { name: string }) => {
  // https://novelbin.com/tag/MODERN%20DAY
  const linkSearch = `${link}tag/${name.toLocaleUpperCase()}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksListType(textData);
};

export const webnovel = {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
  getBookPopular,
  getBooksFromTags,
  getBooksFromGenre,
  web,
};
