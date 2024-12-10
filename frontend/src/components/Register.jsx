import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

export default function Register() {
    const navigate = useNavigate();
    const [details,setDetails] = useState({
        email: '',
        password: '',
        username: ''
    });
    const handleChanges = (e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }
    const submitDetails = async (e)=>{
        e.preventDefault();
        try{        
            const response = await axios.post("http://localhost:3001/auth/register",details);
            if(response.status==200){
            window.alert("User created successfully! Login to continue");
            navigate("/login");}
            else if(response.status==401){
                window.alert(`${response.message}`);
            }else{
                window.alert("server error");
            }
        }
        catch(err){
            console.log(err);
        }
        
    }
  return (
    <div className='register'>
        <h1>Register</h1>
        <form  onSubmit={submitDetails}>
            <label>Email:</label>
            <input type='email' name='email' onChange={handleChanges}></input><br/>
            <label>Password</label>
            <input type='password' name='password' onChange={handleChanges}></input><br/>
            <label>Username</label>
            <input type='text' name='username' onChange={handleChanges}></input><br/>
            <button type='submit'>Submit</button>
        </form>
        <label>Already have an Account?</label>
        <Link to="/login">Login</Link>
    </div>
  )
}
