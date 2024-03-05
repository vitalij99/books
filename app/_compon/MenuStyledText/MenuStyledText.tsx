'use client';
import { getStorageRootValue } from '@/lib/getStorage';
import { AllowedKeys, STORAGE_KEY } from '@/type/book';
import { Box, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../DarkProvider/DarkProvider';
import debounce from 'lodash.debounce';

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
const debouncedHandleChange = debounce((value: string, key: AllowedKeys) => {
  localStorage.setItem(key, value);
  document.documentElement.style.setProperty(key, value);
}, 500);
const MenuStyledText = () => {
  const [storage, setStorage] = useState(defaultStorage);

  const colorMode = React.useContext(ColorModeContext);

  const handldeChange = (value: string, key: AllowedKeys) => {
    setStorage(prev => ({ ...prev, [key]: value }));
    debouncedHandleChange(value, key);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.primary',
          borderRadius: 1,
        }}
      >
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{ ml: 1 }}
          color="inherit"
        >
          {colorMode.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <InputLabel htmlFor="outlined-adornment-amount">Розмір тексту</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(storage[AllowedKeys.FontSize])}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handldeChange(event.target.value + 'px', AllowedKeys.FontSize);
        }}
      />
      <InputLabel htmlFor="mui-color-input">Колір тексту</InputLabel>
      <MuiColorInput
        id="mui-color-input"
        value={storage[AllowedKeys.TextBook]}
        format="hex"
        isAlphaHidden
        onChange={(value: string) => {
          handldeChange(value, AllowedKeys.TextBook);
        }}
      />
      <InputLabel htmlFor="mui-color-bg">Колір фону</InputLabel>
      <MuiColorInput
        id="mui-color-bg"
        value={storage[AllowedKeys.BgColor]}
        isAlphaHidden
        format="hex"
        onChange={(value: string) => {
          handldeChange(value, AllowedKeys.BgColor);
        }}
      />
      <InputLabel htmlFor="pageWidth">Ширина сторінки</InputLabel>
      <OutlinedInput
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
