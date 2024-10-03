'use client';
import { useContext, useEffect, useState } from 'react';

import SaveBook from '@/app/_compon/SaveBook/SaveBook';
import { IconButton } from '@mui/material';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { ReaderContext } from '@/Providers/ReaderProvider';
import { ColorModeContext } from '@/Providers/DarkProvider';
import React from 'react';

const BookHeader = () => {
  const [isBooksPath, setIsBooksPath] = useState(false);

  const { handleOpen } = useContext(ReaderContext);
  const { mode } = useContext(ColorModeContext);

  useEffect(() => {
    const pathname = document.location.pathname;
    setIsBooksPath(pathname.startsWith('/books/'));
  }, []);

  if (!isBooksPath) {
    return <></>;
  }

  return (
    <>
      <IconButton sx={{ p: 1 }} onClick={() => handleOpen(true)}>
        <PlayCircleOutlineIcon sx={{ width: 45, height: 45, color: '#fff' }} />
      </IconButton>
      <SaveBook />
    </>
  );
};

export default BookHeader;
