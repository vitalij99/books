import { Listbooks } from '@/app/_compon/ListBooks/Listbooks';
import { getBookLinksAll } from '@/db';

const page = async ({
  params,
  searchParams,
}: {
  params: { book: string };
  searchParams: { [key: string]: string | '' };
}) => {
  if (!searchParams.web) {
    return <>error</>;
  }
  const book = await getBookLinksAll({
    book: params.book,
    web: searchParams.web,
  });
  if (!book) {
    return <>error</>;
  }
  return (
    <>
      <Listbooks link={book.bookHref} books={book.linksBook} web={book.web} />
    </>
  );
};

export default page;
