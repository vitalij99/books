import { Typography } from '@mui/material';
import React from 'react';

const BookInfoText = ({
  children,
  isEmpty,
}: {
  children: React.ReactNode;
  isEmpty?: string | number;
}) => {
  return <> {children && isEmpty && <Typography>{children}</Typography>}</>;
};

export default BookInfoText;
