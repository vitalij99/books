import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://helheimscans.com/';
const web = 'helheimscan';

const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://helheimscans.com/series/?q=bar
  try {
    const linkBook = `${link}series/?q=${name}`;

    const data = await fetch(linkBook);
    const textData = await data.json();

    const result = transformInHtml({
      html: textData.html,
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

    return { books: linkInfoArray, web };
  } catch (error) {
    console.log(error);
    return { books: [], web };
  }
};

const getBookPopular = async () => {
  // https://helheimscans.com/series
  try {
    const linkSearch = `${link}series`;

    const data = await fetch(linkSearch);
    const textData = await data.text();

    const result = transformInHtml({
      html: textData,
      elem: '#searched_series_page',
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
        const book = link.getAttribute('href') || '';
        const backgroundImage = link
          .querySelector('div')
          ?.getAttribute('style');

        if (backgroundImage) {
          const img =
            backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] || '';

          linkInfoArray.push({ name, book, img });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    console.log(error);
    return { books: [], web };
  }
};

const getBookLinks = async ({ book }: { book: string }) => {
  //https://helheimscans.com/series/2d13a5cf30a/
  const linkBook = `${link}series/${book}`;

  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = transformInHtml({
    html: textData,
    elem: '#chapters_panel',
  });
  if (!result) return undefined;

  const element = result[0];

  const textHtmlAll = element.querySelectorAll('a');

  const linksBook = [];

  for (let i = 0; i < textHtmlAll.length; i++) {
    const parag = textHtmlAll[i];
    const url = parag?.getAttribute('href');
    const name = parag?.getAttribute('title');

    if (url) {
      linksBook.push({
        book: transformLink(url),
        name: name || '',
      });
    }
  }

  return { linksBook, web, bookHref: book };
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

  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = transformInHtml({
    html: textData,
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

  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = transformInHtml({
    html: textData,
    elem: '.fixed-img',
  });

  if (!result) return undefined;

  const element = result[0];

  const imgWrapp = element.querySelector('img');

  const res = imgWrapp?.getAttribute('data-src');

  return res;
};

const getBooksFromTags = async ({ name }: { name: string }) => {
  // https://novelfire.net/tags/academy/order-popular
  try {
    const linkBook = `${link}tags/{name}/order-popular`;

    const data = await fetch(linkBook);
    const textData = await data.text();

    const result = transformInHtml({
      html: textData,
      elem: '.novel-list',
    });

    if (!result) throw new Error();

    const links = result[0].querySelectorAll('a');

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
        const img = image?.getAttribute('data-src') || '';

        linkInfoArray.push({ name, book, img });
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    return { books: [], web };
  }
};

const transformLink = (url: string) => {
  const indexOfChapter = url.lastIndexOf('chapter');
  return url.slice(indexOfChapter + 7);
};

export const novelfire = {
  getBookFromLink,
  getBookLinks,
  getBookSearchByName,
  getBookPopular,
  getBookImageLink,
  getBooksFromTags,
};
