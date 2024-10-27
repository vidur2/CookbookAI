import React from 'react';
import { Box, Chip } from '@mui/material';

export default function TagDisplay({ preferences = { vegan: 0, vegetarian: 0, american: 0, italian: 0 } }) {
  const chips = [
    { type: 'vegan', label: 'Vegan', color: '#3A8E2E' },
    { type: 'vegetarian', label: 'Vegetarian', color: '#A7E34B' },
    { type: 'american', label: 'American', color: '#FFD700' },
    { type: 'italian', label: 'Italian', color: '#FFC0CB' }
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
      {chips.filter(chip => preferences[chip.type] === 1).map(chip => (
        <Chip
          key={chip.type}
          label={chip.label}
          sx={{
            backgroundColor: chip.color,
            color: '#3C3C3C'
          }}
        />
      ))}
    </Box>
  );
}