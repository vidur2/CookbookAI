import React, {useState} from 'react';
import { Box } from '@mui/material';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function Recipes() {


  

  // nav bar func
  const router = useRouter();
  const [bottomNavValue, setBottomNavValue] = useState(1);
  const handleNavChange = (event, newValue) => {
      setBottomNavValue(newValue);
  };

  return (
    <Box>


    <Footer 
        value={bottomNavValue}
        onChange={handleNavChange}
        router={router}
    />
    </Box>
  );
}