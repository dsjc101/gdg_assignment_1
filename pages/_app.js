import { useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const login = () => {
    setIsLoggedIn(true);
    router.push('/'); // Redirect to the landing page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} isLoggedIn={isLoggedIn} login={login} />
    </ThemeProvider>
  );
}
