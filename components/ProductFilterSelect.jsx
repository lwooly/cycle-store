import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductFilterSelect({ setFn, value }) {
  const handleChange = (event) => {
    setFn(event.target.value);
  };

  return (
    <Box sx={{ minWidth: '15rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter"
          onChange={handleChange}
          value={value}
        >
          <MenuItem selected value="all">
            All
          </MenuItem>
          <MenuItem value="bicycle">Bicycles</MenuItem>
          <MenuItem value="accessories">Accessories</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
