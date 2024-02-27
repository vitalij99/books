import { getStorageRootValue } from '@/lib/getStorage';
import { AllowedKeys, STORAGE_KEY } from '@/type/book';
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  debounce,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type StorageType = {
  [key in AllowedKeys]: string;
};

const defaultStorage = (): StorageType => {
  const storage: StorageType = {} as StorageType;
  STORAGE_KEY.forEach(key => {
    storage[key] = getStorageRootValue(key as AllowedKeys);
  });
  return storage;
};

const MenuStyledText = () => {
  const [storage, setStorage] = useState(defaultStorage);
  const [theme, setTheme] = useState('light');

  const debouncedHandleChange = debounce((value: string, key: AllowedKeys) => {
    localStorage.setItem(key, value);
    document.documentElement.style.setProperty(key, value);
  }, 500);

  const handldeChange = (value: string, key: AllowedKeys) => {
    setStorage({ ...storage, [key]: value });
    debouncedHandleChange(value, key);
  };
  const handleTheme = () => {
    setTheme(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton onClick={handleTheme} sx={{ ml: 1 }} color="inherit">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

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
    </>
  );
};

export default MenuStyledText;
