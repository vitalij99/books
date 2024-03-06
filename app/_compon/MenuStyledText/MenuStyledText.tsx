'use client';
import { getStorage, getStorageRootValue, setStorage } from '@/lib/getStorage';
import { AllowedKeys, READER_KEY, STORAGE_KEY } from '@/type/book';
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
} from '@mui/material';
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

const MenuStyledText = () => {
  const [storageDef, setStorageDef] = useState(defaultStorage);
  const [translate, setTranslate] = useState(
    getStorage(READER_KEY.translage) === 'true' ? true : false
  );

  const colorMode = React.useContext(ColorModeContext);

  const handleChange = (value: string, key: AllowedKeys) => {
    setStorageDef(prev => ({ ...prev, [key]: value }));
    debouncedHandleChange(value, key);
  };
  const handleTranslate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslate(event.target.checked);
    const storageValue = event.target.checked + '';
    setStorage(storageValue, READER_KEY.translage);
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
        defaultValue={parseFloat(storageDef[AllowedKeys.FontSize])}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value + 'px', AllowedKeys.FontSize);
        }}
      />
      <InputLabel htmlFor="mui-color-input">Колір тексту</InputLabel>
      <MuiColorInput
        id="mui-color-input"
        value={storageDef[AllowedKeys.TextBook]}
        format="hex"
        isAlphaHidden
        onChange={(value: string) => {
          handleChange(value, AllowedKeys.TextBook);
        }}
      />
      <InputLabel htmlFor="mui-color-bg">Колір фону</InputLabel>
      <MuiColorInput
        id="mui-color-bg"
        value={storageDef[AllowedKeys.BgColor]}
        isAlphaHidden
        format="hex"
        onChange={(value: string) => {
          handleChange(value, AllowedKeys.BgColor);
        }}
      />
      <InputLabel htmlFor="pageWidth">Ширина сторінки</InputLabel>
      <OutlinedInput
        id="pageWidth"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(storageDef[AllowedKeys.BkPadding])}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value + 'px', AllowedKeys.BkPadding);
        }}
      />
      <InputLabel htmlFor="pageWidth">Переклад</InputLabel>
      <Switch checked={translate} onChange={handleTranslate} />
    </Box>
  );
};
const debouncedHandleChange = debounce((value: string, key: AllowedKeys) => {
  localStorage.setItem(key, value);
  document.documentElement.style.setProperty(key, value);
}, 500);
export default MenuStyledText;
