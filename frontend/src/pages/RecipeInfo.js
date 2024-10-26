import { useParams } from 'next/navigation';
import React, {useState} from 'react';
import Footer from '@/components/Footer';
import { IconButton, Typography, Box, Rating, Stack, Grid2 } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useRouter } from 'next/router';
import RecipeCard from '@/components/RecipeCard';
import FavoriteButton from '@/components/FavoriteButton';
import Tag from '@/components/Tag';
import { useEffect } from 'react';


export default function RecipeInfo() {

    const router = useRouter();
    
    // 2 ways to get to the page:
    // 1 --> uploaded images gives this recipe
    // 2 --> clicking recipe card in your history
    
    // Recipe name, rating, is favorite, tags
    // how do we get the ingredient/directions?
    // const { name, rating, favorite, tags } = useParams();
    const name = "test", rating = 3, favorite = true, tags = ["Vegan", "Vegetarian", "cuisine type"]
    // fromCard ?
    const fromCard = false
    const backAction = () =>  fromCard ? router.push("/recipes") : router.push("/");
    // nav bar func
    const [bottomNavValue, setBottomNavValue] = useState();
    const handleNavChange = (event, newValue) => {
        setBottomNavValue(newValue);
    };

    return (
        
        
        // {fromCard ? <Button> </Button> : }
        <Stack>

            {/* -----------TEST------------ */}
            <RecipeCard text={name} rating={rating} favorite={favorite} tags={tags}/>
        <Grid2 container>
            <Grid2 size={1} marginTop={2} marginLeft={2}>
                <IconButton onClick={backAction}><ArrowBackIosNew /></IconButton>
            </Grid2>
            <Grid2 size="grow">
                <Stack
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h2" align="center" marginTop={3}>{name}</Typography>

                    <Stack direction="row" marginTop={1} spacing={1} sx={{ justifyContent: "center", alignItems: "center"}}>
                        {tags.map((tag, index) => (
                            <Tag key={index} tag={tag} />
                        ))}
                    </Stack>
                    
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center"}}>
                        <Rating value={rating} readOnly align="center" />
                        <FavoriteButton favorite={favorite} />
                    </Stack>

                    <Footer 
                        value={bottomNavValue}
                        onChange={handleNavChange}
                        router={router}
                    />
                </Stack>
            </Grid2>
            <Grid2 size={1} marginRight={2} /> 
        </Grid2>
        </Stack>
    );
}

