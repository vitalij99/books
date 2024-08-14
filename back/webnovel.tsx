import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://webnovel.com/';
const web = 'webnovel';

const getBookSearchByName = async ({ name }: { name: string }) => {
  //  https://www.webnovel.com/search?keywords=
  const linkSearch = `${link}search?keywords=${name}`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  try {
    const result = transformInHtml({
      html: textData,
      elem: '.j_list_container.search-result-container',
    });
    if (!result) throw new Error();
    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    result.forEach(element => {
      if (element !== null) {
        const link = element.querySelector(' li > a');
        if (!link) return;
        const name = link.getAttribute('title') || '';
        const img = link.querySelector('img')?.getAttribute('src') || '';
        const updatedImgSrc = img.startsWith('https:') ? img : `https:${img}`;
        const href = link.getAttribute('href') || '';
        const book = href.replace(`/book/`, '');

        if (book) {
          linkInfoArray.push({ name, book, img: updatedImgSrc });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    return { books: [], web };
  }
};
// TODO getBookLinks
const getBookLinks = async ({ book }: { book: string }) => {
  // https://www.webnovel.com/book/endless-path-infinite-cosmos_11766562205519505
  const linkBook = `${link}book/${book}`;

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

const getBookFromLink = async ({
  book,
  chapter,
}: {
  book: string;
  chapter: string;
}) => {
  // https://novelbjn.novelupdates.net/book/card-apprentice-daily-log/chapter-3
  const linkBook = `https://novelbjn.novelupdates.net/book/${book}/chapter-${chapter}`;
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
  const indexOfChapter = url.lastIndexOf('/chapter-');
  return url.slice(indexOfChapter + 9);
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

export const webnovel = {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
  getBookPopular,
};
