import { getBookSearchByName } from '@/lib/novelmin';

const search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // const data = await getBookSearchByName({ name: 'barb', page: 1 });

  console.log(searchParams);
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: data as TrustedHTML }} /> */}

      <h1>{searchParams[0]}</h1>
    </>
  );
};

export default search;
