import React from 'react';

import { Container, Card, Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from '@/auth';
import Credentials from '@/app/_compon/Auth/Credentials';

export default function AuthForm() {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: 3 }}>
      <Card
        variant="outlined"
        sx={{ p: 4, boxShadow: '4px 4px 4px currentColor' }}
      >
        <Box sx={{ paddingTop: 4, textAlign: 'center' }}>
          <Credentials />

          <form
            action={async () => {
              'use server';
              try {
                await signIn('google');
              } catch (error) {
                throw error;
              }
            }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<GoogleIcon />}
            >
              Google
            </Button>
          </form>
        </Box>
      </Card>
    </Container>
  );
}
