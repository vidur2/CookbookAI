import React from 'react';
import { Rating } from '@mui/material';
import {Star, StarBorder, StarOutline} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const getColorForRating = (rating) => {
  switch (rating) {
    case 1:
      return '#039BE5';
    case 2:
      return '#4CAF50';
    case 3:
      return '#FBC02D';
    case 4:
      return '#FF9800';
    case 5:
      return '#F44336';
    default:
      return '#e0e0e0';
  }
}

const StyledRating = styled((props) => <Rating {...props} />)(({ theme, rating }) => ({
  '& .MuiRating-iconFilled': {
    color: getColorForRating(rating),
  },
}));

export default function DiffRating({value, small = true}) {

  return (
    <StyledRating
      value = {value}
      readOnly
      max = {5}
      icon={<Star />}
      emptyIcon={<StarBorder />}
      rating={value}
      size={small ? "small" : "medium"}
    />
  );
}