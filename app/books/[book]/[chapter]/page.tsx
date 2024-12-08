import React from 'react';
import { Metadata } from 'next';
import BookRead from '@/app/_compon/BookRead/BookRead';
import { getBookFromLinkAll, getBookLinksAll } from '@/back';

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
  const book = await getBookFromLinkAll({
    chapter: params.chapter,
    book: params.book,
    web: searchParams.web,
  });

  return <>{book && <BookRead book={book} params={params} />}</>;
};

export default page;
