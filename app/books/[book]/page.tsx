import Book from '@/app/_compon/Book/Book';
import { getBookLink } from '@/lib/novelmin';

const page = async ({ params }: { params: { book: string } }) => {
  const book = await getBookLink({ book: params.book });
  return (
    <>
      <h1>{params.book}</h1>
      {book && <Book data={book} />}
    </>
  );
};

export default page;
