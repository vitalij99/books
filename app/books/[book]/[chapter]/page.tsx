import React from 'react';
import { Metadata } from 'next';
import BookRead from '@/app/_compon/BookRead/BookRead';
import { getBookFromLinkAll } from '@/back';
import NavigationPages from '@/app/_compon/NavigationPages/NavigationPages';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { chapter: string; book: string };
  searchParams: { [key: string]: string | '' };
}): Promise<Metadata> {
  const book = await getBookFromLinkAll({
    chapter: params.chapter,
    book: params.book,
    web: searchParams.web,
  });

  const title = book?.title || params.book;

  return {
    title,
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

  return (
    <>
      {book && (
        <>
          <NavigationPages
            title={book.title || params.book}
            charpter={params.chapter}
            bookHref={params.book}
            navigate={book.nav}
            web={searchParams?.web}
          />
          <BookRead book={book} />
          <NavigationPages
            title={book.title || params.book}
            charpter={params.chapter}
            bookHref={params.book}
            navigate={book.nav}
            web={searchParams?.web}
          />
        </>
      )}
    </>
  );
};

export default page;
