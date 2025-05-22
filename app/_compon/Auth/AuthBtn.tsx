import { Avatar, Box, Link, SpeedDial, SpeedDialAction } from '@mui/material';

import { useSession } from 'next-auth/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRouter } from 'next/navigation';

// TODO signout tolen
export default function AuthBtn() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session?.user)
    return (
      <Link underline="none" color="#fff" href="/auth">
        Увійти
      </Link>
    );
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
            onClick={() => router.push(`/api/auth/signout`)}
            icon={<HighlightOffIcon />}
          />
        </SpeedDial>
      </Box>
    );
  }
}
