import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect({setFn}) {

  const handleChange = (event) => {
    setFn(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={'pricelowhigh'}>Price (Low - High)</MenuItem>
          <MenuItem value={'pricehighlow'}>Price (High -Low)</MenuItem>
          <MenuItem value={'alphabetical'}>Alphabetical</MenuItem>
          <MenuItem value={'stock'}>Stock</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}