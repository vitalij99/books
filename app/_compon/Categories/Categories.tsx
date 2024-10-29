import React from 'react';
import { Button } from '@mui/material';
import ItemList from '@/app/_compon/ItemList/ItemList';

const CATEGORIES = ['romans', 'fantasy', 'all'];

const Categories = () => {
  return (
    <div>
      <ItemList
        items={CATEGORIES}
        renderItem={categori => (
          <>
            <Button sx={{ textTransform: 'capitalize' }}>{categori}</Button>
          </>
        )}
      />
    </div>
  );
};

export default Categories;
