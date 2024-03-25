'use client';
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Search from '../Search/Search';

import BookHeader from '../BookHeader/BookHeader';
import SaveBook from '../SaveBook/SaveBook';

const NAVLINK = [
  {
    href: '/popular',
    key: 'Популярне',
  },
  {
    href: '/books',
    key: 'Книги',
  },
];

const Header = () => {
  const trigger = useScrollTrigger();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {NAVLINK.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                sx={{ my: 2, p: 2, color: 'white', display: 'block' }}
              >
                <Typography> {key}</Typography>
              </Link>
            ))}
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
