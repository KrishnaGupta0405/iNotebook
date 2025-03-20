// This file holds the function to add, delete, edit cal
import { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";

//notes is an array
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:5000"
  //Get all Notes
  const getNotes = async ()=> {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnote`,{
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem(`token`)
      },
    });
    const json = await response.json();
    setNotes(json)
    // console.log(json);
  }
  
  //Add a note
  const addNote = async (title, description, tag)=>{
    //ADD TAG IN PARAMETERS
    // date is auto. generated, user is also auto. generated as header container the auth-token
    const response = await fetch(`${host}/api/notes/addnote`,{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem(`token`)
      },
      body: JSON.stringify({title, description, tag})// passing all the fields as json objects. wasted 30 min to find this shit !!!
    })
    const note = await response.json();
    setNotes(notes.concat(note))
    // console.log("Adding a new note")
    // const json =  response.json();
    // console.log(json)
  }

  //Delete a note
  const deleteNote = async(id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: "DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem(`token`)
      }
    })
    const json =  response.json();
    console.log(json);
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
    // basically we are filtering all the notes whose id is not equal to is id given in props, and then the newly filtered array is set
  }

  //Edit a note
  const editNote = async (id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method: "PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem(`token`)
      },
      body: JSON.stringify({title, description, tag})
    })
    const json =  response.json();
    console.log(json)
    
    let newNotes= JSON.parse(JSON.stringify(notes))// to make the deepcopy
    // /Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }      
    }    
    setNotes(newNotes);
  }
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
