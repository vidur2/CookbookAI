import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';

export default function TagToggle({ onFilterChange, text = "Select your tags" }) {
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
          backgroundColor: isActive ? '#c23f38' : '#fff',
          color: isActive ? 'white' : '#2C2C2C',
          hoverColor: isActive ? '#d03425' : '#e19f9c'
        };
    }
  };

  const chips = [
    { type: 'vegan', label: 'Vegan' },
    { type: 'vegetarian', label: 'Vegetarian' },
    { type: 'favorites', label: (text == "") ? 'Favorites' : 'Base off favorites' }
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
                letterSpacing: '0px',
                opacity: 0.8,
                textAlign: 'center'
            }}
        >
            {text}
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