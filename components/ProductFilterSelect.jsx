import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductFilterSelect({ setFn }) {
  const handleChange = (event) => {
    setFn(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value="bicycle">Bicycles</MenuItem>
          <MenuItem value="accessories">Accessories</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
