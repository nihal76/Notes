import React, { useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import axios from 'axios'
import { UserContext } from "../ContextAPI/ContextProvider";
import { useContext } from "react";
import { Box } from '@mui/material';


const SidebarSort = ({notes, setNotes}) => {
  const [sortOrder, setSortOrder] = React.useState('none');
  const User = useContext(UserContext)
  const token = localStorage.getItem('token')

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  
  useEffect(() => {
    const sortNotes = async () => {
      const result = await axios.get(
        `https://notes-server-j1h4.onrender.com/notes/sortbytitle?username=${User.username}&sortOrder=${sortOrder}`,
        {
          headers: { Authorization: `${token || ""}` },
        }
      );
      setNotes(result.data)
    }
    if(sortOrder !== 'none'){
          sortNotes();
    }

  },[sortOrder,  User.username])

  return (
    <Box
      sx={{
        fontSize: {
          xs: "1em",
          sm: "1em",
          md: "1.2em",
          lg: "1.5em",
        },
        marginLeft: "1em",
      }}
    >
      <Typography variant="h6" sx={{fontWeight : 'bold'}}>Sorting Order</Typography>
      <RadioGroup
        name="sort-order"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <FormControlLabel value="none" control={<Radio />} label="None" />
        <FormControlLabel
          value="ascending"
          control={<Radio />}
          label="Ascending"
        />
        <FormControlLabel
          value="descending"
          control={<Radio />}
          label="Descending"
        />
      </RadioGroup>
    </Box>
  );
};

export default SidebarSort;