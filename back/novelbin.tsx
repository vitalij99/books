import { BookInfoType } from '@/types/book';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://novelbin.com/';
const web = 'novelbin';

const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://novelbin.com/search?keyword=Barbarian
  const linkSearch = `${link}search?keyword=${name}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksSearch(textData);
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
  const bookInfo = await getBookInfoLink({ book, chapters: linkBook.length });

  return {
    linksBook,
    web,
    bookHref: book,
    bookInfo,
  };
};

const getBookInfoLink = async ({
  book,
  chapters,
}: {
  book: string;
  chapters: number;
}) => {
  //  https://novelbin.com/b/atticuss-odyssey-reincarnated-into-a-playground
  const linkBook = `${link}b/${book}/`;
  const data = await fetch(linkBook);
  const textData = await data.text();

  const resultInfo = getBookInfo(textData);
  const resultImage = await getBookImageLink({ book });

  const result: BookInfoType = {
    ...resultInfo,
    image: resultImage,
    chapters,
  };

  return result;
};

const getBookInfo = (textData: string) => {
  try {
    const info = transformInHtml({
      html: textData,
      elem: '.info.info-meta ',
    });

    const result = {} as BookInfoType;

    info[0].querySelectorAll('li').forEach(li => {
      const title = li
        .querySelector('h3')
        ?.textContent.replace(':', '')
        .trim()
        .toLowerCase();

      if (!title) return;

      if (title === 'author') {
        result.author = li.querySelector('a')?.textContent.trim();
      } else if (title === 'genre') {
        result.categories = Array.from(li.querySelectorAll('a')).map(a =>
          a.textContent.trim()
        );
      } else if (title === 'status') {
        result.status = li.querySelector('a')?.textContent.trim();
      } else if (title === 'publishers') {
        result.publishers = li.textContent.replace('Publishers:', '').trim();
      } else if (title === 'tag') {
        result.tags = Array.from(li.querySelectorAll('a')).map(a =>
          a.textContent.trim()
        );
      } else if (title === 'year of publishing') {
        result.yearPublishing = li.querySelector('a')?.textContent.trim();
      }
    });

    const title = transformInHtml({ html: textData, elem: '.title' })[0]
      ?.textContent;

    if (title) {
      result.title = title;
    }
    return result;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
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

  const title = result[0].querySelector('.novel-title')?.textContent;

  return { book: allText, nav, title };
};
const getBookImageLink = async ({ book }: { book: string }) => {
  // https://novelbin.com/media/novel/card-apprentice-daily-log.jpg
  return `${link}media/novel/${book}.jpg`;
};

const transformLink = (url: string) => {
  if (!url) return '';
  const arr = url.split('/');
  return arr.length > 0 ? arr[arr.length - 1].split('?')[0] : '';
};
const reTransformLink = (book: string, chapter: string) => {
  return `https://novelbjn.novelupdates.net/book/${book}/${chapter}`;
};

const getBookPopular = async () => {
  // https://novelbin.com/sort/top-hot-novel
  const linkSearch = `${link}sort/top-hot-novel`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksSearch(textData);
};
const getBooksSearch = (textData: string) => {
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

        const modifiedImg =
          image?.getAttribute('src') || image?.getAttribute('data-src');
        const img = modifiedImg?.replace(/novel_\d+_\d+/, 'novel') || '';
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
    console.log(`error ${web}:`, error);
    return { books: [], web };
  }
};
const getBooksFromGenre = async ({ name }: { name: string }) => {
  // https://novelbin.com/genre/adventure
  const linkSearch = `${link}genre/${name.toLocaleLowerCase()}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksSearch(textData);
};
const getBooksFromTags = async ({ name }: { name: string }) => {
  // https://novelbin.com/tag/MODERN%20DAY
  const linkSearch = `${link}tag/${name.toLocaleUpperCase()}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksSearch(textData);
};
export const novelbin = {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
  getBookPopular,
  getBooksFromTags,
  getBooksFromGenre,
  web,
};
