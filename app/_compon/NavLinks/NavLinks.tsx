'use client';
import React from 'react';
import {
  Typography,
  Link,
  MenuItem,
  Box,
  IconButton,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NAVLINK = [
  {
    href: '/',
    key: 'Головна',
  },
  {
    href: '/books',
    key: 'Книги',
  },
];
const NAVLINKMOBILE = [
  ...NAVLINK,
  {
    href: '/search',
    key: 'Пошук',
  },
];

const NavLinks = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { md: 'none', xs: 'flex' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {NAVLINKMOBILE.map(({ href, key }) => (
            <MenuItem key={key}>
              <Link
                href={href}
                sx={{ my: 2, p: 2, color: 'white', display: 'block' }}
              >
                <Typography> {key}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
        {NAVLINK.map(({ href, key }) => (
          <MenuItem key={key}>
            <Link
              href={href}
              sx={{ my: 2, p: 2, color: 'white', display: 'block' }}
            >
              <Typography>{key}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Box>
    </>
  );
};

export default NavLinks;
