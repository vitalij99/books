'use client';

import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Неправильний email або пароль.');
      } else {
        router.back();
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Увійти
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Електронна пошта"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Увійти
          </Button>
        </form>
      </Box>
      <Box sx={{ p: 2 }}>
        <Link href="/auth/register">Реєстрація</Link>
      </Box>
    </Container>
  );
}
