import { WEBSITE } from '@/types/back';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

interface SaveOptionsBooksProps {
  selectShowBooks: (web: string) => void;
}

const SaveOptionsBooks = ({ selectShowBooks }: SaveOptionsBooksProps) => {
  const [web, setWeb] = useState('Всі');

  const handleChange = (value: any) => {
    setWeb(value);
    selectShowBooks(value);
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сайт</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={web}
          label="Сайт"
          onChange={handleChange}
        >
          <MenuItem value={'All'}>Всі</MenuItem>
          <MenuItem value={WEBSITE.novelbin}>{WEBSITE.novelbin}</MenuItem>
          <MenuItem value={WEBSITE.novelfire}>{WEBSITE.novelfire}</MenuItem>
          <MenuItem value={WEBSITE.scribblehub}>{WEBSITE.scribblehub}</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SaveOptionsBooks;
