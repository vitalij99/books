'use client';
import { getStorageRootValue } from '@/lib/getStorage';
import { AllowedKeys, STORAGE_KEY } from '@/type/book';
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  Switch,
} from '@mui/material';

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import debounce from 'lodash.debounce';
import {
  ColorModeContext,
  TranslateContext,
} from '../DarkTranslateProvider/DarkTranslateProvider';
import InputColor from '../InputColor/InputColor';

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

  const colorMode = React.useContext(ColorModeContext);
  const translate = React.useContext(TranslateContext);

  const handleChange = (value: string, key: AllowedKeys) => {
    setStorageDef(prev => ({ ...prev, [key]: value }));
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
        name="outlined-adornment-amount"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="font size"
        type="number"
        defaultValue={parseFloat(storageDef[AllowedKeys.FontSize])}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value + 'px', AllowedKeys.FontSize);
        }}
      />
      <InputLabel htmlFor="mui-color-input">Колір тексту</InputLabel>
      <InputColor
        name="mui-color-input"
        value={storageDef[AllowedKeys.TextBook]}
        onChange={(event: any) => {
          handleChange(event, AllowedKeys.TextBook);
        }}
      />
      <InputLabel htmlFor="mui-color-bg">Колір фону</InputLabel>
      <InputColor
        name="mui-color-bg"
        value={storageDef[AllowedKeys.BgColor]}
        onChange={(value: any) => {
          handleChange(value, AllowedKeys.BgColor);
        }}
      />
      <InputLabel htmlFor="pageWidth">Ширина сторінки px</InputLabel>
      <Slider
        name="pageWidth"
        min={0}
        max={1000}
        value={parseFloat(storageDef[AllowedKeys.BkPadding])}
        onChange={(event, value) =>
          handleChange(value + 'px', AllowedKeys.BkPadding)
        }
        valueLabelDisplay="auto"
      />
      <InputLabel htmlFor="pageWidth">Переклад</InputLabel>
      <Switch
        checked={translate.translate}
        onChange={event => translate.handleTranslate(event.target.checked)}
      />
    </Box>
  );
};
const debouncedHandleChange = debounce((value: string, key: AllowedKeys) => {
  localStorage.setItem(key, value);
  document.documentElement.style.setProperty(key, value);
}, 500);
export default MenuStyledText;
