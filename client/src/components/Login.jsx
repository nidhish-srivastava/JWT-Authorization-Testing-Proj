import React,{useContext, useState} from 'react'
import axios from 'axios'
import AppContext from '../context'

function Login() {
const [username,setUsername] = useState("") 
const [password,setPassword] = useState("")
const {setToken}  = useContext(AppContext)
const baseUrl = "http://localhost:3000"
const formSubmitHandler = async (e) =>{
  e.preventDefault()
  try {
    const {data} = await axios.post(`${baseUrl}/api/v1/login`,{username,password})
    setUsername("")
    setPassword("")    
    localStorage.setItem('token',data.token)
    setToken("You have logged in")
  } 
  catch (error) {
    localStorage.removeItem('token')
    setToken("You havent logged in or Registered")
  }
}

  return (
    <form className="form contact-form" onSubmit={formSubmitHandler}>
    <h5>Login/Register</h5>
    <div className="form-row">
      <label htmlFor="username" className="form-label">username</label>
      <input type="text" className="form-input username-input" value={username} onChange={(e)=>setUsername(e.target.value)}/>
    </div>
    <div className="form-row">
      <label htmlFor="password" className="form-label">password</label>
      <input type="password" className="form-input password-input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <button type="submit" className="btn btn-block">Submit</button>
  </form>
  )
}

export default Login