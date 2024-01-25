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
import BookMenu from '../BookMenu/BookMenu';
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
      <AppBar position="static">
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
          <BookMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
