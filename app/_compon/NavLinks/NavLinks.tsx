'use client';
import { Typography, Link } from '@mui/material';
import React from 'react';

const NAVLINK = [
  {
    href: '/',
    key: 'Популярне',
  },
  {
    href: '/books',
    key: 'Книги',
  },
];

const NavLinks = () => (
  <>
    {NAVLINK.map(({ href, key }) => (
      <Link
        key={key}
        href={href}
        sx={{ my: 2, p: 2, color: 'white', display: 'block' }}
      >
        <Typography> {key}</Typography>
      </Link>
    ))}
  </>
);

export default NavLinks;
