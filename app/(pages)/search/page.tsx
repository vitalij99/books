import ListBooksCard from '@/app/_compon/ListBooksCard/ListBooksCard';
import Loading from '@/app/_compon/Loading/Loading';
import {
  getBooksByGenreAll,
  getBookSearchByNameAll,
  getBooksFromTagsAll,
} from '@/back';

const search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | '' };
}) => {
  const { search, genre, tag } = searchParams;

  let books;
  if (search) {
    books = await getBookSearchByNameAll({ name: search });
  } else if (genre) {
    books = await getBooksByGenreAll({ name: genre });
  } else if (tag) {
    books = await getBooksFromTagsAll({ name: tag });
  }

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
