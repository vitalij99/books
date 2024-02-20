interface BookProps {
  book: string[];
}
const Book = (data: BookProps) => {
  if (!data) {
    return <div>Error</div>;
  }

  return <></>;
};

export default Book;
