import React, { useContext } from 'react';
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { deleteNote} = context;// for now i just want to call the addNote that's why only addNote is writtern
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">{/* to make gap between diffrent cards */}        
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title ">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted succesfully", "success")}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
