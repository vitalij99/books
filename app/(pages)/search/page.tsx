import Categories from '@/app/_compon/Categories/Categories';
import ListBooksCard from '@/app/_compon/ListBooksCard/ListBooksCard';
import Search from '@/app/_compon/Search/Search';

import {
  getBooksByGenreAll,
  getBookSearchByNameAll,
  getBooksFromTagsAll,
} from '@/back';

const search = async (
  props: {
    searchParams: Promise<{ [key: string]: string | '' }>;
  }
) => {
  const searchParams = await props.searchParams;
  const { search, genre, tag } = searchParams;

  let books;
  if (search) {
    books = await getBookSearchByNameAll({ name: search });
  } else if (genre) {
    books = await getBooksByGenreAll({ name: genre });
  } else if (tag) {
    books = await getBooksFromTagsAll({ name: tag });
  }

  return (
    <>
      <Search page={true} />
      <Categories genre={genre} />
      {books &&
        books
          .sort((a, b) => a && b && b.books?.length - a.books?.length)
          .map(website => (
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
