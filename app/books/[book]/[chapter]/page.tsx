import BookRead from '@/app/_compon/BookRead/BookRead';
import React from 'react';

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
