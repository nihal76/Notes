import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Card, IconButton, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../ContextAPI/ContextProvider';
import { useContext } from 'react';


const CreateNoteCard = () => {
  const navigate = useNavigate()
      const User =  useContext(UserContext)

    const createNote = () => {
         if(User.isLogged){
              navigate(`/createNote/${User.username}`);
         }
         else{
          navigate('/signin')
         }
    };

  return (
    <Card
      sx={{
        width: "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2em",
        backgroundColor: "#D0F0C0",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "0.8em",
            sm: "1.2em",
            md: "1.4em",
            lg: "1.5em",
          },
        }}
      >
        Click the icon to create new note
      </Typography>
      <IconButton sx={{ pointer: "cursor" }} size='large' onClick={createNote}>
        <AddIcon />
      </IconButton>
    </Card>
  );
};

export default CreateNoteCard;
