import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const CreateEmployee = () => {
    let navigate = useNavigate();
    let [name, setName] = useState("")
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState()
    let [designation, setDesignation] = useState()
    let [gender, setGender] = useState("")
    let [course, setCourse] = useState([])
    let [image, setImage] = useState()

    let formHandle = (e) => {
        e.preventDefault()
        let payload = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            designation: designation,
            gender: gender,
            course: course
        }

        if (!name || !email || !phone || !designation || !gender || !course || !image) {
            alert("To Create Employee Fill all the fields..!")
        }
        else {
            axios.post("http://localhost:4001/employees", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((e) => { alert(e.data) })
                .catch(() => { console.log("can not register"); })

            navigate("/employee-list")
        }
    }

    let handleCourseChange = (e) => {
        const course1 = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setCourse(course.concat(course1));
        }
        else {
            setCourse(course.filter(item => item !== course1));
        }
    };

    return (
        <div className='create-employee-container'>
            <h1 className='form-title'>Create Employee</h1>
            <form onSubmit={formHandle} className='form'>
                <input className='input-field' placeholder='Enter Full Name' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                <input className='input-field' placeholder='Enter Email' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input className='input-field' placeholder='Enter Phone Number' type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />

                {/* designation dropdown */}
                <label className='label'>Designation</label>
                <select onChange={(e) => { setDesignation(e.target.value); }} className='input-field'>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>

                {/* Gender radio button */}
                <label className='label'>Gender :</label><br />
                <div className='radio-group'>
                    <input type="radio" id="male" name="gender" value={gender} onChange={(e) => { setGender("Male") }} />
                    <label className='radio-label' htmlFor="male"> Male </label>
                    <input type="radio" id="female" name="gender" value={gender} onChange={(e) => { setGender("Female") }} />
                    <label className='radio-label' htmlFor="female"> Female </label><br />
                </div>

                {/* Courses check boxes */}
                <label className='label'>Course :</label><br />
                <div className='checkbox-group'>
                    <input type="checkbox" id="MCA" name="course" value="MCA" checked={course.includes('MCA')} onChange={handleCourseChange} />
                    <label className='checkbox-label' htmlFor="MCA"> MCA </label>
                    <input type="checkbox" id="BCA" name="course" value="BCA" checked={course.includes('BCA')} onChange={handleCourseChange} />
                    <label className='checkbox-label' htmlFor="BCA"> BCA </label>
                    <input type="checkbox" id="BSC" name="course" value="BSC" checked={course.includes('BSC')} onChange={handleCourseChange} />
                    <label className='checkbox-label' htmlFor="BSC"> BSC </label><br />
                </div>

                {/* file upload */}
                <label className='label'>Upload your photo</label><br />
                <input className='input-file' accept="image/jpeg, image/png" type="file" name='image' onChange={(e) => { setImage(e.target.files[0]) }} /><br />

                <button type='submit' className='submit-btn'>Submit</button>
            </form>
        </div>
    )
}

export default CreateEmployee
