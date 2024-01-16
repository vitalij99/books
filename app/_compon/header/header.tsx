import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
const NAVLINK = [
  {
    href: '/popular',
    key: 'Популярне',
  },
  {
    href: '/books',
    key: 'Книги',
  },
  {
    href: '/search',
    key: 'Пошук',
  },
];

const Header = () => {
  const handleCloseNavMenu = () => {};
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
