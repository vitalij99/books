import { ChangeEvent } from 'react';

const InputColor = ({
  onChange,
  value,
  name,
}: {
  onChange: any;
  value: string;
  name: string;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
