'use client';

import { BookInfoContext } from '@/Providers/BookInfoProvider';
import { Breadcrumbs, Link, Typography } from '@mui/material';
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

  return (
    <Breadcrumbs sx={{ color: 'var(--text)', p: 3 }} aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Головна
      </Link>

      {pathname.map((segment, index) => {
        const href = `/${pathname.slice(0, index + 1).join('/')}${
          web && index === 1 ? `?web=${web}` : ''
        }`;
        const isLast = index === pathname.length - 1;

        return isLast ? (
          <Typography
            key={index}
            color="inherit"
            sx={{ textTransform: 'capitalize' }}
            aria-current="page"
          >
            {segment}
          </Typography>
        ) : (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            sx={{ textTransform: 'capitalize' }}
            href={href}
          >
            {bookInfo?.title && index === 2 ? bookInfo?.title : segment}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustl;
