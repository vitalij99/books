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
    const url = parag.getAttribute('href');
    if (url) {
      linksBook.push({
        book: transformLink(url),
        name: parag.getAttribute('title'),
      });
    }
  }

  return { linksBook, web, bookHref: book };
};

// TODO getBookFromLink
const getBookFromLink = async ({
  book,
  chapter,
}: {
  book: string;
  chapter: string;
}) => {
  // https://novelbin.com/surviving-the-game-as-a-barbarian-chapter-607/
  const linkBook = `${link}/${book}-chapter-${chapter}`;

  const res = await fetch(linkBook);

  const data = await res.text();

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
    nextPage: nextPage && transformLink(nextPage) + '?web=novelbin',
    prevPage: prevPage && transformLink(prevPage) + '?web=novelbin',
    nextText,
    prevText,
  };

  return { book: allText, nav };
};
const getBookImageLink = async ({ book }: { book: string }) => {
  // https://novelfire.net/book/the-small-sage-will-try-her-best-in-the-different-world-from-lv1
  const linkBook = `${link}book/${book}/`;

  const ress = await fetch(linkBook);
  const data = await ress.text();

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
  const indexOfChapter = url.lastIndexOf('/chapter-');
  return url.slice(indexOfChapter + 9);
};

export default {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
};
