import {useState} from 'react';
import { Card, Typography, Chip, Rating, Switch, Stack, IconButton } from '@mui/material';

export function RecipeCard({text, rating, favorite}) {

  const [active, setActive] = useState(favorite);
  const handleToggleActive = (event) => {
    setActive(!active)
  };
  
  return (
    <Card
      sx = {{width: '80%', margin: 'auto', borderRadius: 5}}  
    >
      <Stack direction="row" alignItems="center"  justifyContent="space-between" spacing={5} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Typography>{text}</Typography>
          <Stack direction="row" spacing={1} useFlexGap>
            {/* <Chip
            size="small"
            label={active ? 'Active' : 'Inactive'}
            color={active ? 'success' : 'default'}
            /> */}

            {/* --- tags --- */}
            
            {/* <Typography variant="body1">Recipe Difficulty: </Typography> */}
            <Rating value={rating} size="small" readOnly />
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0} p={0}>
          <IconButton onClick={handleToggleActive} >
            {active ? "❤️" : "🩶"}
          </IconButton>

          {/* <Typography>{active ? "❤️" : "🩶"}</Typography>
          <Switch checked={active} onChange={handleToggleActive} /> */}
        </Stack>
      </Stack>
    </Card>
  );
}