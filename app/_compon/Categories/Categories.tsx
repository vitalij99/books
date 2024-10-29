import React from 'react';
import { Button } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';

const CATEGORIES = ['romans', 'fantasy', 'all'];

const Categories = () => {
  const searhCategorie = (search: string) => {
    if (!window) return;
    const trimmedValue = search.trim();
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set('categori', trimmedValue);

    window.history.pushState({}, '', `?${searchParams}`);
  };

  return (
    <div>
      <ItemList
        items={CATEGORIES}
        renderItem={categori => (
          <>
            <Button
              onClick={() => searhCategorie(categori)}
              sx={{ textTransform: 'capitalize' }}
            >
              {categori}
            </Button>
          </>
        )}
      />
    </div>
  );
};

export default Categories;
