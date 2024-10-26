import { useParams } from 'next/navigation';
import React from 'react';


export default function RecipeInfo() {

    // 2 ways to get to the page:
    // 1 --> uploaded images gives this recipe
    // 2 --> clicking recipe card in your history


    // Recipe name, rating, is favorite, tags
    // how do we get the ingredient/directions?
    const { name, rating, favorite, tags } = useParams();

    return (
        <h1>pass</h1>
    );
};

