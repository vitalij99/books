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

  const textShorten = (text: string, num = 20) => {
    return text.length >= num ? text.slice(0, num) + '...' : text;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
      {navigate.prevPage && (
        <Link href={navigate.prevPage}>
          {!navigate.prevText ? 'Попередня' : textShorten(navigate.prevText)}
        </Link>
      )}
      <Link href={hrefBook}>
        {textShorten(title)} параграф {textShorten(charpter)}
      </Link>
      {navigate.nextPage && (
        <Link href={navigate.nextPage}>
          {!navigate.nextText ? 'Наступна' : textShorten(navigate.nextText)}
        </Link>
      )}
    </Box>
  );
};

export default NavigationPages;
