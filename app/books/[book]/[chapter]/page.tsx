import BookRead from '@/app/_compon/BookRead/BookRead';
import { Listbooks } from '@/app/_compon/ListBooks/Listbooks';
import Loading from '@/app/_compon/Loading/Loading';
import { getBookFromLink, getBookLinks } from '@/bg/novelmin';
import Link from 'next/link';

const page = async ({
  params,
  searchParams,
}: {
  params: { chapter: string; book: string };
  searchParams: { [key: string]: string | '' };
}) => {
  const books = await getBookFromLink({
    chapter: params.chapter,
    book: params.book,
  });
  if (!books) {
    return <Loading />;
  }
  return (
    <>
      <BookRead data={books} />
    </>
  );
};

export default page;
