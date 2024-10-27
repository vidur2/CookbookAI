import {useState} from 'react';
import { Card, Typography, Chip, Rating, Switch, Stack, IconButton } from '@mui/material';
import FavoriteButton from './FavoriteButton';
import Tag from './Tag';

export default function RecipeCard({text, rating, favorite, tags, uuid, description = ""}) {
  
  return (
    // need to add onclick -> recipeinfo
    <Card
      sx = {{width: '80%', margin: 'auto', borderRadius: 5}}  
    >
      <Stack direction="row" alignItems="center"  justifyContent="space-between" spacing={5} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          
          <Stack direction="row" spacing={1} useFlexGap sx={{alignItems: "center"}}>
          <Typography>{text}</Typography>
          <Rating value={rating} size="small" readOnly />
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap>
            {/* <Chip
            size="small"
            label={active ? 'Active' : 'Inactive'}
            color={active ? 'success' : 'default'}
            /> */}

            {/* --- tags --- */}
            <Stack direction="row" marginTop={1} spacing={1} sx={{ justifyContent: "center", alignItems: "center"}}>
                {tags.map((tag, index) => (
                    <Tag key={index} tag={tag} small />
                ))}
            </Stack>
            
            {/* <Typography variant="body1">Recipe Difficulty: </Typography> */}
            {/* <Rating value={rating} size="small" readOnly /> */}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0} p={0}>
          <FavoriteButton favorite={favorite} uuid={uuid}/>
          {/* <Typography>{favorite}</Typography> */}
          {/* <Typography>{active ? "❤️" : "🩶"}</Typography>
          <Switch checked={active} onChange={handleToggleActive} /> */}
        </Stack>
      </Stack>
    </Card>
  );
}