import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import ImageUpload from '@/components/ImageUpload';
import TagToggle from '@/components/TagToggle';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress'; 
import { useRouter } from 'next/router';

export default function RecipeApp() {
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterStates, setFilterStates] = useState({
    vegan: false,
    vegeterian: false,
    favorites: true
  });
  const router = useRouter();

  const handleNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  const handleFilterChange = (filterStates) => {
    // { vegan: true, vegetarian: false, favorites: true }

  };

  if (loading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    ); 
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header />
      
      {/* <Box sx={{ p: 2 }}>
        <RecipeCard text="HX " rating={2} favorite={false} />
      </Box> */}
      <ImageUpload setLoading={setLoading} router={router}/>
      <TagToggle onFilterChange={handleFilterChange} />
      <Footer 
        value={bottomNavValue}
        onChange={handleNavChange}
        router={router}
      />
    </Box>
  );
}