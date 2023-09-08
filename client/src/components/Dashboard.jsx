import React,{useContext, useState} from 'react'
import AppContext from '../context'
import axios from 'axios'

function Dashboard() {
  
const {token} = useContext(AppContext)  
const [result,setResult] = useState("")
const baseUrl = "http://localhost:3000"

    const getDataHandler = async () =>{
        const token = localStorage.getItem('token')
        try {
         const {data} = await axios.get(`${baseUrl}/api/v1/dashboard`,{
           // Setting the authorization header
           headers:{
             Authorization:`Bearer ${token}`  // Passing the token in the header
            }
          })
          console.log(data)
          setResult(`${data.msg} , Now do whatever u want to`)
        } 
       catch (error) {
         localStorage.removeItem('token')
          // console.log(error.message)
          setResult("First Login In")
       }
   }
  return (
      <div className="container">
        <h4>Dashboard</h4>
        <div className="token">{token}</div>
        <div className="result">{result}</div>
        <button className="btn btn-block" id="data" onClick={getDataHandler}>Get Data</button>
      </div> 
  )
}

export default Dashboard