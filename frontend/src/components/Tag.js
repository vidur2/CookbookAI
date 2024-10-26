import React from 'react';
import { Chip } from '@mui/material';


export default function Tag({tag, small = false}) {

  let bgcolor = "#FFB347"
  let color = "#2C2C2C"
  switch (tag) {
    case "Vegan":
      bgcolor = "#3A8E2E"
      color = "white"
      break;
    case "Vegetarian":
      bgcolor="#A7E34B"
      break;
  }

  return (
    <Chip label={tag} size={small ? "small" : "medium"} sx={{
      backgroundColor: bgcolor, 
      color: color
    }}>
    </Chip>
  );
}