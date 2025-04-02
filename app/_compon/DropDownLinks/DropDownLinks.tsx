'use client';
import ItemList from '@/app/_compon/ItemList/ItemList';
import { BookSaveDB } from '@/types/book';
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

interface DropDownLinksProps {
  book: BookSaveDB;
  handleDeleteCharpter: (
    bookId: string,
    deleteChapter: string
  ) => Promise<void>;
}

const DropDownLinks = ({ book, handleDeleteCharpter }: DropDownLinksProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 1, width: '200px' }}>
      <Link
        href={`books/${book.title}/${book.lastReadeChapter}?web=${book.web}`}
      >
        <Typography>Остання прочитана {book.lastReadeChapter}</Typography>
      </Link>
      {book.chapter &&
        book.chapter.length !== 0 &&
        book.chapter[0].length !== 0 && (
          <>
            <Button
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Закладки
            </Button>
            <Menu
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorEl={anchorEl}
            >
              <ItemList
                items={book.chapter}
                renderItem={chapter => (
                  <MenuItem
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Link
                      href={`books/${book.title}/${chapter}?web=${book.web}`}
                    >
                      <Typography>глава {chapter}</Typography>
                    </Link>

                    <IconButton
                      onClick={() => handleDeleteCharpter(book.id, chapter)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </MenuItem>
                )}
              />
            </Menu>
          </>
        )}
    </Box>
  );
};

export default DropDownLinks;
