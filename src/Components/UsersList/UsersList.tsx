import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UsersList() {

  let navigate = useNavigate()

  const [users, setusers] = useState([])
  const [userId, setUserId] = useState(0)
  const [username, setUserName] = useState("")

  const deleteUser = async () => {
    try {
      let response = await axios.delete(`https://dummyjson.com/users/${userId}`);
      console.log(response);
      handleClose();
      toast.success(`User ${username} deleted successfully!`);
    } catch (error) {
      toast.error('Failed to delete user.');
    }
  }

  const getUsers = async () => {
    let response = await axios.get('https://dummyjson.com/users');
    setusers(response.data.users);
  }

  useEffect(() => {
    getUsers();
  }, [])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    
    setUserId(user.id)
    setUserName(user.username)
    setShow(true)
  };

  return (
    <>
     

      <Modal show={show} onHide={handleClose}>
        
        <Modal.Body>Are you sure you want to delete {username}?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='comp-title d-flex justify-content-between p-5'>
        <h3>Users list</h3>
        <button className='btn btn-warning'><Link to="/home/user-data">Add New User</Link> </button>
      </div>

      {/* <Link to="/home/user-data" className="btn btn-warning text-white">
        Add New User
      </Link> */}


      <div className='table-container p-4'>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user=>
            <tr>
            <th scope="row"><img className='w-25' src={user.image} alt="" /></th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <i className='fa fa-edit text-warning' onClick={() => navigate(`/home/user-data/${user.id}`)}></i>
              <i onClick={() =>handleShow(user)} className='fa fa-trash text-warning'></i>
            </td>
          </tr>
        )}
          
        </tbody>
      </table>
      </div>
      
    </>
  )
}
