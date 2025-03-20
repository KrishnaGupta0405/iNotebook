import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote"
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const ref = useRef(null); // to open the modal
  const refClose = useRef(null); //to close the modal
  const context = useContext(noteContext);
  let navigate = useNavigate();

  // eslint-disable-next-line
  const { notes, getNotes, editNote} = context;
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})  

  // eslint-disable-next-line
  useEffect(()=>{
    if(localStorage.getItem(`token`)){
      getNotes()
    }
    else{
      navigate("/login");
    }
  },// eslint-disable-next-line
  [])
  //this [] tells the useEffect to do this work only once

  //This syntax is must for taking input from the user
  const onChange = (e)=>{
      setNote({...note, [e.target.name]:e.target.value})
  }
  
  const updateNote=(currentnote)=>{
    //So this function is used to set the value of the fields in the modal opened through edit icon
    ref.current.click();//this will click the reffered element, and rest work will be done by bootstrap i.e. to open the modal
    setNote({id:currentnote._id,etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
  }
  const handleClick =(e)=>{
    // e.preventDefault();// so that after clicking on submitting page does'nt reloads...
    //however there is no need to e.preventDefault(); as the form is not the part of the page 
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Updated sucessfully", "success")
  }
  return (
    <>
    <Addnote showAlert={props.showAlert}></Addnote>
    {/* added ref in the modal to toggle its bootstrap class using useRef hook of react */}
    <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

      <div  className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form className='my-3'>
              <div className="form-group">
              {/* etitle means edit wala title */}
                <label htmlFor="title" className='form-label' >Title</label>
                <input minLength={5} required type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="description" >description</label>
                <input minLength={5} required type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
              </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary d-none" data-dismiss="modal">Close</button>
            <button disabled={ note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update changes</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row md-3">
      <h2>YOUR NOTES</h2>
      
      {notes.length===0 ?(<div className="container">No notes to display</div>) :(<div className="container row">
      {notes.map((notes) => {
        return <Noteitem key={notes._id} updateNote={updateNote} note={notes} showAlert={props.showAlert}></Noteitem>;
      })}
      </div>)}
    </div>
    </>
  );
};

export default Notes;
