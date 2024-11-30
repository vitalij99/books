'use client';
import React, { useState } from 'react';

import {
  Box,
  FormControl,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';

import { useRouter, useSearchParams } from 'next/navigation';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const Search = ({ page = false }: { page?: boolean }) => {
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

  const textField = (
    <FormControl>
      <TextField
        name="search"
        label="Поле введення"
        type="search"
        variant="outlined"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleSearchChange(event.target.value);
        }}
      />
    </FormControl>
  );

  return (
    <Box
      sx={{
        display: page ? 'flex' : { md: 'flex', xs: 'none' },
        alignItems: 'center',
        justifyContent: page ? 'center' : 'normal',
      }}
    >
      <Link
        href={`/search?search=${search}`}
        sx={{
          my: 2,
          p: 2,
          color: page ? 'primary' : 'white',
          display: 'block',
        }}
      >
        <Typography>Пошук</Typography>
      </Link>
      <Box>
        <form
          onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
            handleSubmit(event);
          }}
        >
          {page ? (
            textField
          ) : (
            <ThemeProvider theme={theme}>{textField}</ThemeProvider>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Search;
