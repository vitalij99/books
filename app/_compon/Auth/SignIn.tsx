import { login } from '@/lib/auth';
import React from 'react';

export function SignIn() {
  return (
    <form
      action={async () => {
        await login();
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
}

export default SignIn;
