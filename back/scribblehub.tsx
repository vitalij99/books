import { BookInfoType } from '@/types/book';
import { transformInHtml } from '../lib/htmlTransform';

const link = 'https://www.scribblehub.com/';
const web = 'scribblehub';

const getBookSearchByName = async ({ name }: { name: string }) => {
  //  https://www.scribblehub.com/?s=Fantasy+Realm&post_type=fictionposts
  const linkSearch = `${link}?s=${name}&post_type=fictionposts`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksWrapper(textData);
};

const getBooksWrapper = (textData: string) => {
  const linkInfoArray: {
    name: string;
    book: string;
    img: string;
  }[] = [];

  try {
    const result = transformInHtml({
      html: textData,
      elem: '.wi_fic_wrap  .search_main_box',
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
    console.log(`error ${web}:`, error);
    return { books: linkInfoArray, web };
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

  const result = getBookImage(data);

  return result;
};

const getBookPopular = async () => {
  // https://www.scribblehub.com/series-ranking/?sort=5&order=1
  const linkSearch = `${link}/series-ranking/?sort=1&order=1`;

  const data = await fetch(linkSearch);
  const textData = await data.text();

  return getBooksWrapper(textData);
};

const transformLink = (url: string) => {
  // https://www.scribblehub.com/read/154400-stray-cat-strut/chapter/1048974/
  const indexOfChapter = url.lastIndexOf('/chapter/');

  return url.slice(indexOfChapter + 9);
};

const getBookInfoLink = async ({ book }: { book: string }) => {
  //  https://www.scribblehub.com/series/1033116/luminary-institute/
  const linkBook = `${link}series/${book.replace(`_`, '/')}/`;
  const data = await fetch(linkBook);
  const textData = await data.text();

  const result = {
    author: getAuthor(textData),
    categories: getCategories(textData),
    image: getBookImage(textData),
    tags: getTags(textData),
    chapters: getChapters(textData),
    title: getBookTitle(textData) || book,
  } as BookInfoType;

  return result;
};
const getBookTitle = (textData: string) => {
  try {
    const result = transformInHtml({
      html: textData,
      elem: '.fic_title',
    });

    if (!result) return undefined;

    return result[0].textContent;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};
const getBookImage = (textData: string) => {
  try {
    const result = transformInHtml({
      html: textData,
      elem: '.novel-cover',
    });

    if (!result) return undefined;

    const image = result[0].querySelector('img')?.getAttribute('src');
    return image;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};

const getCategories = (textData: string) => {
  try {
    const genreContainer = transformInHtml({
      html: textData,
      elem: '.wi_fic_genre',
    });

    const genres = Array.from(
      genreContainer[0].querySelectorAll("span[property='genre'] a")
    ).map(a => a.textContent.trim());
    return genres;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};
const getTags = (textData: string) => {
  try {
    const tagsContainer = transformInHtml({
      html: textData,
      elem: '.wi_fic_showtags a',
    });

    const result = tagsContainer.map(tag => tag.textContent);
    return result;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};
const getAuthor = (textData: string) => {
  try {
    const result = transformInHtml({
      html: textData,
      elem: '.auth_name_fic',
    });

    const text = result[0]?.textContent;
    return text;
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};
const getChapters = (textData: string) => {
  try {
    const statsContainer = transformInHtml({
      html: textData,
      elem: '.novel-container .fic_stats span',
    });

    for (const span of statsContainer) {
      const strongText = span?.textContent.trim();
      const statType = span
        .querySelector('.mb_stat')
        ?.textContent.trim()
        .toLowerCase();

      if (strongText && statType === 'chapters') {
        return parseInt(strongText, 10);
      }
    }
  } catch (error) {
    console.log(`error ${web}:`, error);
  }
};
const getBooksFromGenre = async ({ name }: { name: string }) => {
  //  https://www.scribblehub.com/genre/adventure/
  const linkBook = `${link}genre/${name.toLocaleLowerCase()}/`;
  const data = await fetch(linkBook);
  const textData = await data.text();
  return getBooksWrapper(textData);
};
const getBooksFromTags = async ({ name }: { name: string }) => {
  //  https://www.scribblehub.com/tag/accelerated-growth/
  const linkBook = `${link}tag/${name.toLocaleLowerCase()}/`;
  const data = await fetch(linkBook);
  const textData = await data.text();
  return getBooksWrapper(textData);
};
export const scribblehub = {
  getBookSearchByName,
  getBookLinks,
  getBookFromLink,
  getBookImageLink,
  getBookPopular,
  getBooksFromGenre,
  getBooksFromTags,
  web,
};
