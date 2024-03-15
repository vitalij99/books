'use client';

import {
  Box,
  FormControl,
  Link,
  TextField,
  Typography,
  createTheme,
} from '@mui/material';

import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

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
      <>
        <form
          onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
            handleSubmit(event);
          }}
        >
          <FormControl>
            <TextField
              name="search"
              label="Поле введення"
              type="search"
              variant="filled"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleSearchChange(event.target.value);
              }}
            />
          </FormControl>
        </form>
      </>
    </Box>
  );
};

export default Search;
