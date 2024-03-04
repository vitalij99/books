import BookRead from '@/app/_compon/BookRead/BookRead';

import Loading from '@/app/_compon/Loading/Loading';
import { getBookFromLinkAll } from '@/bg';

const page = async ({
  params,
  searchParams,
}: {
  params: { chapter: string; book: string };
  searchParams: { [key: string]: string | '' };
}) => {
  if (!searchParams.web) {
    return <>error</>;
  }
  const books = await getBookFromLinkAll({
    chapter: params.chapter,
    book: params.book,
    web: searchParams.web,
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
