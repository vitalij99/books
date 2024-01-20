'use client';

import {
  Box,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';

import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || ' ');

  const handleSearchChange = (value: string) => {
    const trimmedValue = value.trim();
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set('search', trimmedValue);
    setSearch(trimmedValue);

    window.history.pushState({}, '', `?${searchParams}`);
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?search=${search}`);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        href={`/search?search=${search}`}
        sx={{ my: 2, p: 2, color: 'white', display: 'block' }}
      >
        <Typography>Пошук</Typography>
      </Link>
      <ThemeProvider theme={darkTheme}>
        <form
          onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
            handleSubmit(event);
          }}
        >
          <TextField
            id="filled-search"
            label="Поле введення"
            type="Пошук"
            variant="filled"
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleSearchChange(event.target.value);
            }}
          />
        </form>
      </ThemeProvider>
    </Box>
  );
};

export default Search;
