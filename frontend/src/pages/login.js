import { useRouter } from "next/router";
import { Box, Button, Container, TextField, Typography } from '@mui/material';

async function createUser(username) {
    'use server'
    const api_url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/user/create`;
    console.log({ username: username })
    const res = await fetch(api_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username })
    })

    console.log(await res.json());

}

export default function Login() {
    const router = useRouter();
    const handleLogin = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        createUser(username).then(() => {
            window.sessionStorage.setItem("username", username);
            router.push("/");
        })
    }
    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" align="center">
            Login
          </Typography>
          <TextField 
            fullWidth 
            id="username" 
            label="Username" 
            variant="outlined" 
            required 
            autoFocus 
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Container>
    )
}