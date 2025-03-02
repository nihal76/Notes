import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import {UserContext} from '../ContextAPI/ContextProvider'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const[msg, setMsg] = useState('')
  const token = localStorage.getItem('token')
  // get username from context api to create note
   const User = useContext(UserContext)
   const navigate = useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();
   const result = await axios.post(
     `https://notes-server-j1h4.onrender.com/createNote/${User.username}`,
     {
       title,
       description,
     },
     {
       headers: { Authorization: `${token || ""}` },
     }
   );
    if(result.status === 201){
      setMsg('Note created successfully')
      navigate('/')
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "2em",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: {
            xs: "1.2em",
            sm: "1.5em",
            md: "1.8em",
            lg: "2em",
          },
        }}
      >
        Create a New Note
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{mb:'1em'}} fullWidth>
          Create Note
        </Button>
        <Button type="submit" variant="contained" color="warning" fullWidth onClick={()=>navigate('/')}>
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default CreateNote;