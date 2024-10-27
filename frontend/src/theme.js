import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',  
    },
    secondary: {
      main: '#00ff00',
    },
    background: {
      default: '#fed',
    },
    text: {
      primary: '#ffffff', 
      secondary: '#3c3c3c',
    },
  },
  typography: {
    fontFamily: 'Verdana, Arial, sans-serif',
  },
});

export default theme;
