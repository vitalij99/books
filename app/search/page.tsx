import { getBookSearchByName } from '@/lib/novelmin';
import { Listbooks } from '../_compon/ListBooks/Listbooks';

const search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | '' };
}) => {
  const books = await getBookSearchByName({
    name: searchParams.search,
    page: 1,
  });

  return <>{<Listbooks books={books} />}</>;
};

export default search;
