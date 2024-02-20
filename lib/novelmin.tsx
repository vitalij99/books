import axios from 'axios';
import { transformInHtml } from './htmlTransform';
import { HTMLElement } from 'node-html-parser';
import { text } from 'stream/consumers';

const link = 'https://novelmin.com/';

// export const getAllBooks = async ({ page = 1 }) => {
//   const { data } = await axios.get(`${link}=${page}`);
//   console.log(data);
//   return data;
// };

export const getBookSearchByName = async ({ name }: { name: string }) => {
  const linkSearch = `${link}/?s=${name}`;

  const { data } = await axios.get(linkSearch);

  const result = transformInHtml({
    html: data,
    elem: 'article',
  });
  if (!result) return undefined;

  const links = result.map(item => item.querySelector('a'));

  const linkInfoArray: { name: string; book: string; web: string }[] = [];

  links.forEach(link => {
    if (link !== null) {
      const name = link.getAttribute('title') || '';
      const href = link.getAttribute('href') || '';
      const book = href.replace('https://novelmin.com/series/', '');
      const web = 'novelmin';
      linkInfoArray.push({ name, book, web });
    }
  });

  return { book: linkInfoArray, web: 'novelmin' };
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
      const indexOfChapter = url.lastIndexOf('-chapter-');

      linksBook.push({
        book: url.slice(indexOfChapter + 9),
        name: url.replace('https://novelmin.com/', ''),
        web: 'novelmin',
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
  const prevPage = pages[0]?.getAttribute('href') || '';
  const nextPage = pages[1]?.getAttribute('href') || '';
  const prevText = pages[0]?.textContent || '';
  const nextText = pages[1]?.textContent || '';

  const nav = {
    nextPage,
    prevPage,
    nextText,
    prevText,
  };

  return { book: allText, nav };
};
