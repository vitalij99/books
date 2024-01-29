import Book from '@/app/_compon/Book/Book';
import { getBookLink } from '@/lib/novelmin';

const page = async ({
  params,
  searchParams,
}: {
  params: { book: string };
  searchParams: { [key: string]: string | '' };
}) => {
  console.log(searchParams);
  const book = await getBookLink({ book: params.book });
  return <>{book && <Book data={book} translate={true} timeReader={'2'} />}</>;
};

export default page;
