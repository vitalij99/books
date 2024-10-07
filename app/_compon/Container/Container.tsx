'use client';
import { Container as ContainerMui } from '@mui/material';
import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <ContainerMui>{children}</ContainerMui>;
};

export default Container;
