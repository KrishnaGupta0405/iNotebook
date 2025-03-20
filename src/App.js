import React , {useState} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  // this alert compnent call also be writtern in context API
  // eslint-disable-next-line
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message, type: type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}></Alert>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}></Home>}></Route>
              <Route exact path="/about" element={<About></About>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}></Login>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}></Signup>}></Route>
            </Routes>
          </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}
