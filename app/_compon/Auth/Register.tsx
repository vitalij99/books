'use client';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <div>
      <h1>Реєстрація</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Введіть вашу електронну пошту"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Введіть ваш пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
