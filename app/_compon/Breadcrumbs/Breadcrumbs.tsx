'use client';

import { BookInfoContext } from '@/Providers/BookInfoProvider';
import { Link, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const BreadcrumbsCustl = () => {
  const [pathname, setPathname] = useState<string[]>(['/']);
  const [web, setWeb] = useState<string | undefined>();
  const { bookInfo } = useContext(BookInfoContext);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    setPathname(pathSegments);

    const params = new URLSearchParams(window.location.search);
    const webParam = params.get('web');

    setWeb(webParam || undefined);
  }, []);

  if (pathname.length === 1) {
    return (
      <nav>
        <Link underline="hover" color="inherit" href="/">
          Головна
        </Link>
      </nav>
    );
  }

  return (
    <nav aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Головна
      </Link>

      {pathname.map((segment, index) => {
        const href = `/${pathname.slice(0, index + 1).join('/')}${
          web && index === 1 ? `?web=${web}` : ''
        }`;
        const isLast = index === pathname.length - 1;
        const text = bookInfo?.title && index === 1 ? bookInfo?.title : segment;

        return isLast ? (
          <Typography
            key={index}
            color="inherit"
            sx={{ textTransform: 'capitalize' }}
            aria-current="page"
          >
            {text}
          </Typography>
        ) : (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            sx={{ textTransform: 'capitalize' }}
            href={href}
          >
            {text}
          </Link>
        );
      })}
    </nav>
  );
};

export default BreadcrumbsCustl;
