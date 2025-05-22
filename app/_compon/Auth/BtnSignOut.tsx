import { signOut } from '@/auth';
import { SpeedDialAction } from '@mui/material';
import React from 'react';

const BtnSignOut = () => {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    ></form>
  );
};

export default BtnSignOut;
