'use client';

import Auth from '@/app/_compon/Auth/Auth';
import BookHeader from '@/app/_compon/BookHeader/BookHeader';
import NavLinks from '@/app/_compon/NavLinks/NavLinks';
import SaveBook from '@/app/_compon/SaveBook/SaveBook';
import Search from '@/app/_compon/Search/Search';
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from '@mui/material';

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
            <SaveBook />
            <div>
              <Auth />
            </div>
            <BookHeader />
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
};

export default Header;
