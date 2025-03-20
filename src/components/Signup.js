import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    // http://localhost:5000/api/auth/createUser
    const [credentials, setCredentials] = useState({email: "", password: "",name: "",cpassword: ""});

    let navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({name, email, password})// passing all the fields as json objects. wasted 30 min to find this shit !!!     
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save route auth-token and redirect
            localStorage.setItem("token", json.authToken);
            navigate('/login')
            props.showAlert("Account created successfully", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
        // localStorage.setItem("token", json.authToken);
        // navigate('/')
        // setCredentials({email: "", password: "",name: "",cpassword: ""})
        // navigate('/login')
    }
    const onChange=(e)=>{
        setCredentials({...credentials , [e.target.name]: e.target.value})
    }
  return (
    <div>
        <div className="container">
            {/* because we are using onSubmit on the "Form", hence we can use required option... */}
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input value={credentials.name} onChange={onChange} type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input required value={credentials.email} onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input required minLength={8} value={credentials.password} onChange={onChange} type="password" className="form-control" name="password" id="password"/>
        </div>
        <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input required value={credentials.cpassword} onChange={onChange} type="cpassword" className="form-control" name="cpassword" id="cpassword"/>
        </div>
        <button disabled={credentials.password !== credentials.cpassword || credentials.email.length<1 || credentials.password.length < 8} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Signup