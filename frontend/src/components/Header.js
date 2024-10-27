import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { LinearGradient } from 'react-text-gradients';
import { AccountCircle } from '@mui/icons-material';

export default function TopBar({text = "CookbookAI"}) {
  return (

    <Box>
      {/* <br />
    <Typography variant="h3" component="div" sx = {{textAlign:"center", fontFamily:"Helvetica Neue", fontWeight:"bold"}}>
      {text}
    </Typography> */}

    <div style={{textAlign: "center", fontSize: "24px", fontFamily: "Helvetica Neue"}}>

    <h2>
    {/* <LinearGradient gradient={["to right", "#FF7F50 ,#FF6347, #FF4500", ]}> {text}</LinearGradient> */}
    {/* <LinearGradient gradient={["to right", "#419D78 ,#3874cb", ]}> {text}</LinearGradient> */}
    <LinearGradient gradient={["to left", "#2ac687 ,#3b82ea", ]}> {text}</LinearGradient>
    {/* <LinearGradient gradient={["to right", "#FFB347 ,#6B8E23", ]}> {text}</LinearGradient> */}
    {/* <LinearGradient gradient={["to right", "#A3D2CA ,#F5CB5C", ]}> {text}</LinearGradient> */}
    {/* <LinearGradient gradient={["to right", "#F7D794 ,#FF6F61", ]}> {text}</LinearGradient> */}
    {/* <LinearGradient gradient={["to right", "#E0A458 ,#B38244", ]}> {text}</LinearGradient> */}
    {/* <LinearGradient gradient={["to right", "#D4A373 ,#8B5E3C", ]}> {text}</LinearGradient> */}
    </h2>
    </div>
    </Box>

    // <AppBar position="static" sx={{ backgroundColor: "#419D78" }} elevation={1}>
    //   <Toolbar>
    //     <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontFamily: 'Verdana'}}>
    //       {text}
    //     </Typography>
    //     {/* <IconButton color="inherit">
    //       <AccountCircle />
    //     </IconButton> */}
    //   </Toolbar>
    // </AppBar>
  );
}