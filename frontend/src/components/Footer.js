import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function BottomNav({ value, onChange }) {
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
        value={value}
        onChange={onChange}
        sx={{ height: 70 }}
      >
        <BottomNavigationAction label="Recipes" />
        <BottomNavigationAction label="Favorites" />
      </BottomNavigation>
      
      <Fab
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
      </Fab>
    </Paper>
  );
}