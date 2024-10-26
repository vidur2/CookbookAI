import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction, Fab } from '@mui/material';
import { AccountBox, Add, ImageSearch, MenuBook, Photo } from '@mui/icons-material';

export default function BottomNav({ value, onChange, router }) {
  const scanAction = () =>  router.push("/");
  const recipeAction = () =>  router.push("/Recipes");


  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1
      }} 
      elevation={3}
    >
      <BottomNavigation
        // showLabels
        value={value}
        onChange={onChange}
        sx={{ height: 70 }}
      >
        <BottomNavigationAction label="Scan" icon={<ImageSearch />} onClick={scanAction}/>
        <BottomNavigationAction label="Recipes" icon={<MenuBook />} onClick={recipeAction}/>
        <BottomNavigationAction label="Profile" icon={<AccountBox />} />
      </BottomNavigation>
      
      {/* <Fab
        color="primary"
        sx={{
          position: 'absolute',
          top: -30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}
      >
        <Add />
      </Fab> */}
    </Paper>
  );
}