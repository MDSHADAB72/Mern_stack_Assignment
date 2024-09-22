import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './auth.css';


const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [cnfPassword, setCnfPassword] = useState('')
    let navigate = useNavigate()

    let submitForm =()=>{
        let payload = {
            name,email,cnfPassword
        }
        if(!name || !email || !cnfPassword){
            alert("To register Fill all the fields..!")
        }
        else{
            if(password === cnfPassword ){
                axios.post('http://localhost:4001/register', payload)
            .then((e)=>{
                alert(e.data);
                navigate("/")
            })
            .catch((e)=>{
                alert("problem in sending data to the Backend.!");
            })
            }
            else{
                alert("both password should be matched..")
            }
            
        }
    }

    return (
        <div className="container">
            <h1 className="title">Admin Registration Form</h1>
            <div className="form-container">
                <input className="input-field" placeholder="Enter Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="input-field" placeholder="Enter Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="input-field" placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="input-field" placeholder="Retype Password" type="password" value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
                <button className="button" onClick={submitForm}>Register Me</button>
                <p className="link">Already have an account? <Button variant="outlined"><Link to="/"> Sign In</Link></Button></p>
            </div>
        </div>
    );
    
}

export default Registration