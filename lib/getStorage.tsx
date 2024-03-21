'use client';
import debounce from 'lodash.debounce';
import { getRootValue } from './setRootValue';

export const getStorageRootValue = (key: string) => {
  return localStorage.getItem(key) || getRootValue(key);
};
export const getStorage = (key: string) => {
  const res = localStorage.getItem(key);

  return res ? res : '';
};
export const setStorage = debounce((value: string | {} | [], key: string) => {
  localStorage.setItem(key, JSON.stringify(value));
}, 500);
