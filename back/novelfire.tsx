import { BookInfoType } from '@/types/book';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://novelfire.net/';
const web = 'novelfire';

const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://novelfire.net/ajax/searchLive?inputContent=Barbarian
  try {
    const linkBook = `${link}ajax/searchLive?inputContent=${name}`;

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
  // https://novelfire.net/monthly-rank
  try {
    const linkSearch = `${link}monthly-rank`;

    const data = await fetch(linkSearch);
    const textData = await data.text();

    const result = transformInHtml({
      html: textData,
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

    return { books: linkInfoArray, web };
  } catch (error) {
    console.log(error);
    return { books: [], web };
  }
};

const getBookLinks = async ({ book }: { book: string }) => {
  const linkBook = `${link}book/${book}/chapters`;

  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = transformInHtml({
    html: textData,
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

  const bookInfo = await getBookInfoLink({ book });

  return { linksBook, web, bookHref: book, bookInfo };
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

const getBookInfoLink = async ({ book }: { book: string }) => {
  const linkBook = `${link}book/${book}/`;
  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = {
    author: getAuthor(textData),
    categories: getCategories(textData),
    image: getBookImage(textData),
    chapters: getChapters(textData),
  } as BookInfoType;

  return result;
};

const getBookImageLink = async ({ book }: { book: string }) => {
  // https://novelfire.net/book/the-small-sage-will-try-her-best-in-the-different-world-from-lv1
  const linkBook = `${link}book/${book}/`;

  const data = await fetch(linkBook);
  const textData = await data.text();

  const resultImage = getBookImage(textData);

  return resultImage;
};

const getBookImage = (textData: string) => {
  try {
    const resultImage = transformInHtml({
      html: textData,
      elem: '.fixed-img',
    });

    if (!resultImage) return undefined;

    const element = resultImage[0];

    const imgWrapp = element.querySelector('img');

    return imgWrapp?.getAttribute('data-src');
  } catch (error) {}
};

const getCategories = (textData: string) => {
  try {
    const resultCategories = transformInHtml({
      html: textData,
      elem: '.categories a',
    });

    const text = resultCategories.map(title => title?.textContent);
    return text;
  } catch (error) {}
};
const getAuthor = (textData: string) => {
  try {
    const result = transformInHtml({
      html: textData,
      elem: '.author a',
    });

    const text = result.map(title => title?.textContent);
    return text;
  } catch (error) {}
};
const getChapters = (textData: string) => {
  try {
    const statsContainer = transformInHtml({
      html: textData,
      elem: '.header-stats',
    });

    statsContainer[0].querySelectorAll('span').forEach(span => {
      const strongText = span.querySelector('strong')?.textContent.trim();
      const smallText = span
        .querySelector('small')
        ?.textContent.trim()
        .toLowerCase();

      if (!strongText || !smallText) return;

      if (smallText === 'chapters') {
        return parseInt(strongText, 10);
      }
    });
  } catch (error) {}
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
  const indexOfChapter = url.lastIndexOf('chapter-');
  return url.slice(indexOfChapter + 8);
};

export const novelfire = {
  getBookFromLink,
  getBookLinks,
  getBookSearchByName,
  getBookPopular,
  getBookImageLink,
  getBooksFromTags,
};
