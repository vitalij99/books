import axios from 'axios';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://novelmin.com/';

export const getBookSearchByName = async ({ name }: { name: string }) => {
  console.log('start getBookSearchByName');
  try {
    const linkSearch = `${link}/?s=${name}`;

    const { data } = await axios.get(linkSearch);

    const result = transformInHtml({
      html: data,
      elem: 'article',
    });
    if (!result) return { books: [], web: 'novelmin' };

    const links = result.map(item => item.querySelector('a'));

    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    links.forEach(link => {
      if (link !== null) {
        const name = link.getAttribute('title') || '';
        const image = link.querySelector('img');
        const img = image?.getAttribute('src') || '';
        const href = link.getAttribute('href') || '';
        const book = href.replace(`https://novelmin.com/series/`, '');

        linkInfoArray.push({ name, book, img });
      }
    });

    return { books: linkInfoArray, web: 'novelmin' };
  } catch (error) {
    return { books: [], web: 'novelmin' };
  }
};

export const getBookLinks = async ({ book }: { book: string }) => {
  const linkBook = `${link}/series/${book}/`;

  const { data } = await axios.get(linkBook);

  const result = transformInHtml({
    html: data,
    elem: '.eplister.eplisterfull',
  });
  if (!result) return undefined;

  const element = result[0];

  const textHtmlAll = element.querySelectorAll('ul > li');

  const linksBook = [];

  for (let i = 0; i < textHtmlAll.length; i++) {
    const parag = textHtmlAll[i];
    const url = parag.querySelector('a')?.getAttribute('href');
    if (url) {
      linksBook.push({
        book: transformLink(url),
        name: url.replace(link, ''),
      });
    }
  }

  return { linksBook, web: 'novelmin', bookHref: book };
};

export const getBookFromLink = async ({
  book,
  chapter,
}: {
  book: string;
  chapter: string;
}) => {
  // https://novelmin.com/surviving-the-game-as-a-barbarian-chapter-607/
  const linkBook = `${link}/${book}-chapter-${chapter}`;

  const { data } = await axios.get(linkBook);

  const result = transformInHtml({
    html: data,
    elem: '.epwrapper',
  });
  if (!result) return undefined;

  const element = result[0];

  const textHtmlAll = element.querySelectorAll('.entry-content > p');

  const allText = textHtmlAll.map(parag => parag.textContent);

  // next page
  const pages = element.querySelectorAll('.left a');
  const prevPageInit = pages[0]?.getAttribute('href');
  const nextPageInit = pages[2]?.getAttribute('href');
  const prevPage = prevPageInit?.startsWith('https') ? prevPageInit : undefined;
  const nextPage = nextPageInit?.startsWith('https') ? nextPageInit : undefined;

  const prevText = prevPage && 'Попередння';
  const nextText = nextPage && 'Наступна';

  const nav = {
    nextPage: nextPage && transformLink(nextPage) + '?web=novelmin',
    prevPage: prevPage && transformLink(prevPage) + '?web=novelmin',
    nextText,
    prevText,
  };

  return { book: allText, nav };
};
const transformLink = (url: string) => {
  const indexOfChapter = url.lastIndexOf('-chapter-');
  return url.slice(indexOfChapter + 9);
};
