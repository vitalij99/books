'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
  };

  return (
    <Container maxWidth="sm">
      <Card
        variant="outlined"
        sx={{ p: 4, boxShadow: '4px 4px 4px currentColor' }}
      >
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
        <Box sx={{ paddingTop: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => signIn('google')}
          >
            Google
          </Button>
        </Box>
        <Box sx={{ p: 2 }}>
          <Link href="/auth/register">Реєстрація</Link>
        </Box>
      </Card>
    </Container>
  );
}
