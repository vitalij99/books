import axios from 'axios';
import { transformInHtml } from './htmlTransform';
import { HTMLElement } from 'node-html-parser';

const link = 'https://novelmin.com/';

// export const getAllBooks = async ({ page = 1 }) => {
//   const { data } = await axios.get(`${link}=${page}`);
//   console.log(data);
//   return data;
// };

export const getBookSearchByName = async ({
  name,
  page = 1,
}: {
  name: string;
  page: number;
}) => {
  const linkSearch = `${link}/page/${page}/?s=${name}`;

  const { data } = await axios.get(linkSearch);

  const result = transformInHtml({
    html: data,
    elem: 'article',
  });
  if (!result) return [];

  const links = result.map(item => item.querySelector('a'));

  const linkInfoArray: { name: string; book: string; web: string }[] = [];

  links.forEach(link => {
    if (link !== null) {
      const name = link.textContent || '';
      const href = link.getAttribute('href') || '';
      const book = href.replace('https://novelmin.com/', '');
      const web = 'novelmin';
      linkInfoArray.push({ name, book, web });
    }
  });

  return linkInfoArray;
};
export const getBookLink = async ({ book }: { book: string }) => {
  const linkBook = `${link}${book}/`;

  const { data } = await axios.get(linkBook);

  const result = transformInHtml({
    html: data,
    elem: '.gmr-box-content.gmr-single',
  });
  if (!result) return undefined;

  const element = result[0];
  const htmlBookText = element.querySelector(
    '.entry-content.entry-content-single'
  );

  if (!htmlBookText) return undefined;

  const textHtmlAll = element.querySelectorAll(
    '.entry-content.entry-content-single > p'
  );

  const textBook = textHtmlAll.map(parag => parag.text);
  // next page
  const prevHtmlPage = element.querySelector('.nav-previous > a');
  const nextHtmlPage = element.querySelector('.nav-next > a');

  const bookContent = {
    book: textBook,
    nav: {
      nextPage: transformBookHref(prevHtmlPage, 'novelmin'),
      prevPage: transformBookHref(prevHtmlPage, 'novelmin'),
      nextText: nextHtmlPage?.textContent || '',
      prevText: prevHtmlPage?.textContent || '',
    },
  };

  return bookContent;
};
const transformBookHref = (href: HTMLElement | null, web: string) => {
  const newHref = href?.getAttribute('href') || '';
  const book = newHref.replace('https://novelmin.com/', '');

  return `/books/${book}?web=novelmin`;
};
