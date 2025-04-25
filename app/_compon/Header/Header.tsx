'use client';
import React from 'react';
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from '@mui/material';

import AuthBtn from '@/app/_compon/Auth/AuthBtn';
import BookHeader from '@/app/_compon/BookHeader/BookHeader';
import NavLinks from '@/app/_compon/NavLinks/NavLinks';
import Search from '@/app/_compon/Search/Search';
import BookMenu from '@/app/_compon/BookMenu/BookMenu';
import Container from '@/app/_compon/Container/Container';

const Header = () => {
  const trigger = useScrollTrigger();

  return (
    <Container>
      <Box sx={{ height: 100 }}>
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
      </Box>
    </Container>
  );
};

export default Header;
