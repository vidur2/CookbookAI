import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Avatar, Typography, Button, Container, Grid2, ThemeProvider, createTheme } from '@mui/material';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TagDisplay from '@/components/TagDisplay';

export default function ProfilePage() {

const theme = createTheme({
    typography: {
        fontFamily: '"Verdana", Helvetica, Arial, sans-serif'
    }
    });
  const firstName = "John"; // Replace with actual first name
  const lastName = "Doe";   // Replace with actual last name
  const aboutMe = "I am a beginning foodie who loves to cook! I always end up having too much food in my fridge LOL"; // Simple about me text
  const [bottomNavValue, setBottomNavValue] = useState(2);
  const router = useRouter();

  const handleNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  const handleLogOut = () => {
    window.sessionStorage.clear();
    router.push("/");
  }

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Header text={"Profile"}/>

      <Container maxWidth="xs" sx={{ mt: 4 }}>
    {/* Avatar and Name Section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Avatar 
        alt={`${firstName} ${lastName}`} 
        src="https://via.placeholder.com/150"
        sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5" fontWeight="bold">{firstName} {lastName}</Typography>
    </Box>

    {/* About Me Section */}
    <Box sx={{ textAlign: 'left', mt: 2, mb: 2 }}>
        <Typography variant="body1" fontWeight="bold" gutterBottom>
        ABOUT ME
        </Typography>
        <Typography variant="body1" color="textSecondary">
        {aboutMe}
        </Typography>
    </Box>
    <Box sx={{ textAlign: 'left', mt: 2, mb: 2 }}>
        <Typography variant="body1" fontWeight="bold" gutterBottom>
        INTERESTS
        </Typography>
        <TagDisplay preferences={{ vegan: 0, vegetarian: 1, american: 1, italian: 1 }} />
    </Box>
    <Box sx={{ textAlign: 'left', mt: 2 }}>
    <Typography variant="body1" fontWeight="bold" gutterBottom>
        FAVORITES
    </Typography>
    </Box>
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      mt: 1,
      justifyContent: 'flex-start',  
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
          display: 'none'
      },
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      px: 1,
      py: 1
    }}>
        {[
          'https://tinyurl.com/bananapancakeimage',
          'https://tinyurl.com/spaghettiimage',
          'https://tinyurl.com/buffalochickenimage',
          'https://tinyurl.com/phillycheeseimage'
        ].map((imageUrl, index) => (
          <Box
                key={index}
                component="img"
                src={imageUrl}
                alt={`Recent meal ${index+1}`}
                sx={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    flexShrink: 0
                }}
          />
        ))}
      </Box>


    {/* Log Out Button */}
    <Grid2 container spacing={2} sx={{ mt: 4 }}>
        <Grid2 xs={12}>
        <Button 
            variant="contained" 
            color="secondary" 
            fullWidth
            onClick={handleLogOut}
        >
            Log Out
        </Button>
        </Grid2>
    </Grid2>
    </Container>
        {/* Footer */}
      <Footer 
        value={bottomNavValue}
        onChange={handleNavChange}
        router={router}
      />
    </Box>
    </ThemeProvider>
  );
}
