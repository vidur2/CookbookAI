import React, {useState} from 'react';
import { IconButton } from '@mui/material';

async function postFavorite(uuid, ) {

}

// RecipeCard.js, RecipeInfo.js
export default function FavoriteButton(favorite) {

    const [active, setActive] = useState(favorite);
    const handleToggleActive = (event) => {
        setActive(!active)
    };
  
    return (
        <IconButton onClick={handleToggleActive} >
        {active ? "❤️" : "🩶"}
        </IconButton>
    );
};