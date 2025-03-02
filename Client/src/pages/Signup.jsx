import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // sign confirmation
  const[msg,setmsg] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await axios.post(
      `https://notes-server-j1h4.onrender.com/auth/signup`,
      { username, email, password }
    );
     setmsg(result.data.message)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: {
            xs: "0.8em",
            sm: "1em",
            md: "1.2em",
            lg: "1.5em",
          },
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          sx={{
            fontSize: {
              xs: "1.2em",
              sm: "1.5em",
              md: "1.8em",
              lg: "2em",
            },
          }}
        >
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      {msg ? <Typography color="error">{msg}</Typography> : ""}
    </Container>
  );
};

export default Signup;