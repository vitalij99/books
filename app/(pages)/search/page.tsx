import ListBooksCard from '@/app/_compon/ListBooksCard/ListBooksCard';
import Loading from '@/app/_compon/Loading/Loading';
import { getBookSearchByNameAll, getBooksFromTagsAll } from '@/back';

const search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | '' };
}) => {
  const books = searchParams.search
    ? await getBookSearchByNameAll({
        name: searchParams.search,
      })
    : await getBooksFromTagsAll({
        name: searchParams.filter,
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
