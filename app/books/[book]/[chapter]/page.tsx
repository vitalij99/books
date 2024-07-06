import BookRead from '@/app/_compon/BookRead/BookRead';

import Loading from '@/app/_compon/Loading/Loading';
import { getBookFromLinkAll } from '@/db';

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

  return (
    <>
      <BookRead params={params} searchParams={searchParams} />
    </>
  );
};

export default page;
