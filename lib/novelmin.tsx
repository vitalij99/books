import axios from 'axios';
import { transformInHtml } from './htmlTransform';

const link = 'https://novelmin.com/';

// export const getAllBooks = async ({ page = 1 }) => {
//   const { data } = await axios.get(`${link}=${page}`);
//   console.log(data);
//   return data;
// };

export const getBookSearchByName = async ({
  name,
  page = 1,
}: {
  name: string;
  page: number;
}) => {
  const linkSearch = `${link}/page/${page}/?s=${name}`;

  const { data } = await axios.get(linkSearch);

  const result = transformInHtml({
    html: data,
    elem: 'article',
  });
  if (!result) return [];

  const links = result.map(item => item.querySelector('a'));

  const linkInfoArray: { name: string; href: string }[] = [];

  links.forEach(link => {
    if (link !== null) {
      const name = link.textContent || '';
      const href = link.getAttribute('href') || '';
      linkInfoArray.push({ name, href });
    }
  });

  return linkInfoArray;
};
