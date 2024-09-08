'use client';
import { Breadcrumbs, Link } from '@mui/material';

import { usePathname } from 'next/navigation';

const BreadcrumbsCustl = () => {
  const pathname = usePathname();
  const [_, prefPath, thisPath] = pathname.split('/');

  if (!prefPath) {
    return <></>;
  }

  return (
    <Breadcrumbs sx={{ color: 'var(--text)', p: 3 }} aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Головна
      </Link>
      <Link
        underline="hover"
        color="inherit"
        sx={{ textTransform: 'capitalize' }}
        href={`/${prefPath}`}
      >
        {prefPath}
      </Link>
      {thisPath && (
        <Link
          underline="hover"
          color="inherit"
          sx={{ textTransform: 'capitalize' }}
          href={`/${prefPath}/${thisPath}`}
        >
          {thisPath}
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustl;
