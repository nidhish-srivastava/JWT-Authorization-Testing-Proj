import './App.css'
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AppContext from './context'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Header from './components/Header';

function App() {
  const [token,setToken] = useState("")
  return (
    <Router>
      <Header/>
    <AppContext.Provider value={{token,setToken}}>
      <Routes>
        <Route path='/' element={<Navigate replace to="dashboard"/>}/> 
        <Route  path='/dashboard' element={<Dashboard/>}/>
        <Route  path='/login' element={<Login/>}/>
      </Routes>
    </AppContext.Provider>
    </Router>
  )
}

export default App
