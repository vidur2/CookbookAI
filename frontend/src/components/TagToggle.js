import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';

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
    { type: 'favorites', label: 'Base off favorites' }
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
    <Box>  {}
        <Typography 
            sx={{ 
                color: '#666',
                fontSize: '1.1rem',
                fontWeight: 500,
                letterSpacing: '0.5px',
                opacity: 0.8,
                textAlign: 'center'
            }}
        >
            Select your tags
        </Typography>
    
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
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
                            border: `2px solid ${activeChips[chip.type] ? colors.backgroundColor : colors.hoverColor}`,
                            '&:hover': { backgroundColor: colors.hoverColor }
                        }}
                    />
                );
            })}
        </Box>
    </Box>
);
}