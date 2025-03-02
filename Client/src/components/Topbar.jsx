import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Note as NoteIcon,
  Create as CreateIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../ContextAPI/ContextProvider";
import axios from "axios";

const Topbar = ({ notes, setNotes }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const token = localStorage.getItem("token");

  // State
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("None");

  // Responsiveness
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Search Notes
  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const result = await axios.get(
        `https://notes-server-j1h4.onrender.com/searchNotes?username=${user.username}&searchTerm=${search}`,
        { headers: { Authorization: `${token || ""}` } }
      );
      setNotes(result.status === 200 ? result.data : []);
    } catch (error) {
      console.error("Search error:", error);
      setNotes([]);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ADD8E6",
        color: "black",
        width: "100%",
        fontSize: {
          xs: "0.8em",
          sm: "1em",
          md: "1.2em",
          lg: "1.5em",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit">
            <NoteIcon />
          </IconButton>
          <Typography variant="h6">Note App</Typography>
        </Box>

        {/* Search & Sort Section (Visible only when logged in) */}
        {user?.isLogged && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              fullwidth: "true",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        )}

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center",  gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              borderBottom: location.pathname === "/" ? "3px solid red" : null,
            }}
          >
            Home
          </Button>

          {user?.isLogged ? (
            <>
              <Button
                component={Link}
                to={`/createNote/${user.username}`}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Typography variant="body1">Create Note</Typography>
                <CreateIcon />
              </Button>
              <Typography variant="h6">{user.username}</Typography>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/signin"
                sx={{
                  borderBottom:
                    location.pathname === "/signin" ? "3px solid red" : null,
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  borderBottom:
                    location.pathname === "/signup" ? "3px solid red" : null,
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
