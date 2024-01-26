export const setRootValue = (key: string, value: string | null) => {
  document.documentElement.style.setProperty(key, value);
};
export const getRootValue = (key: string) => {
  const result: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue(key);

  return result;
};
