import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
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
    </Box>
  );
};

export default Header;
