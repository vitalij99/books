import React from 'react';
import { Button } from '@mui/material';

const CATEGORIES = {
  romans: 'Романи',
  fantasy: 'Фантастика',
  detective: 'Детективи',
  science: 'Наукова література',
  biography: 'Біографії',
  history: 'Історичні',
  horror: 'Жахи',
  poetry: 'Поезія',
  adventure: 'Пригоди',
  kids: 'Дитяча література',
  classics: 'Класика',
  all: 'Всі',
};

const Categories = () => {
  const searchCategorie = (search: string) => {
    const trimmedValue = search.trim();
    const searchParams = new URLSearchParams(window?.location.search);

    searchParams.set('genre', trimmedValue);

    window.history.pushState({}, '', `?${searchParams}`);
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
