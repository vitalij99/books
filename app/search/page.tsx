import Loading from '../_compon/Loading/Loading';
import ListBooksCard from '../_compon/ListBooksCard/ListBooksCard';
import { getBookSearchByNameAll } from '@/back';

const search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | '' };
}) => {
  const books = await getBookSearchByNameAll({
    name: searchParams.search,
  });
  if (!books) {
    return <Loading />;
  }

  return (
    <>
      {books.map(website => (
        <ListBooksCard
          key={website.web}
          books={website.books}
          web={website.web}
        />
      ))}
    </>
  );
};

export default search;
