import React from 'react';
import { TextField } from '@mui/material';

const Input = ({
  name,
  label,
  type,
  value,
  error = null,
  onChange,
  ...other
}) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
