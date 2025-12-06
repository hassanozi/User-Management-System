import React, { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext';

export default function NavBar() {

  let {loginData} = useContext(AuthContext);

  return (
    <>  
    <div>
      <span>Mail : {loginData?.email}</span>
    </div>
    </>
  )
}
