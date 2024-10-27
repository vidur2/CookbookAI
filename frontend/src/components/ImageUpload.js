import React, { useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';

async function createRecipe(img, username, filterStates) {
    'use server'
    const filters = [];
    for (const filter in filterStates) {
        if (filterStates[filter]) {
            filters.push(filter);
        }
    }

    const api_url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/recipes/create`;
    const res = await fetch(api_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ img: img, username: username, filters: filters })
    })

    const url = new URL("http://localhost:5000/RecipeInfo");
    const obj = await res.json();
    for (const key in obj['data']) {
        if (key != "embedding") {
            if (typeof obj['data'][key] === 'object') {
                url.searchParams.set(key, JSON.stringify(obj['data'][key]));
            } else if (key === 'recipe') {
                url.searchParams.set(key, encodeURIComponent(JSON.stringify(obj['data'][key])));
            }
            
            else {
                url.searchParams.set(key, obj['data'][key])
            }
        }
    }
    const tmp = url.toString().split("/");
    return tmp[tmp.length - 1];
}


export default function ImageUpload({ router, setLoading, filterStates }) {
    console.log(router)
    const fileInputRef = useRef(null);
    const handleIconClick = () => {
        fileInputRef.current.click()
    }
    const FileUpload = (event) => {
        const reader = new FileReader();
        setLoading(true);
        // This function will handle file input change
        const file = event.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const b64String = e.target.result.split(";base64,")[1]  
                window.sessionStorage.setItem("img", b64String)
                const username = window.sessionStorage.getItem("username");
                if (username === null) {
                    router.push("/login");
                }
                createRecipe(b64String, username, filterStates).then((url) => {
                    router.push("/" + url);
                });
            };
        }
    }

    return (
        <Box sx={{ 
            minHeight: '45vh',
            display: 'flex',
            alignItems: 'center',
            p: 5,
            paddingBottom: 3,
        }}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={FileUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <Box
                onClick={() => fileInputRef.current.click()}
                sx={{
                    width: '100%',
                    height: '400px',
                    border: '3px dashed #ccc',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.2s ease',  // Smooth transition for the border color
                    '&:hover': {
                      borderColor: '#aaa',  // Change to desired color on hover
                    },
                }}
            >
                
                <Upload sx={{ fontSize: 120, color: '#666' }} />
                <Typography 
                    sx={{ 
                        color: '#666',
                        mt: 2,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        opacity: 0.8,
                        textAlign: 'center'
                    }}
                >
                Snap a pic of your fridge, get delicious recipes!
            </Typography>
            </Box>
        </Box>
    );
}