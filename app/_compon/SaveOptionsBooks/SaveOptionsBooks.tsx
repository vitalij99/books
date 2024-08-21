import { WEBSITE_KEY } from '@/types/back';
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
          <MenuItem value={WEBSITE_KEY.novelbin}>
            {WEBSITE_KEY.novelbin}
          </MenuItem>
          <MenuItem value={WEBSITE_KEY.novelfire}>
            {WEBSITE_KEY.novelfire}
          </MenuItem>
          <MenuItem value={WEBSITE_KEY.scribblehub}>
            {WEBSITE_KEY.scribblehub}
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SaveOptionsBooks;
