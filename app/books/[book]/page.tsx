
const Book = ({params}: {params: {book: string}}) => {
  return (
    <>
      <div>Book</div>
          <h1>{params.book }</h1>
    </>
  );
};

export default Book;
