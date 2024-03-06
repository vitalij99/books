import debounce from 'lodash.debounce';
import { getRootValue } from './setRootValue';

export const getStorageRootValue = (key: string) => {
  return localStorage.getItem(key) || getRootValue(key);
};
export const getStorage = (key: string) => {
  return localStorage.getItem(key) || '';
};
export const setStorage = debounce((value: string, key: string) => {
  localStorage.setItem(key, value);
}, 500);
