import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import './auth.css';


const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let login=()=>{
        let payload = {email, password}
        axios.post('http://localhost:4001/login', payload)
        .then((e)=>{
            if(e.data.status == "success"){
                navigate(`/dashbord/${e.data.id}`)
            }
            else if(e.data.status == "fail"){
                alert("wrong password")
            }
            else if(e.data.status == "noUser"){
                alert("Invalid Email")
            }
        })
    }

    return (
        <div className="container">
            <h1 className="title">Login Form</h1>
            <div className="form-container"> 
                <input className="input-field" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="input-field" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="button" onClick={login}>LOGIN</button>
                <p className="link">Don't have an account? <Button variant="outlined"><Link to="/register"> Sign Up</Link></Button></p>
            </div>
        </div>
    );
    
}

export default Login