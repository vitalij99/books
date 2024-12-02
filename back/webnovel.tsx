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
        const name = link.querySelector('h3')?.getAttribute('title') || '';
        const image = link.querySelector('img');

        const modifiedImg = image?.getAttribute('data-original');
        const img = 'https://' + modifiedImg || '';
        const book =
          link.querySelector('a')?.getAttribute('data-report-did') || '';

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
const getBookSearchByName = async ({ name }: { name: string }) => {
  // https://novelbin.com/search?keyword=Barbarian
  const linkSearch = `${link}search?keyword=${name}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksListType(textData);
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
  const bookInfo = await getBookInfoLink({ book, charpters: linkBook.length });

  return {
    linksBook,
    web,
    bookHref: book,
    bookInfo,
  };
};

const getBookInfoLink = async ({
  book,
  charpters,
}: {
  book: string;
  charpters: number;
}) => {
  //  https://novelbin.com/b/atticuss-odyssey-reincarnated-into-a-playground
  const linkBook = `${link}b/${book}/`;
  const data = await fetch(linkBook);
  const textData = await data.text();

  const resultInfo = getBookInfo(textData);
  const resultImage = await getBookImageLink({ book });

  return {
    ...resultInfo,
    image: resultImage,
    charpters,
    title: book,
  };
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

    return result;
  } catch (error) {}
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
