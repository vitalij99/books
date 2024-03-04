import { getBookSearchByName as getBookSearchByNameFromNovelMin } from './novelmin';
import { getBookSearchByName as getBookSearchByNameFromNovelFire } from './novelfire';
import { ListbooksProps } from '@/type/book';

const getBookSearchByNameAll = async ({ name }: { name: string }) => {
  const result: ListbooksProps[] = [];

  const novelmin = await getBookSearchByNameFromNovelMin({ name });
  const novelfire = await getBookSearchByNameFromNovelFire({ name });

  result.push(novelmin, novelfire);

  return result;
};

export default getBookSearchByNameAll;
