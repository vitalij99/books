import { Box, Link, Typography } from '@mui/material';

export function SignIn() {
  return (
    <Box sx={{ paddingInline: 2 }}>
      <Link href="/api/auth/signin">
        <Typography>Увійти</Typography>
      </Link>

      <Link href="/auth/register">
        <Typography fontSize="10px">Реєстрація</Typography>
      </Link>
    </Box>
  );
}
