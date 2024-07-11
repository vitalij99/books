import React from 'react';
import SaveBooksLinks from '@/app/_compon/SaveBooksLinks/SaveBooksLinks';
import { auth } from '@/auth';

const Books = async () => {
  const session = await auth();
  console.log(session);
  return (
    <>
      <SaveBooksLinks />
    </>
  );
};

export default Books;
