import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function UserForm({ handleClose, userToUpdate }) {
  // Updated handleClose function to navigate to home page
  const navigateHome = () => {

    navigate('/');
  };

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const onSubmit = async (data) => {
    try {
      console.log('Trying to post the data');
      const formData = new FormData();
      formData.append('fullNames', data.fullNames);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('password', data.password);
      // formData.append('image', data.image[0]);
      formData.append('role', data.role);
      formData.append('email', data.email);
      formData.append('gender', data.gender);

      let response;
      let url = 'https://myportfolioapi-8vku.onrender.com';
      
      if (userToUpdate) {
        console.log(userToUpdate._id);
        response = await axios.patch(
          `${url}/auth/updateUserById/${userToUpdate._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('User updated successfully!', { autoClose: 3000 });
        handleClose();
      } else {
        console.log('Posting users', data.email);
        response = await axios.post(`${url}/auth/signup`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Response after signup:', response.data);
        toast.success('Signup successful!', { autoClose: 3000 });
        navigate('/login'); // Use navigate to redirect to login page
      }

      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.', { autoClose: 3000 });
    }
  };

  useEffect(() => {
    if (userToUpdate) {
      Object.entries(userToUpdate).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [userToUpdate, setValue]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{userToUpdate ? 'Update User' : 'signup form'}</h2>
          <button className="text-gray-600 hover:text-gray-900" onClick={navigateHome}>
            <MdClose size={24} />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700">Full Name:</label>
            <input
              className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
              type="text"
              name="fullNames"
              {...register('fullNames', { required: 'Full Names are required' })}
            />
            {errors.fullNames && <p className="text-red-600">{errors.fullNames.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Phone Number:</label>
            <input
              className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
              type="text"
              name="phoneNumber"
              {...register('phoneNumber', { required: 'Phone Number is required' })}
            />
            {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
          </div>
          {/* <div>
            <label className="block text-gray-700">Image:</label>
            <input
              className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
              type="file"
              accept="image/*"
              name="image"
              {...register('image', { required: 'Profile image is required' })}
            />
            {errors.image && <p className="text-red-600">{errors.image.message}</p>}
          </div> */}
          {userToUpdate && (
            <div>
              <label className="block text-gray-700">Role:</label>
              <input
                className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
                type="text"
                name="role"
                {...register('role', { required: 'Role is required' })}
              />
              {errors.role && <p className="text-red-600">{errors.role.message}</p>}
            </div>
          )}
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
              type="email"
              name="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          {!userToUpdate && (
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
                type="password"
                name="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
          )}
          
          {/* <div>
            <label className="block text-gray-700">Gender:</label>
            <select
              className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm"
              name="gender"
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
          </div> */}
          <button className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600" type="submit">
            {userToUpdate ? 'Update' : 'signup'}
          </button>
          {!userToUpdate && (
            <div className="mt-4">
              <span className="text-gray-600">Already have an account?</span>
              <a href="/login" className="ml-2 text-blue-500">Login</a>
            </div>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserForm;
