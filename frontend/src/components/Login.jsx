import React, { useState , useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"

export const Login = () => {
    const navigate = useNavigate();
    const [details,setDetails] = useState({
        email: '',
        password: ''
    });
    const handleChanges = (e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }
    const submitForm= async (e)=>{
        e.preventDefault();
        try{
            console.log(details);
            const response = await axios.post("http://localhost:3001/auth/login",details);
            if(response.status==200){
                console.log(response.data.token);
                sessionStorage.setItem("token" , response.data.token)
                navigate("/");
            }else{
                window.alert("Error credentials");
            }
        }
        catch(err){
            if(err.status===401){
                window.alert("error credentials");
            }
        }
    }
    // const verifyUser = async () => {
    //     try {
    //       const token = sessionStorage.getItem("token");
    //       console.log(token);
    //       if (!token) {
    //       const response = await axios.get("http://localhost:3001/auth/login/home", {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    
    //       if (response.status == 200) {
    //         navigate("/");
    //       }}
    //     }catch(err){
    //         console.log(err);
    //     }
    //   };
    
    //   useEffect(() => {
    //     verifyUser();
    //   }, []);
  return (
    <div className='login'>
        <h1>Login</h1>
        <form>
            <label>email:</label>
            <input type='email' name='email'onChange={handleChanges}/><br/>
            <label>password:</label>
            <input type='password' name='password' onChange={handleChanges}/><br/>
            <button type='submit' onClick={submitForm}>Login</button>
        </form>
        <label>Don't have an account?</label>
        <Link to="/Register">Register</Link>
    </div>
  )
}
