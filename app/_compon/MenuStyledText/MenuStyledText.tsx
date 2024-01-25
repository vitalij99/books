import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React, { useEffect, useState } from 'react';

const MenuStyledText = () => {
  const [color, setColor] = useState(
    localStorage.getItem('textColor') || '#000'
  );
  const [fontSizy, setFontSizy] = useState(
    localStorage.getItem('fontSize') || '20px'
  );

  useEffect(() => {
    const storedFontSize = localStorage.getItem('fontSize');
    const storedTextColor = localStorage.getItem('textColor');

    if (!storedFontSize && !storedTextColor) {
      const defFont =
        getComputedStyle(document.documentElement).getPropertyValue(
          '--font-size'
        ) || '20px';
      const defcolor =
        getComputedStyle(document.documentElement).getPropertyValue(
          '--text-book'
        ) || '#000';

      setColor(defcolor);
      setFontSizy(defFont);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSizy);
    localStorage.setItem('textColor', color);
    console.log(fontSizy, color);
  }, [color, fontSizy]);

  const handldeChangeFont = (value: string) => {
    document.documentElement.style.setProperty('--font-size', value);
    setFontSizy(value);
  };
  const handldeChangeColor = (value: string) => {
    document.documentElement.style.setProperty('--text-book', value);
    setColor(value);
  };

  return (
    <>
      <InputLabel htmlFor="outlined-adornment-amount">font size</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(fontSizy)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handldeChangeFont(event.target.value + 'px');
        }}
      />
      <MuiColorInput value={color} onChange={handldeChangeColor} />
    </>
  );
};

export default MenuStyledText;
