import React, { useContext } from 'react'
import './Login.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext'

export default function Login() {

  let {saveLoginData} = useContext(AuthContext);

  let navigate = useNavigate()

  let {register,handleSubmit,formState:{errors}} = useForm()

  const onFormSubmit = async (data:any) => {
    try {
     let response = await axios.post('https://dummyjson.com/auth/login', data);
     localStorage.setItem('token', response.data.accessToken);
     saveLoginData();

     toast.success('Login Successful!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      navigate('/home/users-list');

      console.log(response.data);
    } catch (error) {
      toast.error('Login Failed. Please check your credentials.');
      console.log(error);
    }
  }

  return (
    <div className='vh-100 auth-container container-fluid'>
        <div className="row vh-100 justify-content-center align-items-center">
          <div className='col-md-4'>
            <div className='login bg-white py-5 px-3 rounded-4'>
              <h1 className='h3 ms-5 fw-bold'>User Management System</h1>
              <div className='text-center my-5'>
                <h3>SIGN IN</h3>
                <p className='text-muted'>Enter your credentials to access your account</p>
              </div>
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input {...register("username",{required:"Email is required"})} type="text" className="form-control my-2" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.username && <p className='alert alert-danger'>{errors?.username.message}</p>}

                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input {...register("password",{required:"Password is required"
                    // ,pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,message:"Minimum eight characters, at least one letter and one number"}
                  })} type="text" className="form-control my-2" placeholder="Enter Your Password" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.password && <p className='alert alert-danger'>{errors?.password.message}</p>}

                <button className='btn btn-warning w-100 text-white'>SIGN IN</button>
              </form>
            </div>
          </div>
        </div>
        
    </div>
  )
}
