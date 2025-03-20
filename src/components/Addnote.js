import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const {addNote } = context;// for now i just want to call the addNote that's why only addNote is writtern
    const [note, setNote] = useState({title:"", description:"", tag:""})//this can be added to context

    const handleClick =(e)=>{
        e.preventDefault();// so that after clicking on submitting page does'nt reloads...
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note added successfully", "success")
        setNote({title:"", description:"", tag:""});// this will clear all the fields after the notes have been updated.
    }

    //This syntax is must for taking input from the user
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    //this onchange tells, that whatever is changing just change its value by giving it the changed value
    //...note is a spread syntax which tells that older vlue will remain while new value will be pushed like an array
  return (
    <div>
      <div className="container my-3">
      <h2>ADD NOTE</h2>
      <form className='my-3'>
        <div className="form-group">
          <label htmlFor="title" className='form-label'>Title</label>
          <input minLength={5} required type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input minLength={5} required type="text" value={note.description} className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange}/>
        </div>
        
        <button disabled={ note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
      </form>
    </div>
    </div>
  )
}

export default Addnote
