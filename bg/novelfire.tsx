import axios from 'axios';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://novelfire.net/';

export const getBookSearchByName = async ({ name }: { name: string }) => {
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
        const name = link.getAttribute('title') || '';
        const href = link.getAttribute('href') || '';
        const book = href.replace(`https://novelfire.net/book/`, '');
        const image = link.querySelector('img');
        const img = image?.getAttribute('src') || '';

        linkInfoArray.push({ name, book, img });
      }
    });

    return { books: linkInfoArray, web: 'novelfire' };
  } catch (error) {
    return { books: [], web: 'novelfire' };
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
      const indexOfChapter = url.lastIndexOf('-chapter-');

      linksBook.push({
        book: url.slice(indexOfChapter + 9),
        name: url.replace(link, ''),
        web: 'novelfire',
      });
    }
  }

  return { linksBook, web: 'novelfire', bookHref: book };
};
export const getBookFromLink = async ({
  book,
  chapter,
}: {
  book: string;
  chapter: string;
}) => {
  // https://novelfire.com/surviving-the-game-as-a-barbarian-chapter-607/
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
