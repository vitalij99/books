import React from 'react';
import { Metadata } from 'next';
import BookRead from '@/app/_compon/BookRead/BookRead';
import { getBookFromLinkAll } from '@/back';
import NavigationPages from '@/app/_compon/NavigationPages/NavigationPages';

export async function generateMetadata(
  props: {
    params: Promise<{ chapter: string; book: string }>;
    searchParams: Promise<{ [key: string]: string | '' }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
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

const page = async (
  props: {
    params: Promise<{ chapter: string; book: string }>;
    searchParams: Promise<{ [key: string]: string | '' }>;
  }
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
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
