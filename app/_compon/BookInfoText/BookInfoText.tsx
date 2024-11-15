import { Typography } from '@mui/material';
import React from 'react';

const BookInfoText = ({ children }: { children: React.ReactNode }) => {
  return <> {children && <Typography>Автор: {children}</Typography>}</>;
};

export default BookInfoText;
