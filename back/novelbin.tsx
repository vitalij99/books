import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://novelbin.com/';
const web = 'novelbin';

const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://novelbin.com/search?keyword=Barbarian
  const linkSearch = `${link}search?keyword=${name}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  try {
    const result = transformInHtml({
      html: textData,
      elem: '.row',
    });
    if (!result) throw new Error();
    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    result.forEach(link => {
      if (link !== null) {
        const name =
          link.querySelector('.novel-title a')?.getAttribute('title') || '';
        const image = link.querySelector('.cover');
        const modifiedImg = image?.getAttribute('src') || '';
        const img = modifiedImg.replace(/novel_\d+_\d+/, 'novel');
        const href =
          link.querySelector('.novel-title a')?.getAttribute('href') || '';
        const book = href.replace(`https://novelbin.com/b/`, '');

        if (book) {
          linkInfoArray.push({ name, book, img });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    return { books: [], web };
  }
};

const getBookLinks = async ({ book }: { book: string }) => {
  // https://novelbin.com/ajax/chapter-archive?novelId=barbarian-quest
  const linkBook = `${link}ajax/chapter-archive?novelId=${book}`;

  const res = await fetch(linkBook);

  const data = await res.text();

  const result = transformInHtml({
    html: data,
    elem: '.panel-body',
  });
  if (!result) return undefined;

  const textHtmlAll = result[0].querySelectorAll('a');

  const linksBook = [];

  for (let i = 0; i < textHtmlAll.length; i++) {
    const parag = textHtmlAll[i];
    const url = parag.getAttribute('href')?.split('?');
    if (url) {
      linksBook.push({
        book: transformLink(url[0]),
        name: parag.getAttribute('title') || parag.textContent,
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
  // https://novelbjn.novelupdates.net/book/card-apprentice-daily-log/chapter-3
  const linkBook = reTransformLink(book, chapter);
  const res = await fetch(linkBook);

  const data = await res.text();

  const result = transformInHtml({
    html: data,
    elem: 'body',
  });

  if (!result) return undefined;

  const textHtmlAll = result[0].querySelectorAll('#chr-content > p');

  const allText = textHtmlAll.map(parag => parag.textContent);

  // next page
  const getPageData = (selector: string) => {
    const page = result[0].querySelector(selector);
    const href = page?.getAttribute('href');
    return href?.startsWith('https')
      ? { href, title: page?.getAttribute('title') }
      : {};
  };

  const prevData = getPageData('#prev_chap');
  const nextData = getPageData('#next_chap');

  const prevPage = prevData.href;
  const nextPage = nextData.href;

  const prevText = prevPage ? prevData.title : 'Попередння';
  const nextText = nextPage ? nextData.title : 'Наступна';

  const nav = {
    nextPage: nextPage && transformLink(nextPage) + `?web=${web}`,
    prevPage: prevPage && transformLink(prevPage) + `?web=${web}`,
    nextText,
    prevText,
  };

  return { book: allText, nav };
};
const getBookImageLink = async ({ book }: { book: string }) => {
  // https://novelbin.com/media/novel/card-apprentice-daily-log.jpg
  return `${link}media/novel/${book}.jpg`;
};

const transformLink = (url: string) => {
  const arr = url.split('/');
  return arr[arr.length - 1];
};
const reTransformLink = (book: string, chapter: string) => {
  return `https://novelbjn.novelupdates.net/book/${book}/${chapter}`;
};

const getBookPopular = async () => {
  // https://novelbin.com/sort/top-hot-novel
  const linkSearch = `${link}sort/top-hot-novel`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  try {
    const result = transformInHtml({
      html: textData,
      elem: '.row',
    });
    if (!result) throw new Error();
    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    result.forEach(link => {
      if (link !== null) {
        const name =
          link.querySelector('.novel-title a')?.getAttribute('title') || '';
        const image = link.querySelector('.cover');
        const modifiedImg = image?.getAttribute('data-src') || '';
        const img = modifiedImg.replace(/novel_\d+_\d+/, 'novel');
        const href =
          link.querySelector('.novel-title a')?.getAttribute('href') || '';
        const book = href.replace(`https://novelbin.com/b/`, '');

        if (book) {
          linkInfoArray.push({ name, book, img });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    return { books: [], web };
  }
};

export const novelbin = {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
  getBookPopular,
  web,
};
