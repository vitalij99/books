import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://www.scribblehub.com/';
const web = 'scribblehub';

const getBookSearchByName = async ({ name }: { name: string }) => {
  //  https://www.scribblehub.com/?s=var&post_type=fictionposts
  const linkSearch = `${link}?s=${name}&post_type=fictionposts`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  try {
    const result = transformInHtml({
      html: textData,
      elem: '.wi-fic_l-content.fic.search',
    });
    if (!result) throw new Error();
    const linkInfoArray: {
      name: string;
      book: string;
      img: string;
    }[] = [];

    const wrapper = result[0].querySelectorAll('.search_main_box');
    if (!wrapper) throw new Error();
    wrapper.forEach(element => {
      if (element !== null) {
        const img = element.querySelector('img')?.getAttribute('src') || '';
        const link = element.querySelector('a');
        if (!link) return;
        const name = link.textContent || '';
        const href = link.getAttribute('href') || '';
        const bookTransform = href.replace(
          `https://www.scribblehub.com/series/`,
          ''
        );
        const book = bookTransform.replace(`/`, '_');

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
  //  https://www.scribblehub.com/wp-admin/admin-ajax.php

  const linkBook = `${link}wp-admin/admin-ajax.php`;

  const formData = new FormData();
  formData.append('action', 'wi_getreleases_pagination');
  formData.append('pagenum', '1');
  formData.append('mypostid', book);

  const data = await fetch(linkBook, {
    method: 'POST',
    body: formData,
    headers: {
      Cookie: 'toc_show=3000',
    },
  }).then(response => response.text());

  const result = transformInHtml({
    html: data,
    elem: '.main',
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
        name: parag.textContent,
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
  // https://www.scribblehub.com/read/1015814-i-sting-pokemon-poison-type-specialist/chapter/1187559/

  const linkBook = `${link}read/${book.replace(`_`, '-')}/chapter/${chapter}`;

  const res = await fetch(linkBook);

  const data = await res.text();

  const result = transformInHtml({
    html: data,
    elem: '#chp_contents',
  });

  if (!result) return undefined;

  const textHtmlAll = result[0].querySelectorAll('  p');

  const allText = textHtmlAll.map(parag => parag.textContent);

  // next page
  const getPageData = (selector: string) => {
    const page = result[0].querySelector(selector);
    return page?.getAttribute('href');
  };

  const prevPage = getPageData('.btn-prev');
  const nextPage = getPageData('.btn-next');

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
  // https://www.scribblehub.com/series/1015814/i-sting-pokemon-poison-type-specialist/

  const linkBook = `${link}series/${book.replace(`_`, '/')}`;

  const res = await fetch(linkBook);

  const data = await res.text();

  const result = transformInHtml({
    html: data,
    elem: '.novel-cover',
  });

  if (!result) return undefined;

  const image = result[0].querySelector('img')?.getAttribute('src');
  return image;
};

const getBookPopular = async () => {
  // https://www.scribblehub.com/series-ranking/?sort=5&order=1
  const linkSearch = `${link}/series-ranking/?sort=1&order=1`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  const linkInfoArray: {
    name: string;
    book: string;
    img: string;
  }[] = [];

  try {
    const result = transformInHtml({
      html: textData,
      elem: '.wi_fic_wrap > .search_main_box',
    });
    if (!result) throw new Error();

    result.forEach(element => {
      if (element !== null) {
        const img = element.querySelector('img')?.getAttribute('src') || '';
        const link = element.querySelector('a');
        if (!link) return;
        const name = link.textContent || '';
        const href = link.getAttribute('href') || '';
        const bookTransform = href.replace(
          `https://www.scribblehub.com/series/`,
          ''
        );
        const book = bookTransform.replace(`/`, '_');

        if (book) {
          linkInfoArray.push({ name, book, img });
        }
      }
    });

    return { books: linkInfoArray, web };
  } catch (error) {
    return { books: linkInfoArray, web };
  }
};

const transformLink = (url: string) => {
  // https://www.scribblehub.com/read/154400-stray-cat-strut/chapter/1048974/
  const indexOfChapter = url.lastIndexOf('/chapter/');

  return url.slice(indexOfChapter + 9);
};

export const scribblehub = {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
  getBookPopular,
  web,
};
