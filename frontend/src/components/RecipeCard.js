import {useState} from 'react';
import { Card, Typography, Chip, Rating, Switch, Stack, IconButton } from '@mui/material';
import FavoriteButton from './FavoriteButton';
import Tag from './Tag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DiffRating from './DiffRating';

export default function RecipeCard({text, rating, favorite, tags, uuid, description }) {
  const router = useRouter();
  const [active, setActive] = useState(favorite);
    useEffect(() => {
        setActive(favorite);
        console.log(favorite)
    }, [favorite])  

  const handleClick = (e) => {
    console.log(router)
    const url = new URL("http://localhost:5000/RecipeInfo");
    url.searchParams.set("cuisine", tags[0]);
    const mod = tags.map((tag) => tag.toLowerCase());
    if (mod.includes("vegan")) {
      url.searchParams.set("is_vegan", "true");
    } else {
      url.searchParams.set("is_vegan", "false");
    }

    if (mod.includes("vegetarian")) {
      url.searchParams.set("is_vegetarian", "true");
    } else {
      url.searchParams.set("is_vegetarian", "false");
    }

    url.searchParams.set("difficulty_rating", rating.toString());
    url.searchParams.set("recipe", encodeURIComponent(JSON.stringify(description)));
    url.searchParams.set("recipe_title", text);
    url.searchParams.set("uuid", uuid);
    url.searchParams.set("liked", active);
    const tmp =  url.toString().split("/");
    router.push("/" + tmp[tmp.length - 1]);
  }

  return (
    // need to add onclick -> recipeinfo
    <Card
      sx = {{width: '80%', margin: 'auto', borderRadius: 5}}  
    >
      <Stack direction="row" alignItems="center"  justifyContent="space-between" spacing={5} p={2} useFlexGap>
      <button style={{backgroundColor: "transparent", borderStyle: "none"}} onClick={handleClick}>
        <Stack direction="column" spacing={0.5} useFlexGap>
          
          <Stack direction="row" spacing={1} useFlexGap sx={{alignItems: "center"}}>
          <Typography>{text}</Typography>
          <DiffRating value={rating} />
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
        </button>
        <Stack direction="row" alignItems="center" spacing={0} p={0}>
          <FavoriteButton favorite={favorite} uuid={uuid} active={active} setActive={setActive} />
          {/* <Typography>{favorite}</Typography> */}
          {/* <Typography>{active ? "❤️" : "🩶"}</Typography>
          <Switch checked={active} onChange={handleToggleActive} /> */}
        </Stack>
      </Stack>
    </Card>
  );
}