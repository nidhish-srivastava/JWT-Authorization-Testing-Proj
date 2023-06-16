import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <React.Fragment>
         <nav>
        <ul>
            <li><Link to="/dashboard">
                Home
            </Link>
                </li>
            <li><Link to="/login">
                Login
            </Link>
                </li>
        </ul>
    </nav>
    </React.Fragment>
  )
}

export default Header