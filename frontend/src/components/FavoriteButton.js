import React, {useState} from 'react';
import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useEffect } from 'react';

function postFavorite(favorite, uuid) {
    'use server'

    const api_url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/recipes/update_fav`;
    console.log({ favorite, uuid })
    fetch(api_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite, uuid })
    })
}

// RecipeCard.js, RecipeInfo.js
export default function FavoriteButton({favorite, uuid, active, setActive }) { 
    
    const handleToggleActive = (event) => {
        setActive(!active)
        postFavorite(!active, uuid);
    };

    return (
        <IconButton onClick={handleToggleActive} >
        {active ? <Favorite color="error" /> : <FavoriteBorder color="error" />}
        </IconButton>
    );
};