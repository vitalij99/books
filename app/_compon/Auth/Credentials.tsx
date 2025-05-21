'use client';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

import React, { useState } from 'react';

const Credentials = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignIn) {
      signIn('credentials', {
        redirect: true,
        email,
        password,
      });
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
          await signIn('credentials', { redirect: true, email, password });
        }
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };
  return (
    <div>
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
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Link href="#" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? 'Реєстрація' : 'Увійти'}
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Credentials;
