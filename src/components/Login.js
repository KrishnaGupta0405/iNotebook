import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});

    let navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})// passing all the fields as json objects. wasted 30 min to find this shit !!!     
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save route auth-token and redirect
            localStorage.setItem("token", json.authToken);
            navigate('/')
            props.showAlert("Logged in successfully", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")
            // alert("invalid credentials")
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials , [e.target.name]: e.target.value})
    }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input required type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input required minLength={8} type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    </div>
  )
}

export default Login