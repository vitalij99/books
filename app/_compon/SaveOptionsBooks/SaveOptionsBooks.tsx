import { WEBSITE } from '@/back';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const SaveOptionsBooks = () => {
  const [web, setWeb] = useState('Всі');

  const handleChange = (value: any) => {
    setWeb(value);
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
