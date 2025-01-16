import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function PrimaryButton({ handleSubmit, handleClear }) {
  return (
    <Stack direction="row" spacing={6} justifyContent="center">
      <Button variant="contained" style={{ backgroundColor: '#333333', color: '#FFFFFF' }} onClick={handleSubmit}>
        Predict
      </Button>
      <Button variant="outlined" style={{ borderColor: '#4B4B4B', color: '#4B4B4B' }} onClick={handleClear}>
        Clear
      </Button>
    </Stack>
  );
}
