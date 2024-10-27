'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    background: {
      default: '#fcf7f2',  // Warm white background
      paper: '#ffffff'
    },
    primary: {
      main: '#ffdsa5',
      light: '#fff0e6',
      dark: '#ffb380'
    },
    secondary: {
      main: '#e0a458',
      light: '#ffe8d6',
      dark: '#ffad70'
    },
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}