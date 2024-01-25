import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React from 'react';

const MenuStyledText = () => {
  const defcolor =
    getComputedStyle(document.documentElement).getPropertyValue(
      '--text-book'
    ) || '#000';

  const [color, setColor] = React.useState(defcolor);

  const handldeChangeFont = (value: string) => {
    document.documentElement.style.setProperty('--font-size', value);
  };
  const handldeChangeColor = (value: string) => {
    document.documentElement.style.setProperty('--text-book', value);
    setColor(value);
  };

  const defFont = getComputedStyle(document.documentElement).getPropertyValue(
    '--font-size'
  );

  return (
    <>
      <InputLabel htmlFor="outlined-adornment-amount">font size</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(defFont)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handldeChangeFont(event.target.value + 'px');
        }}
      />
      <MuiColorInput value={color} onChange={handldeChangeColor} />
    </>
  );
};

export default MenuStyledText;
