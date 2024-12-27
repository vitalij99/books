'use client';

import { InitTextStyledKeys } from '@/types/book';
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  Switch,
} from '@mui/material';

import React from 'react';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '@/Providers/DarkProvider';
import { TranslateContext } from '@/Providers/TranslateProvider';
import InputColor from '@/app/_compon/InputColor/InputColor';

const MenuStyledText = () => {
  const colorMode = React.useContext(ColorModeContext);
  const translate = React.useContext(TranslateContext);

  const handleChange = (value: string, key: InitTextStyledKeys) => {
    colorMode.toggleStyleText(key, value);
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
        defaultValue={parseFloat(colorMode.styleText.FontSize)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value, 'FontSize');
        }}
      />
      <InputLabel htmlFor="margin-text">Відступ між абзацами</InputLabel>
      <OutlinedInput
        name="margin-text"
        endAdornment={<InputAdornment position="start">px</InputAdornment>}
        label="margin text"
        type="number"
        defaultValue={parseFloat(colorMode.styleText.TextMargin) || 0}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value, 'TextMargin');
        }}
      />
      <InputLabel htmlFor="line-height-text">Відступ між тексту</InputLabel>
      <OutlinedInput
        name="line-height-text"
        label="line-height-text"
        type="number"
        defaultValue={parseFloat(colorMode.styleText.TextLineHeight) * 10 || 15}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(Number(event.target.value) / 10 + '', 'TextLineHeight');
        }}
      />
      <InputLabel htmlFor="mui-color-input">Колір тексту</InputLabel>
      <InputColor
        name="mui-color-input"
        value={colorMode.styleText.TextBook}
        onChange={(event: any) => {
          handleChange(event, 'TextBook');
        }}
      />
      <InputLabel htmlFor="mui-color-bg">Колір фону</InputLabel>
      <InputColor
        name="mui-color-bg"
        value={colorMode.styleText.BgColor}
        onChange={(value: any) => {
          handleChange(value, 'BgColor');
        }}
      />
      <InputLabel htmlFor="pageWidth">Ширина сторінки %</InputLabel>
      <Slider
        name="pageWidth"
        min={0}
        max={30}
        value={Number(colorMode.styleText.BkPadding)}
        onChange={(event, value) => handleChange(value + '', 'BkPadding')}
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
