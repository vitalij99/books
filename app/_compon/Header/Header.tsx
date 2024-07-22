'use client';
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from '@mui/material';

import Auth from '@/app/_compon/Auth/Auth';
import BookHeader from '@/app/_compon/BookHeader/BookHeader';
import NavLinks from '@/app/_compon/NavLinks/NavLinks';
import Search from '@/app/_compon/Search/Search';

const Header = () => {
  const trigger = useScrollTrigger();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <NavLinks />
            <Search />
            <Box sx={{ flexGrow: 1 }} />

            <BookHeader />
            <div>
              <Auth />
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
};

export default Header;
