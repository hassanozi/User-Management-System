import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import hassan from '../../../assets/images/hassan.jpg'
import { AuthContext } from '../../../Context/AuthContext';

export default function SideBar() {

  let {loginData} = useContext(AuthContext);

  let name = 'Hassan Abdelrazek';

  const [isCollapse , setIsCollapse] = useState(false)

  const toggleCollapse=()=>{
    setIsCollapse(!isCollapse)
  }

  return (
    <>
    <div className='sidebar-container'>
      <Sidebar collapsed={isCollapse}>
        <Menu>
          <i onClick={toggleCollapse} className='fas fa-bars float-end'></i>
          <h2 className='my-3 ms-3'>UMS</h2>

          <div className='my-2 mb-5 text-center'><img className="w-50 rounded-circle mt-5" src={loginData?.image} alt="" /></div>
          <div className='my-2 mt-4 text-center'><h6 className='mt-3 fw-bold font fontSize'>{loginData?.firstName}</h6></div>
          <div className='mb-5 text-center'><h6 className='fw-bold font fontSize'>Admin</h6></div>


          <MenuItem className='my-2' icon={<i className='fa fa-home'></i>} component={<Link to="/home" />}> Home </MenuItem>
          <MenuItem className='my-2' icon={<i className='fa fa-users'></i>} component={<Link to="/home/users-list" />}> Users </MenuItem>
          <MenuItem className='my-2' icon={<i className='fa fa-user'></i>} component={<Link to="/home/user-data" />}> Add user </MenuItem>
          <MenuItem className='my-2' icon={<i className='fa fa-portrait'></i>} component={<Link to={`/home/user-profile/${loginData?.id}`} />}> Profile </MenuItem>

          <MenuItem className='my-5' icon={<i className='fa fa-long-arrow-right'></i>} component={<Link to="/" />}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
      
    </>
  )
}
