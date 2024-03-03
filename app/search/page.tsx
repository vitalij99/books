import { getBookSearchByName } from '@/bg/novelmin';

import Loading from '../_compon/Loading/Loading';
import ListBooksCard from '../_compon/ListBooksCard/ListBooksCard';

const search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | '' };
}) => {
  const books = await getBookSearchByName({
    name: searchParams.search,
  });
  if (!books) {
    return <Loading />;
  }
  return (
    <>
      <ListBooksCard books={books.book} />
    </>
  );
};

export default search;
