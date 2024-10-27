import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Avatar, Typography, Button, Container, Grid2 } from '@mui/material';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
export default function ProfilePage() {
  const firstName = "John"; // Replace with actual first name
  const lastName = "Doe";   // Replace with actual last name
  const [bottomNavValue, setBottomNavValue] = useState(2);
  const router = useRouter();
  const handleNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    {/* Header */}
    <Header />

    {/* Profile Section */}
    <Container maxWidth="xs" sx={{ mt: 4, textAlign: 'center' }}>
      {/* Avatar and Name Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Avatar 
          alt={`${firstName} ${lastName}`} 
          src="https://via.placeholder.com/150" // Placeholder or actual profile image URL
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5" fontWeight="bold">{firstName} {lastName}</Typography>
      </Box>

      {/* Log Out Button */}
      <Grid2 container spacing={2} sx={{ mt: 4 }}>
        <Grid2 xs={12}>
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth
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
  );
}
