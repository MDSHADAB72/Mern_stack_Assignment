import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const DashBord = () => {
  let [name, setname] = useState("")
  let ID = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:4001/user/${ID.ID}`)
      .then((e) => {
        setname(e.data)
      })
      .catch(() => { console.log("unable to fetch data"); })
  }, [])

  const handleLogout = () => {
    // Clear any session storage or token here if needed
    navigate('/'); // Redirects to the login page
  }

  return (
    <div className="dashboard-container">
      <div id='navbar' className='navbar'>
        <ul className='nav-list'>
          <li>Home</li>
          <li><Button variant="text"><Link to='/create-employee'>Create Employee</Link></Button></li>
          <li><Button variant="text"><Link to="/employee-list">Employee List</Link></Button></li>
          <li className='user-name'>{name}</li>
          <li>
            <Button className="logout-btn" onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </div>
      <h1 className='dashboard-title'>Dashboard</h1>
      <p className="welcome-text">Welcome to the admin panel</p>
    </div>
  )
}

export default DashBord
