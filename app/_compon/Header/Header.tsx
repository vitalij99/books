'use client';
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from '@mui/material';

import Search from '../Search/Search';

import BookHeader from '../BookHeader/BookHeader';
import SaveBook from '../SaveBook/SaveBook';
import NavLinks from '../NavLinks/NavLinks';

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
            <BookHeader />
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
};

export default Header;
