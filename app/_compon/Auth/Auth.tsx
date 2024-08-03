'use client';

import { login } from '@/lib/auth';
import { Avatar, Box, Button, SpeedDial, SpeedDialAction } from '@mui/material';

import { useSession, signOut } from 'next-auth/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Auth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Box sx={{ position: 'relative', width: 56, height: 56 }}>
        <SpeedDial
          sx={{ position: 'absolute' }}
          ariaLabel="SpeedDial tooltip example"
          direction="down"
          icon={<Avatar src={session.user?.image as string} />}
        >
          <SpeedDialAction
            tooltipTitle="Sign out"
            onClick={() => signOut()}
            icon={<HighlightOffIcon />}
          />
        </SpeedDial>
      </Box>
    );
  }

  return (
    <>
      <Button onClick={() => login()}>Sign in</Button>
    </>
  );
}
