import { Button, TextField } from '@mui/material';
import React from 'react';

const CredentialsForm = () => {
  return (
    <form
      action="http://localhost:3000/api/auth/callback/credentials"
      method="POST"
    >
      <TextField
        label="Електронна пошта"
        type="email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {'Увійти'}
      </Button>
    </form>
  );
};

export default CredentialsForm;
