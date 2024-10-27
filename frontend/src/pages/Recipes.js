import React, {useState} from 'react';
import { Box, Stack, TextField } from '@mui/material';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import RecipeCard from '@/components/RecipeCard';
import FavoriteButton from '@/components/FavoriteButton';
import { useEffect } from 'react';
import {CircularProgress} from '@mui/material';
import Header from '@/components/Header';
import TagToggle from '@/components/TagToggle';


async function getRecipesByUser(username) {
  'use server'
  const api_url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/recipes/get_by_user`;

  const res = await fetch(api_url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username })
  })
  console.log(res.status)
  const out = await res.json();
  return out['data'];
}

export default function Recipes() {

  const [recipeData, setRecipeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading]=  useState(true);
  const router = useRouter();

  useEffect(() => {
    const username = window.sessionStorage.getItem("username");
    if (username === null) {
      router.push("/login");
    }
    getRecipesByUser(username).then((recipes) => {
      setRecipeData(recipes.reverse());
      setFilteredData(recipes.reverse());
      setLoading(false);
    })

  }, [])
  
  // // nav bar func
  const [bottomNavValue, setBottomNavValue] = useState(1);
  const handleNavChange = (event, newValue) => {
      setBottomNavValue(newValue);
  };

  const [searchParams, setSearchParams] = useState("");
  const handleSearchChange = (event) => {
    console.log("new search param - " + event.target.value)
    setSearchParams(event.target.value)
    if (event.target.value == "") {
      console.log("Resetting to full data");
      setFilteredData(recipeData)
    } else {
      console.log("Filtering data by: " + event.target.value);
      setFilteredData(recipeData.filter(recipe => recipe.recipe_title.toLowerCase().includes(event.target.value.toLowerCase())))
    }
  };


  const [filterStates, setFilterStates] = useState({
    vegan: false,
    vegeterian: false,
    favorites: false
  });
  const handleFilterChange = (filterStates) => {
    setFilterStates(filterStates);
    console.log(filterStates)
    setFilteredData(recipeData.filter(recipe => {
      const matchesVegan = recipe.is_vegan || !filterStates.vegan;
      const matchesVegetarian = recipe.is_vegetarian || !filterStates.vegetarian;
      const matchesFavorite = recipe.liked || !filterStates.favorites;
      const matchesFilter = searchParams === "" || recipe.recipe_title.toLowerCase().includes(searchParams.toLowerCase())
      // console.log(recipe + " - vegan: " + matchesVegan + " - veg: " + matchesVegetarian + " - fav: " + matchesFavorite +"- filt: " + matchesFilter)

      return matchesVegan && matchesVegetarian && matchesFavorite && matchesFilter
    }))
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
      </Box>
  ); 
  }

  return (
    <Stack spacing={2}>

      <Header text="Saved Recipes" />

      <TextField label={"Search"} onChange={handleSearchChange} ></TextField>
      <TagToggle marginBottom={2} onFilterChange={handleFilterChange} text="" />

      <Stack spacing={1} marginBottom={"0%"} sx={{ justifyContent: "center", alignItems: "center"}}>
        {filteredData.map((recipe, index) => {
          const cui = recipe.cuisine
          let tags = [cui.charAt(0).toUpperCase() + cui.slice(1)];
          // let tags = [cui];
          if (recipe.is_vegan) {
            tags.push("Vegan");
          }
          if (recipe.is_vegetarian) {
            tags.push("Vegetarian");
          }
          return (
            <RecipeCard key={index} 
              text={recipe.recipe_title} 
              rating={recipe.difficulty_rating} 
              favorite={recipe.liked} 
              tags={tags}
              uuid={recipe.uuid}
              description={recipe.recipe}
            />
          );
        })}
      </Stack>

      <Footer 
          marginTop="30%"
          value={bottomNavValue}
          onChange={handleNavChange}
          router={router}
      />

    </Stack>
  );
}