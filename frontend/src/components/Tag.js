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
    default:
      const firstChar = tag.charCodeAt(0)
      if (firstChar < 70) {
        bgcolor = "#FFD700"
      } else if (firstChar < 75) {
        bgcolor = "#FFC0CB"
      } else if (firstChar < 80) {
        bgcolor = "#FF7F50"
      } else if (firstChar < 85) {
        bgcolor = "#ADD8E6"
      }
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