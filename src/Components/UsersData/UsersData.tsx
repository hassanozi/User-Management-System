import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function UsersData() {

  const { id } = useParams(); // <-- GET URL PARAM (e.g., /home/user-data/5)
  const isEdit = Boolean(id); // edit mode if param exists

  let navigate = useNavigate();
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
    if (isEdit) loadUser();
  }, [id]);

  
  // SUBMIT FORM (POST or PUT)
  
  const onFormSubmit = async (data: any) => {
    try {
      let response;

      if (isEdit) {
        // EDIT USER
        response = await axios.put(`https://dummyjson.com/users/${id}`, data);
        toast.success("User updated successfully!");
      } else {
        // ADD NEW USER
        response = await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User added successfully!");
      }

      navigate("/home/users-list");
    } catch (error) {
      toast.error("Failed to save user");
    }
  };

  return (
    <div className="vh-100 container-fluid">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className='col-md-12'>
          <div className='login bg-white py-5 px-3 rounded-4'>

            <h1>{isEdit ? "Edit User" : "Add User"}</h1>

            <form onSubmit={handleSubmit(onFormSubmit)}>

              <div className="row">
                <div className='col-md-6'>
                  <div className="mb-3">
                    <label>First Name</label>
                    <input
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
                    <input
                      {...register("Lastname", { required: "Last name is required" })}
                      type="text"
                      className="form-control my-2"
                      placeholder="Enter Last Name"
                    />
                  </div>
                  {errors.Lastname && <p className='alert alert-danger'>{errors.Lastname.message}</p>}
                </div>
              </div>

              <div className="row">
                <div className='col-md-6'>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
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
                    <input
                      {...register("Age", { required: "Age is required" })}
                      type="text"
                      className="form-control my-2"
                      placeholder="Enter Age"
                    />
                  </div>
                  {errors.Age && <p className='alert alert-danger'>{errors.Age.message}</p>}
                </div>
              </div>

              <div className="row">
                <div className='col-md-6'>
                  <div className="mb-3">
                    <label>Phone Number</label>
                    <input
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
                    <input
                      {...register("Birthdate", { required: "Birth date is required" })}
                      type="date"
                      className="form-control my-2"
                      placeholder="Enter Birth Date"
                    />
                  </div>
                  {errors.Birthdate && <p className='alert alert-danger'>{errors.Birthdate.message}</p>}
                </div>
              </div>

              <div className='text-center mt-4'>
                <button className='btn btn-warning w-50 text-white'>
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
