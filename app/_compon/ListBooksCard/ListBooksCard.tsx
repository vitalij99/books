import ItemList from '@/app/_compon/ItemList/ItemList';
import { ListbooksProps } from '@/types/book';
import {
  Box,
  ImageListItem,
  ImageListItemBar,
  Link,
  List,
  Typography,
} from '@mui/material';

import Image from 'next/image';

const ListBooksCard = ({ books, web }: ListbooksProps) => {
  return (
    <Box padding={4}>
      <Typography>{web}</Typography>
      {books.length === 0 ? (
        <Typography>немає</Typography>
      ) : (
        <List
          className="scrollbar"
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            overflow: 'auto',
            gap: 3,
          }}
        >
          <ItemList
            items={books}
            renderItem={(book, index) => (
              <ImageListItem>
                <Box
                  sx={{
                    position: 'relative',
                    width: '200px',
                    height: '250px',
                    display: 'inline-block',
                    p: 2,
                  }}
                >
                  <Link href={`/books/${book.book}?web=${web}`}>
                    <Image
                      priority={index < 6 ? true : false}
                      src={book.img}
                      fill
                      sizes="300px"
                      alt={book.name}
                    />
                    <ImageListItemBar title={book.name} />
                  </Link>
                </Box>
              </ImageListItem>
            )}
          />
        </List>
      )}
    </Box>
  );
};

export default ListBooksCard;
