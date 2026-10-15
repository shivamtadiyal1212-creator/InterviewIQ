import React, { useState } from 'react'
import { useNavigate,Link } from "react-router"
import { useAuth } from '../hooks/useAuth';
const Registor = () => {

  const{Loading,handleRegistor}=useAuth();

  const navigate = useNavigate();
    const [username, setusername] = useState("")
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")


  const onSubmit=async (e)=>{
    e.preventDefault();
    await handleRegistor({username:username,email:email,password:password});
    navigate("/");
    setusername("");
    setemail("");
    setpassword("");
    
  }
  if(Loading){
    return(
      <main>
        <h1>
          loading....
        </h1>
      </main>
    )
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={(e)=>{onSubmit(e)}}>

            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id='username' name='username' placeholder='Enter your Username' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' placeholder='Enter your email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='Enter your password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            </div>
            <button className='button primary-button' >Register</button>
        </form>
        <p>Already have an account?<Link to={"/login"}>login</Link></p>
      </div>
    </main>
  )
}

export default Registor