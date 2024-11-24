'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/types/categories/categories';

const Categories = ({ genre }: { genre?: string }) => {
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
          variant={key !== genre ? 'text' : 'outlined'}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
