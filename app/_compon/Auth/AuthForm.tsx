import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignIn) {
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
    } else {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          throw new Error('Registration failed');
        } else {
          await signIn('credentials', { redirect: false, email, password });
          router.back();
        }
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        variant="outlined"
        sx={{ p: 4, boxShadow: '4px 4px 4px currentColor' }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {isSignIn ? 'Увійти' : 'Реєстрація'}
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
            {isSignIn ? 'Увійти' : 'Зареєструватися'}
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

        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Link href="#" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? 'Реєстрація' : 'Увійти'}
          </Link>
        </Box>
      </Card>
    </Container>
  );
}
