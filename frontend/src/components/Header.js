import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export default function TopBar({text = "CookbookAI"}) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FF3333" }} elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontFamily: 'Verdana'}}>
          {text}
        </Typography>
        {/* <IconButton color="inherit">
          <AccountCircle />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}