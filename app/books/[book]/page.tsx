import { getBookSearchByName } from '@/lib/novelmin';

const Book = async ({ params }: { params: { book: string } }) => {
  const data = await getBookSearchByName({ name: 'barb', page: 1 });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data as TrustedHTML }} />

      <h1>{params.book}</h1>
    </>
  );
};

export default Book;
