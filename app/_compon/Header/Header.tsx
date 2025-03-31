'use client';
import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Slide,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';

import AuthBtn from '@/app/_compon/Auth/AuthBtn';
import BookHeader from '@/app/_compon/BookHeader/BookHeader';
import NavLinks from '@/app/_compon/NavLinks/NavLinks';
import Search from '@/app/_compon/Search/Search';
import BookMenu from '@/app/_compon/BookMenu/BookMenu';

const Header = () => {
  const trigger = useScrollTrigger();

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, height: '88px' }}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <NavLinks />

            <Search />
            <Box sx={{ flexGrow: 1 }} />
            <BookHeader />
            <BookMenu />
            <div>
              <AuthBtn />
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
    </Container>

  );
};

export default Header;
