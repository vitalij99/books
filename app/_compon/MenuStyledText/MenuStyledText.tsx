import { getStorage } from '@/lib/getStorage';
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
  BkPadding = '--book-padding',
}

const STORAGE_KEY = [
  AllowedKeys.FontSize,
  AllowedKeys.TextBook,
  AllowedKeys.BgColor,
  AllowedKeys.BkPadding,
];

type StorageType = {
  [key in AllowedKeys]: string;
};

const defaultStorage = (): StorageType => {
  const storage: StorageType = {} as StorageType;
  STORAGE_KEY.forEach(key => {
    storage[key] = getStorage(key as AllowedKeys);
  });
  return storage;
};

const MenuStyledText = () => {
  const [storage, setStorage] = useState(defaultStorage);

  const debouncedHandleChange = debounce((value: string, key: AllowedKeys) => {
    localStorage.setItem(key, value);
    document.documentElement.style.setProperty(key, value);
  }, 500);

  const handldeChange = (value: string, key: AllowedKeys) => {
    setStorage({ ...storage, [key]: value });
    debouncedHandleChange(value, key);
  };

  return (
    <Box>
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="outlined-adornment-amount"
      >
        Розмір тексту
      </InputLabel>
      <OutlinedInput
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        id="outlined-adornment-amount"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(storage[AllowedKeys.FontSize])}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handldeChange(event.target.value + 'px', AllowedKeys.FontSize);
        }}
      />
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="mui-color-input"
      >
        Колір тексту
      </InputLabel>
      <MuiColorInput
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        id="mui-color-input"
        value={storage[AllowedKeys.TextBook]}
        format="hex"
        isAlphaHidden
        onChange={(value: string) => {
          handldeChange(value, AllowedKeys.TextBook);
        }}
      />
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="mui-color-bg"
      >
        Колір фону
      </InputLabel>
      <MuiColorInput
        id="mui-color-bg"
        value={storage[AllowedKeys.BgColor]}
        isAlphaHidden
        format="hex"
        onChange={(value: string) => {
          handldeChange(value, AllowedKeys.BgColor);
        }}
      />
      <InputLabel
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        htmlFor="pageWidth"
      >
        Ширина сторінки
      </InputLabel>
      <OutlinedInput
        sx={{ color: `var(${AllowedKeys.TextBook})` }}
        id="pageWidth"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(storage[AllowedKeys.BkPadding])}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handldeChange(event.target.value + 'px', AllowedKeys.BkPadding);
        }}
      />
    </Box>
  );
};

export default MenuStyledText;
