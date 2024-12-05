import BookRead from '@/app/_compon/BookRead/BookRead';
import { getBookLinksAll } from '@/back';

import { Metadata } from 'next';
import React from 'react';

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
