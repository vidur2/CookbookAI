import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import ImageUpload from '@/components/ImageUpload';
import TagToggle from '@/components/TagToggle';
import LoadingScreen from '@/components/LoadingScreen';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress'; 
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import FavoriteButton from '@/components/FavoriteButton';

export default function RecipeApp() {
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterStates, setFilterStates] = useState({
    vegan: false,
    vegeterian: false,
    favorites: false
  });
  const router = useRouter();

  const handleNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  const handleFilterChange = (filterStates) => {
    // { vegan: true, vegetarian: false, favorites: true }
    setFilterStates(filterStates);
  };
  useEffect(() => {
    const username = window.sessionStorage.getItem("username");
    if (username === null) {
        router.push("/login");
    }
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          {/* <Typography variant="h5" align="center">
            Login
          </Typography> */}
          {/* <CircularProgress size={120} /> */}
          <LoadingScreen />
      </Box>
    ); 
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      {/* <Box sx={{ p: 2 }}>
        <RecipeCard text="HX " rating={2} favorite={false} />
      </Box> */}
      <ImageUpload setLoading={setLoading} router={router} filterStates={filterStates}/>
      <TagToggle onFilterChange={handleFilterChange} />
      <Footer 
        value={bottomNavValue}
        onChange={handleNavChange}
        router={router}
      />

    </Box>

  );
}