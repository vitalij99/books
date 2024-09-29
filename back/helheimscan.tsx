import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://helheimscans.com/';
const web = 'helheimscan';

const getBookSearchByName = async ({ name }: { name: string }) => {
  const data = await getBookPopular();

  const res = data.books.find(book =>
    book.name.trim().toLowerCase().includes(name.trim().toLowerCase())
  );

  return res;
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

    const links = result[0].querySelectorAll('a');

    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    links.forEach(link => {
      if (link !== null) {
        const name = link.getAttribute('title') || '';
        const hrefBook = link.getAttribute('href') || '';
        const book = hrefBook.replace(`/series/`, '');
        const backgroundImage = link
          .querySelector('div > div')
          ?.getAttribute('style');

        if (backgroundImage) {
          const img =
            backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] || '';

          linkInfoArray.push({ name, book, img });
        } else {
          linkInfoArray.push({ name, book, img: '' });
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
  // https://helheimscans.com/chapter/2d13a5cf30a-60ef95f5533/
  const linkBook = `${link}chapter/${book}-${chapter}`;

  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = transformInHtml({
    html: textData,
    elem: '#pages_panel',
  });

  if (!result) return undefined;

  const element = result[0];

  const textHtmlAll = element.querySelectorAll('p');

  const allText = textHtmlAll.map(parag => parag.textContent);

  // next page
  const navigate = transformInHtml({
    html: textData,
    elem: '#chapter_controls_header',
  });

  if (!navigate) return { book: allText, nav: {} };

  const pages = navigate[0].querySelectorAll('a');

  const prevPage = pages[0]?.getAttribute('href');
  const nextPage = pages[1]?.getAttribute('href');

  const prevText = 'Попередння';
  const nextText = 'Наступна';

  const nav = {
    nextPage: nextPage && transformLink(nextPage) + `?web=${web}`,
    prevPage: prevPage && transformLink(prevPage) + `?web=${web}`,
    nextText,
    prevText,
  };

  return { book: allText, nav };
};

const getBookImageLink = async ({ book }: { book: string }) => {
  //https://helheimscans.com/series/2d13a5cf30a/
  const linkBook = `${link}series/${book}`;

  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = transformInHtml({
    html: textData,
    elem: 'header + div',
  });

  if (!result) return undefined;

  const element = result[0].querySelector('.bg-center');
  if (!element) return undefined;

  const res = element.getAttribute('style');

  const img =
    res?.match(/url\(["']?(.*?)["']?\)/)?.[1].replace(/w=\d+/, 'w=350') || '';

  return img;
};
// TODO
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
  const indexOfChapter = url.lastIndexOf('-');
  return url.slice(indexOfChapter + 1);
};

export const helheimscan = {
  getBookFromLink,
  getBookLinks,
  getBookSearchByName,
  getBookPopular,
  getBookImageLink,
  getBooksFromTags,
  web,
};
