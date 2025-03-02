import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, IconButton, Button,TextField } from "@mui/material";
import axios from 'axios'
import { UserContext } from '../ContextAPI/ContextProvider'
import { useContext } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


/**
 * Component to display all notes for a user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.notes - The array of notes to display.
 * @param {Function} props.setNotes - Function to update the notes state.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * const notes = [
 *   { _id: '1', title: 'Note 1', description: 'Description 1' },
 *   { _id: '2', title: 'Note 2', description: 'Description 2' }
 * ];
 * const setNotes = (newNotes) => console.log(newNotes);
 * <AllNotes notes={notes} setNotes={setNotes} />
 */
const AllNotes = ({notes, setNotes}) => {
         const User = useContext(UserContext);
         const token = localStorage.getItem('token')
          console.log('all notes ', User)
          // note editing
          const[isEdit, setisEdit] = useState(false)
          const[editText, seteditText] = useState({
            title : '',
            description : ''
          })
          const[editId, seteditId] = useState('')
          const[hover, setHover] = useState(false)
          const[hoverId, setHoverId] = useState('')

  useEffect(() => {
    async function fetchNotes(){
       const result = await axios.get(
         `https://notes-server-j1h4.onrender.com/notes/${User.username}`,
         {
           headers: { Authorization: `${token || ""}` },
         }
       );
       if(result.status === 200){
          setNotes(result.data)
       }
    }
    fetchNotes()
  },[])

  // delete note
  const deleteNote =async (noteId) => {
    const result = await axios.delete(
      `https://notes-server-j1h4.onrender.com/deletenote/${noteId}`,
      {
        headers: { Authorization: `${token || ""}` },
      }
    );
    setNotes(result.data.remainingNotes);
  }
  // edit note
  const editNote = async (noteId) => {
    console.log('note id', noteId)
    const result = await axios.put(
      `https://notes-server-j1h4.onrender.com/editnote/${noteId}`,
      editText,
      {
        headers: { Authorization: `${token || ""}` },
      }
    );
    setNotes(result.data.notes)
     setisEdit(false);
    seteditText({
      title: "",
      description: "",
    });
  }

  return (
    <>
      {notes.length > 0 ? (
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: "1em", width: "80vw" }}
        >
          {notes.map((note) => {
            return (
              <>
                {isEdit && note._id === editId ? (
                  <Box>
                    <TextField
                      value={editText.title}
                      onChange={(e) =>
                        seteditText({ ...editText, title: e.target.value })
                      }
                      fullWidth
                    />
                    <TextField
                      value={editText.description}
                      onChange={(e) =>
                        seteditText({
                          ...editText,
                          description: e.target.value,
                        })
                      }
                      fullWidth
                      multiline
                    />
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => editNote(note._id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => setisEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Card
                    onMouseEnter={() => {
                      setHover(true);
                      setHoverId(note._id);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                      setHoverId("");
                    }}
                    key={note._id}
                    sx={{
                      width: { xs: "75%", sm: "35%", md: "30%", lg: "25%" },
                      fontSize: {
                        xs: "0.8em",
                        sm: "1em",
                        md: "1.2em",
                        lg: "1.5em",
                      },
                      boxShadow: 3,
                      borderRadius: 2,
                      bgcolor: "#D8BFD8",
                      padding: 2,
                    }}
                  >
                    {/* edit , delete */}
                    {hover && hoverId === note._id ? (
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                          color="warning"
                          onClick={() => {
                            setisEdit(true);
                            seteditId(note._id);
                            seteditText({
                              title: note.title,
                              description: note.description,
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteNote(note._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : null}
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {note.title}
                    </Typography>
                    <Typography variant="body2">{note.description}</Typography>
                  </Card>
                )}
              </>
            );
          })}
        </Box>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "1.2em",
              sm: "1.5em",
              md: "2.2em",
              lg: "2.5em",
            },
          }}
        >
          No Notes found
        </Typography>
      )}
    </>
  );
}

export default AllNotes