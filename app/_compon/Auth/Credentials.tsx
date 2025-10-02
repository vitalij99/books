'use client';

import CredentialsForm from '@/app/_compon/Auth/CredentialsForm';
import { Box, Button, Link, TextField, Typography } from '@mui/material';

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
      <CredentialsForm />
    </div>
  );
};

export default Credentials;
