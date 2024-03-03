import { Listbooks } from '@/app/_compon/ListBooks/Listbooks';
import { getBookLinks } from '@/bg/novelmin';
import Link from 'next/link';

const page = async ({
  params,
  searchParams,
}: {
  params: { book: string };
  searchParams: { [key: string]: string | '' };
}) => {
  const book = await getBookLinks({ book: params.book });
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
