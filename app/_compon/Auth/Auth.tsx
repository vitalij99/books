import { Avatar, Box, SpeedDial, SpeedDialAction } from '@mui/material';

import { useSession, signOut } from 'next-auth/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SignIn } from '@/app/_compon/Auth/SignIn';

export default function Auth() {
  const { data: session } = useSession();

  if (!session?.user) return <SignIn />;
  else {
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
}
