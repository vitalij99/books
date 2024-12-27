import debounce from '@mui/material/utils/debounce';
import React, { ChangeEvent, useCallback } from 'react';

const InputColor = ({
  onChange,
  value,
  name,
}: {
  onChange: any;
  value: string;
  name: string;
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce(value => onChange(value), 300),
    [onChange]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(event.target.value);
  };

  return (
    <input
      type="color"
      name={name}
      value={value}
      onChange={event => handleChange(event)}
    />
  );
};

export default InputColor;
