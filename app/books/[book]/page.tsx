import BookInfo from '@/app/_compon/BookInfo/BookInfo';
import { Listbooks } from '@/app/_compon/ListBooks/Listbooks';
import { getBookLinksAll } from '@/back';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { book: string };
  searchParams: { [key: string]: string | '' };
}): Promise<Metadata> {
  const book = await getBookLinksAll({
    book: params.book,
    web: searchParams.web,
  });

  const title = book?.bookInfo?.title || params.book;

  return {
    title: title,
  };
}

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
      <BookInfo bookInfo={book?.bookInfo} />
      <Listbooks link={book.bookHref} books={book?.linksBook} web={book?.web} />
    </>
  );
};

export default page;
