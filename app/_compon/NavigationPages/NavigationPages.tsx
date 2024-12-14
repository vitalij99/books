'use client';
import { Box, Link } from '@mui/material';
import { useEffect, useState } from 'react';

interface NavigationPagesProps {
  title: string;
  charpter: string;
  navigate: {
    nextPage?: string;
    nextText?: string;
    prevPage?: string;
    prevText?: string;
  };
}

const NavigationPages = ({
  navigate,
  title,
  charpter,
}: NavigationPagesProps) => {
  const [hrefBook, setHrefBook] = useState('/');

  useEffect(() => {
    const pathSegments = window.location.pathname
      .split('/')
      .filter((el, i) => i <= 2 && el);
    const params = new URLSearchParams(window.location.search);
    const webParam = params.get('web');
    setHrefBook(`/${pathSegments[0]}/${pathSegments[1]}?web=${webParam}`);
  }, []);

  const textTitle = title.length >= 20 ? title.slice(0, 20) + '...' : title;
  const textCharpter =
    charpter.length >= 20 ? charpter.slice(0, 20) + '...' : charpter;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
      {navigate.prevPage && (
        <Link href={navigate.prevPage}>
          {navigate.prevText?.length === 0 ? 'Попередня' : navigate.prevText}
        </Link>
      )}
      <Link href={hrefBook}>
        {textTitle} параграф {textCharpter}
      </Link>
      {navigate.nextPage && (
        <Link href={navigate.nextPage}>
          {navigate.nextText?.length === 0 ? 'Наступна' : navigate.nextText}
        </Link>
      )}
    </Box>
  );
};

export default NavigationPages;
