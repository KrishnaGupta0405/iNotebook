import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  // Similar to componentDidMount, i.e. everytime a new component takes birth, this will run first.
  // useEffect(()=>{
  //   console.log(location.pathname);
  // })
  const hanldleLogout=()=>{
    localStorage.removeItem(`token`);
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/"? "active":""}`} to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${Location.pathname ==="/"? "active":""}`} to="/about">About <span className="sr-only">(current)</span></Link>
          </li>
          {/* here we made use of useLocation hook rpovided by react-router-dom */}
          {/* however here it is not need as bootstrap bydefault provides span with current which does all this nasty work :) ... */}
        </ul>
        {!localStorage.getItem(`token`)?<form className="form-inline my-2 my-lg-0">
          <Link className="btn btn-primary my-2 mx-1 my-sm-0"  to= "/login" role="button">Login</Link>
          <Link className="btn btn-primary my-2 mx-1 my-sm-0" to= "/signup" role="button">Signup</Link>
        </form>: <button onClick={hanldleLogout} className='btn btn-primary'>Logout</button>}
      </div>
      </nav>
    </div>
  )
}

export default Navbar
