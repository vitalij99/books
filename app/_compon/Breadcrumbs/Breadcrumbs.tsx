'use client';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const BreadcrumbsCustl = () => {
  const [pathname, setPathname] = useState<string[]>(['/']);
  const [web, setWeb] = useState<string | undefined>();

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    setPathname(pathSegments);

    const params = new URLSearchParams(window.location.search);
    const webParam = params.get('web');

    setWeb(webParam || undefined);
  }, []);

  if (pathname.length <= 1) {
    return null;
  }

  return (
    <Breadcrumbs sx={{ color: 'var(--text)', p: 3 }} aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Головна
      </Link>

      {pathname[0] && (
        <Link
          underline="hover"
          color="inherit"
          sx={{ textTransform: 'capitalize' }}
          href={`/${pathname[0]}`}
        >
          {pathname[0]}
        </Link>
      )}

      {pathname[1] && (
        <Link
          underline="hover"
          color="inherit"
          sx={{ textTransform: 'capitalize' }}
          href={`/${pathname[0]}/${pathname[1]}${web ? `?web=${web}` : ''}`}
        >
          {pathname[1]}
        </Link>
      )}

      {pathname[2] && (
        <Typography color="inherit" sx={{ textTransform: 'capitalize' }}>
          {pathname[2]}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustl;
