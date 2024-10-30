'use client';
import { getStorageRootValue, setPropertyStyle } from '@/lib/getStorage';
import {
  AllowedKeys,
  MENUSTYLEDTEXT,
  STORAGE_KEY,
  StorageType,
} from '@/types/book';
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
import { ColorModeContext } from '@/Providers/DarkProvider';
import { TranslateContext } from '@/Providers/TranslateProvider';
import InputColor from '@/app/_compon/InputColor/InputColor';

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

    setPropertyStyle(MENUSTYLEDTEXT, { ...storageDef, [key]: value });
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
      <InputLabel htmlFor="margin-text">Відступ між абзацами</InputLabel>
      <OutlinedInput
        name="margin-text"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="margin text"
        type="number"
        defaultValue={parseFloat(storageDef[AllowedKeys.TextMargin]) || 0}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value + 'px', AllowedKeys.TextMargin);
        }}
      />
      <InputLabel htmlFor="line-height-text">Відступ між тексту</InputLabel>
      <OutlinedInput
        name="line-height-text"
        label="line-height-text"
        type="number"
        defaultValue={
          parseFloat(storageDef[AllowedKeys.TextLineHeight]) * 10 || 15
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(
            Number(event.target.value) / 10 + '',
            AllowedKeys.TextLineHeight
          );
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
      <InputLabel htmlFor="pageWidth">Ширина сторінки %</InputLabel>
      <Slider
        name="pageWidth"
        min={0}
        max={30}
        value={parseFloat(storageDef[AllowedKeys.BkPadding])}
        onChange={(event, value) =>
          handleChange(value + '%', AllowedKeys.BkPadding)
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

export default MenuStyledText;
