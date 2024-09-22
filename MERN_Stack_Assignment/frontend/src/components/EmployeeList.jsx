import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const EmployeeList = () => {
    let [infoFromDB, setinfoFromDB] = useState([]);
    let [reload, setReload] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4001/employee-list")
            .then((response) => {
                console.log(response.data); // Check the data structure
                setinfoFromDB(response.data);
            })
            .catch((error) => {
                console.log("Error fetching employee list", error);
            });
    }, [reload]); // Fetch data when reload changes

    let deleteUser = (id) => {
        axios.delete(`http://localhost:4001/employee-list/${id}`)
            .then(() => {
                setReload(prev => prev + 1); // Increment reload state
            })
            .catch((error) => {
                console.log("Error deleting employee", error);
            });
    };

    return (
        <div className='employee-list-container'>
            <p>Total Count: {infoFromDB.length}</p>
            <table className='employee-table'>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {infoFromDB.map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td><img src={`backend/Images/${item.image}`} alt={item.name} /></td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.designation}</td>
                            <td>{item.gender}</td>
                            <td>{item.course.join(", ")}</td>
                            <td className='action-buttons'>
                                <Link to={`/edit-employee/${item._id}`} className='edit-link'>Edit</Link>
                                <Button
                                    variant="outlined"
                                    className='delete-button'
                                    onClick={() => deleteUser(item._id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
