import { getBookSearchByName } from '@/lib/novelmin';
import { Listbooks } from '../_compon/ListBooks/Listbooks';
import Loading from '../_compon/Loading/Loading';

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
      <Listbooks books={books.book} />
    </>
  );
};

export default search;
