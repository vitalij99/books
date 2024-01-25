import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  debounce,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React, { useEffect, useState } from 'react';

enum AllowedKeys {
  FontSize = '--font-size',
  TextBook = '--text-book',
  BgColor = '--bg-color-book',
}

const MenuStyledText = () => {
  const [color, setColor] = useState(
    localStorage.getItem(AllowedKeys.TextBook) || '#000'
  );
  const [colorBg, setColorBg] = useState(
    localStorage.getItem(AllowedKeys.BgColor) || '#000'
  );
  const [fontSizy, setFontSizy] = useState(
    localStorage.getItem(AllowedKeys.FontSize) || '20px'
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

  const debouncedHandleChange = debounce((value: string, key: AllowedKeys) => {
    localStorage.setItem(key, value);
    document.documentElement.style.setProperty(key, value);
  }, 500);

  const handldeChangeFont = (value: string) => {
    setFontSizy(value);

    debouncedHandleChange(value, AllowedKeys.FontSize);
  };
  const handldeChangeColor = (value: string) => {
    setColor(value);

    debouncedHandleChange(value, AllowedKeys.TextBook);
  };
  const handldeChangeColorBg = (value: string) => {
    setColorBg(value);

    debouncedHandleChange(value, AllowedKeys.BgColor);
  };

  return (
    <Box>
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="outlined-adornment-amount"
      >
        Text size
      </InputLabel>
      <OutlinedInput
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        id="outlined-adornment-amount"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(fontSizy)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handldeChangeFont(event.target.value + 'px');
        }}
      />
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="mui-color-input"
      >
        Text color
      </InputLabel>
      <MuiColorInput
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        id="mui-color-input"
        value={color}
        format="hex"
        isAlphaHidden
        onChange={handldeChangeColor}
      />
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="mui-color-bg"
      >
        Background color
      </InputLabel>
      <MuiColorInput
        id="mui-color-bg"
        value={colorBg}
        isAlphaHidden
        format="hex"
        onChange={handldeChangeColorBg}
      />
    </Box>
  );
};

export default MenuStyledText;
