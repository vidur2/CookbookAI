import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RecipeCard } from '@/components/RecipeCard';

export default function RecipeApp() {
  const [bottomNavValue, setBottomNavValue] = useState(0);

  const handleNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header />
      
      <Box sx={{ p: 2 }}>
        <RecipeCard text="HX " rating={2} favorite={false} />
      </Box>

      <Footer 
        value={bottomNavValue}
        onChange={handleNavChange}
      />
    </Box>
  );
}