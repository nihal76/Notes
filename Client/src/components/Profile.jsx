import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, TextField } from '@mui/material';
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userinfo,setuserinfo, notes, setNotes }) => {
   const [edit, setedit] = useState(false)
   const [edittext, setedittext] = useState({
    username : '',
    email : ''
   })
   const [logoutuser, setlogout] = useState(false)
  const { username, setUsername, isLogged, setIsLogged } =
    useContext(UserContext);
     isLogged, setIsLogged, username, setUsername;
    const token = localStorage.getItem('token')

  const editProfile = async() => {
    console.log('to be updated ', edittext)
      const result = await axios.put(
        `https://notes-server-j1h4.onrender.com/users/update/${userinfo.username}`,
        edittext,
        {
          headers: { Authorization: `${token || ""}` },
        }
      );
      console.log('profile update ',result.data)
        setedit(false);
      setuserinfo(result.data)
            setUsername(result.data.username);
      setedittext({
        username: "",
        email: "",
      });
  }

  const logout = async() => {
    const result = axios.delete(
      `https://notes-server-j1h4.onrender.com/users/delete/${userinfo.username}`
    );
    // update context api
    setIsLogged(false);
    setNotes([]);
    setuserinfo({});
    setlogout(!logoutuser);
  }

  return (
    <>
      {logoutuser ? (
        <h3>You have been logged out create account</h3>
      ) : (
        <Box
          sx={{
            p: 2,
            borderRadius: "8px",
          }}
        >
          {!edit ? (
            <Box
              sx={{
                fontSize: {
                  xs: "0.8em",
                  sm: "1em",
                  md: "1.2em",
                  lg: "1.5em",
                },
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <Typography variant="h5">Profile</Typography>
              <Typography variant="body1">
                <strong>Username:</strong> {userinfo.username}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {userinfo.email}
              </Typography>
            </Box>
          ) : (
            <>
              <Box>
                <Typography>Username</Typography>
                <TextField
                  value={edittext.username}
                  multiline
                  overflow="auto"
                  onChange={(e) =>
                    setedittext({ ...edittext, username: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Typography value={edittext.email}>Email</Typography>
                <TextField
                  value={edittext.email}
                 multiline
                  onChange={(e) =>
                    setedittext({ ...edittext, email: e.target.value })
                  }
                />
              </Box>
            </>
          )}
          <Box sx={{ mt: 1 }}>
            {!edit ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1.5 }}
                onClick={() => {
                  setedit(true);
                  setedittext({
                    username: userinfo.username,
                    email: userinfo.email,
                  });
                }}
              >
                Edit
              </Button>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  color="error"
                  variant="contained"
                  onClick={editProfile}
                  sx={{ mr: 1.5 }}
                >
                  Save
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => setedit(!edit)}
                >
                  Cancel
                </Button>
              </Box>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
              sx={{ mt: 1.2 }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};


export default Profile;