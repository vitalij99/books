'use client';
import { useContext, useEffect, useState } from 'react';

import BookMenu from '@/app/_compon/BookMenu/BookMenu';
import SaveBook from '@/app/_compon/SaveBook/SaveBook';
import { Button } from '@mui/material';

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { ReaderContext } from '@/app/Providers/ReaderProvider';

const BookHeader = () => {
  const [isBooksPath, setIsBooksPath] = useState(false);

  const { handleOpen } = useContext(ReaderContext);

  useEffect(() => {
    const pathname = document.location.pathname;
    setIsBooksPath(pathname.startsWith('/books'));
  }, []);

  if (!isBooksPath) {
    return <></>;
  }
  return (
    <>
      <Button sx={{ p: 1 }} onClick={() => handleOpen(true)}>
        <PlayCircleFilledWhiteOutlinedIcon sx={{ width: 45, height: 45 }} />
      </Button>
      <SaveBook />
      <BookMenu />
    </>
  );
};

export default BookHeader;
