import { WEBSITE } from '@/types/back';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useState } from 'react';

interface SaveOptionsBooksProps {
  selectShowBooks: (web: string) => void;
}

const SaveOptionsBooks = ({ selectShowBooks }: SaveOptionsBooksProps) => {
  const [web, setWeb] = useState('all');

  const handleChange = ({ target }: any) => {
    setWeb(target.value);
    selectShowBooks(target.value);
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-save-options-books">Сайт</InputLabel>
        <Select
          labelId="select-save-options-books"
          value={web}
          label="Сайт"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>Всі</MenuItem>
          <MenuItem value={WEBSITE.novelbin}>{WEBSITE.novelbin}</MenuItem>
          <MenuItem value={WEBSITE.novelfire}>{WEBSITE.novelfire}</MenuItem>
          <MenuItem value={WEBSITE.scribblehub}>{WEBSITE.scribblehub}</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SaveOptionsBooks;
