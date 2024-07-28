import React from 'react';

interface ItemListProps<T> {
  items: T[] | undefined;
  renderItem: (item: T) => React.ReactNode;
  keyExtractor?: (item: T) => string | number;
}

const ItemList = <T,>({
  items,
  renderItem,
  keyExtractor,
}: ItemListProps<T>) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item)}
        </React.Fragment>
      ))}
    </>
  );
};

export default ItemList;
