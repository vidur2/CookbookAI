import { useParams } from 'next/navigation';
import React, {useState} from 'react';
import Footer from '@/components/Footer';
import { IconButton, Typography, Box, Rating, Stack, Grid2, ThemeProvider, createTheme } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useRouter } from 'next/router';
import RecipeCard from '@/components/RecipeCard';
import FavoriteButton from '@/components/FavoriteButton';
import Tag from '@/components/Tag';
import { useEffect } from 'react';
import DiffRating from '@/components/DiffRating';


function processParams(query, setActive) {
    const { cuisine, difficulty_rating, is_vegan, is_vegetarian, recipe, recipe_title, uuid, liked } = query;
    // const tags = [cuisine.charAt(0).toUpperCase() + cuisine.slice(1)]
    const tags = []
    if (typeof cuisine !== "undefined") {
        const cui = cuisine.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        tags.push(cui)
    }
    if (is_vegan === "true") {
        tags.push("Vegan");
    }

    if (is_vegetarian === "true") {
        tags.push("Vegetarian");
    }
    console.log(decodeURIComponent(recipe).replace(`\n`, ""));


    return {
        name: recipe_title,
        rating: parseInt(difficulty_rating),
        liked: setActive(liked === "true"),
        uuid: uuid,
        recipe: recipe,
        tags: tags
    }
}


export default function RecipeInfo() {
    const [active, setActive] = useState(false)
    const router = useRouter();
    const theme = createTheme({
        typography: {
            fontFamily: '"Verdana", Helvetica, Arial, sans-serif'
        }
        });
    // 2 ways to get to the page:
    // 1 --> uploaded images gives this recipe
    // 2 --> clicking recipe card in your history
    
    // Recipe name, rating, is favorite, tags
    // how do we get the ingredient/directions?
    // const { name, rating, favorite, tags, uuid } = useParams();
    const [name, setName] = useState("test")
    const [rating, setRating] = useState(3)
    const [tags, setTags] = useState(["vegan", "vegetarian", "cuisine type"])
    const [uuid, setUuid] = useState("8ab43986-4b13-4785-a284-53b14817d483")
    const [recipe, setRecipe] = useState({
        ingredients: [],
        steps: []
    });
    useEffect(() => { 
        const searchParams = new URLSearchParams(window.location.search);
        const paramsObject = Object.fromEntries(searchParams.entries()); // Convert to object
        const out = processParams(paramsObject, setActive);
        setName(out.name);
        setRating(out.rating);
        setTags(out.tags);
        setUuid(out.uuid);
        setRecipe(JSON.parse(decodeURIComponent(out.recipe)));
    }, [])

    // fromCard ?
    const fromCard = false
    const backAction = () =>  router.back();
    // nav bar func
    const [bottomNavValue, setBottomNavValue] = useState();
    const handleNavChange = (event, newValue) => {
        setBottomNavValue(newValue);
    };

    return (
        
        <ThemeProvider theme={theme}>
        <Stack>

            {/* -----------TEST------------ */}
            {/* <RecipeCard text={name} rating={rating} favorite={favorite} tags={tags}/> */}
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
                    <Typography variant="h4" align="center" marginTop={3}>{name}</Typography>

                    <Stack direction="row" marginTop={1} spacing={1} sx={{ justifyContent: "center", alignItems: "center"}}>
                        {tags.map((tag, index) => (
                            <Tag key={index} tag={tag} />
                        ))}
                    </Stack>
                    
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center"}}>
                        {/* <Rating value={rating} readOnly align="center" /> */}
                        <DiffRating value={rating} />
                        <FavoriteButton uuid={uuid} active={active} setActive={setActive} />
                    </Stack>
                    <Stack marginBottom={"30%"}>
                        <Typography variant='h6'>Ingredients:</Typography>
                        <ul>
                        {
                            recipe["ingredients"].map((ingredient, key) => (
                                <Typography key={key}><li>{ingredient}</li></Typography>
                            ))
                        }
                        </ul>

                        <Typography variant='h6'>Steps:</Typography>
                        <ol>
                        {
                            recipe["steps"].map((step, key) => (
                                <Typography key={key}><li>{step}</li></Typography>
                            ))
                        }
                        </ol>
                    </Stack>
                    <Footer 
                        marginTop={"30%"}
                        value={bottomNavValue}
                        onChange={handleNavChange}
                        router={router}
                    />
                </Stack>
            </Grid2>
            <Grid2 size={1} marginRight={2} /> 
        </Grid2>
        </Stack>
        </ThemeProvider>
    );
}

