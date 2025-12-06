import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';

export default function UserProfile() {

  let {loginData} = useContext(AuthContext);
  let { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  
  // LOAD USER DATA IF EDIT MODE
  
  const loadUser = async () => {
    try {
      let response = await axios.get(`https://dummyjson.com/users/${id}`);

      // Fill inputs
      setValue("Firstname", response.data.firstName);
      setValue("Lastname", response.data.lastName);
      setValue("Email", response.data.email);
      setValue("Age", response.data.age);
      setValue("Phonenumber", response.data.phone);
      setValue("Birthdate", response.data.birthDate);

    } catch (error) {
      toast.error("Failed to load user data");
    }
  };

  useEffect(() => {
      loadUser();
    }, []);

  return (
    <>  
      <div className="vh-100 container-fluid">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className='col-md-12'>
          <div className='login bg-white py-5 px-3'>

            <h1 className='mb-5'>Profile</h1>

            <div className='my-2 mb-5 text-center m-auto rounded-circle w-25'>
              <img className="w-25 mt-5" src={loginData?.image} alt="" />
            </div>


            <div className='rounded-4 bg-light p-4'>

               <form>

                  <div className="row m-3">
                    <div className='col-md-6'>
                      <div className="mb-3">
                        <label>First Name</label>
                        <input disabled
                          {...register("Firstname", { required: "First name is required" })}
                          type="text"
                          className="form-control my-2"
                          placeholder="Enter First Name"
                        />
                      </div>
                      {errors.Firstname && <p className='alert alert-danger'>{errors.Firstname.message}</p>}
                    </div>

                    <div className='col-md-6'>
                      <div className="mb-3">
                        <label>Last Name</label>
                        <input disabled
                          {...register("Lastname", { required: "Last name is required" })}
                          type="text"
                          className="form-control my-2"
                          placeholder="Enter Last Name"
                        />
                      </div>
                      {errors.Lastname && <p className='alert alert-danger'>{errors.Lastname.message}</p>}
                    </div>
                  </div>

                  <div className="row m-3">
                    <div className='col-md-6'>
                      <div className="mb-3">
                        <label>Email</label>
                        <input disabled
                          {...register("Email", { required: "Email is required" })}
                          type="text"
                          className="form-control my-2"
                          placeholder="Enter Email"
                        />
                      </div>
                      {errors.Email && <p className='alert alert-danger'>{errors.Email.message}</p>}
                    </div>

                    <div className='col-md-6'>
                      <div className="mb-3">
                        <label>Age</label>
                        <input disabled
                          {...register("Age", { required: "Age is required" })}
                          type="text"
                          className="form-control my-2"
                          placeholder="Enter Age"
                        />
                      </div>
                      {errors.Age && <p className='alert alert-danger'>{errors.Age.message}</p>}
                    </div>
                  </div>

                  <div className="row m-3">
                    <div className='col-md-6'>
                      <div className="mb-3">
                        <label>Phone Number</label>
                        <input disabled
                          {...register("Phonenumber", { required: "Phone number is required" })}
                          type="text"
                          className="form-control my-2"
                          placeholder="Enter Phone Number"
                        />
                      </div>
                      {errors.Phonenumber && <p className='alert alert-danger'>{errors.Phonenumber.message}</p>}
                    </div>

                    <div className='col-md-6'>
                      <div className="mb-3">
                        <label>Birth Date</label>
                        <input disabled
                          {...register("Birthdate", { required: "Birth date is required" })}
                          type="text"
                          className="form-control my-2"
                          placeholder="Enter Birth Date"
                        />
                      </div>
                      {errors.Birthdate && <p className='alert alert-danger'>{errors.Birthdate.message}</p>}
                    </div>
                  </div>

              

            </form>
            </div>
            

          </div>
        </div>
      </div>
      </div>
    </>
  )
}
