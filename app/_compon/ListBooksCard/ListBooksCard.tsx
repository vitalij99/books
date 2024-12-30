import ItemList from '@/app/_compon/ItemList/ItemList';
import { ListBooksCardProps } from '@/types/book';
import {
  Box,
  ImageListItem,
  ImageListItemBar,
  Link,
  List,
  Typography,
} from '@mui/material';

import Image from 'next/image';

const ListBooksCard = ({
  books,
  web,
  firstPriority = 2,
}: ListBooksCardProps) => {
  return (
    <Box padding={4}>
      <Typography>{web}</Typography>
      {books && books.length === 0 ? (
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
                <Link href={`/books/${book.book}?web=${web}`}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '200px',
                      height: '250px',
                      display: 'inline-block',
                      p: 2,
                    }}
                  >
                    <Image
                      priority={
                        firstPriority !== 0 && index < firstPriority
                          ? true
                          : false
                      }
                      src={book.img}
                      fill
                      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 10vw, 10vw"
                      alt={book.name}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                    <ImageListItemBar title={book.name} />
                  </Box>
                </Link>
              </ImageListItem>
            )}
          />
        </List>
      )}
    </Box>
  );
};

export default ListBooksCard;
