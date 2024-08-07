import axios from 'axios';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://novelfire.net/';

const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://novelfire.net/ajax/searchLive?inputContent=Barbarian
  try {
    const linkSearch = `${link}ajax/searchLive?inputContent=${name}`;

    const { data } = await axios.get(linkSearch);

    const result = transformInHtml({
      html: data.html,
      elem: 'li',
    });

    if (!result) throw new Error();

    const links = result.map(item => item.querySelector('a'));

    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    links.forEach(link => {
      if (link !== null) {
        const nameSelector = link.querySelector('.novel-title');
        const name = nameSelector?.textContent || '';
        const href = link.getAttribute('href') || '';
        const book = href.replace(`https://novelfire.net/book/`, '');
        const image = link.querySelector('img');
        const img = image?.getAttribute('src') || '';

        linkInfoArray.push({ name, book, img });
      }
    });

    return { books: linkInfoArray, web: 'novelfire' };
  } catch (error) {
    console.log(error);
    return { books: [], web: 'novelfire' };
  }
};

const getBookPopular = async () => {
  // https://novelfire.net/monthly-rank
  try {
    const linkSearch = `${link}monthly-rank`;

    const { data } = await axios.get(linkSearch);

    const result = transformInHtml({
      html: data,
      elem: '.novel-item',
    });

    if (!result) throw new Error();

    const links = result.map(item => item.querySelector('a'));

    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    // popular have data-src
    links.forEach(link => {
      if (link !== null) {
        const name = link.getAttribute('title') || '';
        const href = link.getAttribute('href') || '';
        const book = href.replace(`https://novelfire.net/book/`, '');
        const image = link.querySelector('img');

        const img = image?.getAttribute('data-src') || '';

        linkInfoArray.push({ name, book, img });
      }
    });

    return { books: linkInfoArray, web: 'novelfire' };
  } catch (error) {
    console.log(error);
    return { books: [], web: 'novelfire' };
  }
};

const getBookLinks = async ({ book }: { book: string }) => {
  const linkBook = `${link}book/${book}/chapters`;

  const { data } = await axios.get(linkBook);

  const result = transformInHtml({
    html: data,
    elem: '.chapter-list',
  });
  if (!result) return undefined;

  const element = result[0];

  const textHtmlAll = element.querySelectorAll('li');

  const linksBook = [];

  for (let i = 0; i < textHtmlAll.length; i++) {
    const parag = textHtmlAll[i];
    const url = parag.querySelector('a')?.getAttribute('href');

    if (url) {
      linksBook.push({
        book: transformLink(url),
        name: url.replace(`${link}book/`, ''),
      });
    }
  }

  return { linksBook, web: 'novelfire', bookHref: book };
};

const getBookFromLink = async ({
  book,
  chapter,
}: {
  book: string;
  chapter: string;
}) => {
  // https://novelfire.net/book/the-small-sage-will-try-her-best-in-the-different-world-from-lv1/chapter-26
  const linkBook = `${link}book/${book}/chapter-${chapter}`;

  const { data } = await axios.get(linkBook);

  const result = transformInHtml({
    html: data,
    elem: '#chapter-container',
  });

  if (!result) return undefined;

  const element = result[0];

  const textHtmlAll = element.querySelectorAll('#content p');

  const allText = textHtmlAll.map(parag => parag.textContent);

  // next page
  const pages = element.querySelectorAll('.chapternav.skiptranslate a');
  const prevPageInit = pages[0]?.getAttribute('href');
  const nextPageInit = pages[1]?.getAttribute('href');
  const prevPage = prevPageInit?.startsWith('https') ? prevPageInit : undefined;
  const nextPage = nextPageInit?.startsWith('https') ? nextPageInit : undefined;

  const prevText = prevPage && 'Попередння';
  const nextText = nextPage && 'Наступна';

  const nav = {
    nextPage: nextPage && transformLink(nextPage) + '?web=novelfire',
    prevPage: prevPage && transformLink(prevPage) + '?web=novelfire',
    nextText,
    prevText,
  };

  return { book: allText, nav };
};

const getBookImageLink = async ({ book }: { book: string }) => {
  // https://novelfire.net/book/the-small-sage-will-try-her-best-in-the-different-world-from-lv1
  const linkBook = `${link}book/${book}/`;

  const { data } = await axios.get(linkBook);

  const result = transformInHtml({
    html: data,
    elem: '.fixed-img',
  });

  if (!result) return undefined;

  const element = result[0];

  const imgWrapp = element.querySelector('img');

  const res = imgWrapp?.getAttribute('data-src');

  return res;
};

const transformLink = (url: string) => {
  const indexOfChapter = url.lastIndexOf('chapter-');
  return url.slice(indexOfChapter + 8);
};

export const novelfire = {
  getBookFromLink,
  getBookLinks,
  getBookSearchByName,
  getBookPopular,
  getBookImageLink,
};
