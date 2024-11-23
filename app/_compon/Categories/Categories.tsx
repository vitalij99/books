'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const CATEGORIES = {
  romans: 'Романи',
  fantasy: 'Фантастика',
  detective: 'Детективи',
  science: 'Наукова література',
  horror: 'Жахи',
  adventure: 'Пригоди',
  classics: 'Класика',
};

const Categories = () => {
  const router = useRouter();
  const searchCategorie = (search: string) => {
    if (typeof window === 'undefined') return;

    const trimmedValue = search.trim();
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set('genre', trimmedValue);

    searchParams.delete('search');

    const newQueryString = `?${searchParams.toString()}`;
    window.history.pushState({}, '', newQueryString);

    router.push(`/search${newQueryString}`);
  };

  return (
    <div>
      {Object.entries(CATEGORIES).map(([key, label]) => (
        <Button
          key={key}
          onClick={() => searchCategorie(key)}
          sx={{ textTransform: 'capitalize' }}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
