'use client';
import debounce from 'lodash.debounce';

import { StorageType } from '@/types/book';
import { getRootValue } from '@/lib/setRootValue';

export const getStorageRootValue = (key: string) => {
  return localStorage.getItem(key) || getRootValue(key);
};

export const getStorage = (key: string) => {
  const res = localStorage.getItem(key);

  return res ? res : '';
};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const setStorage = debounce((value: string | {} | [], key: string) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.setItem(key, value);
}, 500);

export const setPropertyStyle = debounce(
  (storageKey: string, obj: StorageType) => {
    localStorage.setItem(storageKey, JSON.stringify(obj));

    for (const cssKey in obj) {
      if (cssKey.startsWith('--')) {
        document.documentElement.style.setProperty(
          cssKey,
          obj[cssKey as keyof StorageType]
        );
      }
    }
  },
  500
);

export function getStorageAr(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
export const getSrorageJSON = (key: string) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : '';
  } catch (error) {
    console.warn(`Failed to parse JSON for key "${key}":`, error);
    return data;
  }
};
