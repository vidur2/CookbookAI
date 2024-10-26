import React, { useState } from 'react';
import { Box, Chip } from '@mui/material';

export default function TagToggle({ onFilterChange }) {
  const [activeChips, setActiveChips] = useState({
    vegan: false,
    vegetarian: false,
    favorites: false
  });

  const getChipColors = (type, isActive) => {
    switch (type) {
      case 'vegan':
        return {
          backgroundColor: isActive ? '#3A8E2E' : '#fff',
          color: isActive ? 'white' : '#2C2C2C',
          hoverColor: isActive ? '#357A2A' : '#9FCC94'
        };
      case 'vegetarian':
        return {
          backgroundColor: isActive ? '#A7E34B' : '#fff',
          color: '#2C2C2C',
          hoverColor: isActive ? '#96CC43' : '#DDF59B'
        };
      case 'favorites':
        return {
          backgroundColor: isActive ? '#FFB347' : '#fff',
          color: '#2C2C2C',
          hoverColor: isActive ? '#FFA533' : '#FFE1C0'
        };
    }
  };

  const chips = [
    { type: 'vegan', label: 'Vegan' },
    { type: 'vegetarian', label: 'Vegetarian' },
    { type: 'favorites', label: 'Favorites' }
  ];
  const handleChipClick = (chipType) => {
    const newActiveChips = {
      ...activeChips,
      [chipType]: !activeChips[chipType]
    };
    setActiveChips(newActiveChips);
    // Pass the updated states to parent component
    onFilterChange(newActiveChips);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
      {chips.map(chip => {
        const colors = getChipColors(chip.type, activeChips[chip.type]);
        return (
          <Chip
            key={chip.type}
            label={chip.label}
            onClick={() => handleChipClick(chip.type)}
            sx={{
              backgroundColor: colors.backgroundColor,
              color: colors.color,
              '&:hover': { backgroundColor: colors.hoverColor }
            }}
          />
        );
      })}
    </Box>
  );
}