import React from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';

const LoginPage = ({ login }) => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    router.push('/');
  };

  return (
    <Grid container sx={{ height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Left Section */}
      <Grid
        item
        xs={8}
        sx={{
          backgroundImage: 'url("/iitk.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Right Section */}
      <Grid item xs={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '80%',
              maxWidth: 400,
              borderRadius: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}
            >
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email ID"
                type="email"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
