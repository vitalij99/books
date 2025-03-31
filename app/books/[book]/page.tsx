import BookInfo from '@/app/_compon/BookInfo/BookInfo';
import { Listbooks } from '@/app/_compon/ListBooks/Listbooks';
import { getBookLinksAll } from '@/back';
import { Metadata } from 'next';

export async function generateMetadata(
  props: {
    params: Promise<{ book: string }>;
    searchParams: Promise<{ [key: string]: string | '' }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const book = await getBookLinksAll({
    book: params.book,
    web: searchParams.web,
  });

  const title = book?.bookInfo?.title || params.book;

  return {
    title: title,
  };
}

const page = async (
  props: {
    params: Promise<{ book: string }>;
    searchParams: Promise<{ [key: string]: string | '' }>;
  }
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
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
