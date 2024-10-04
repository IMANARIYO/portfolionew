import "react-toastify/dist/ReactToastify.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleSignup = async (data) => {
    const {
      fullNames,
      email,
      password,
      confirmPassword,
      phoneNumber,
      gender,
      image
    } = data;

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 5000 });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('fullNames', fullNames);
      formData.append('phoneNumber', phoneNumber);
      formData.append('gender', gender);
      formData.append('image', image[0]);

      const response = await axios.post(
        'https://myportfolioapi-8vku.onrender.com/auth/signup',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const responseData = response.data;
      if (response.status === 201) {
        toast.success('Signup successful!', {
          autoClose: 5000,
          onClose: () => {
            navigate('/login'); // Redirect to login page
          }
        });
      } else {
        toast.error(responseData.message, { autoClose: 5000 });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', { autoClose: 5000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="p-6 bg-gray-400 rounded-lg shadow-md w-full max-w-md">
        {/* Go Back Button or Icon */}
        <button 
          className="mb-4 flex items-center text-blue-500 hover:underline"
          onClick={() => navigate(-1)}  // Go back to the previous page
        >
          <FaArrowLeft className="mr-2" /> {/* Go Back Icon */}
          Go Back
        </button>

        <h2 className="mb-4 text-2xl font-bold text-center text-blue-500">Sign Up</h2>
        <p className="text-center text-gray-950 mb-6">Create a new account to get started!</p>

        <form onSubmit={handleSubmit(handleSignup)} encType="multipart/form-data">
          {/* Full Names Field */}
          <div className="mb-4">
            <label htmlFor="fullNames" className="block text-gray-700">
              Full Names:
            </label>
            <input
              type="text"
              id="fullNames"
              {...register('fullNames', { required: 'Full Names are required' })}
              className="block w-full mt-1 p-2 border-gray-950 rounded-lg form-input text-gray-950"
            />
            {errors.fullNames && <span className="font-bold text-red-500">{errors.fullNames.message}</span>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-950">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              className="block w-full mt-1 p-2 border-gray-300 rounded-lg form-input text-gray-950"
            />
            {errors.email && <span className="font-bold text-red-500">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-950">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="block w-full mt-1 p-2 border-gray-300 rounded-lg form-input text-gray-950"
            />
            {errors.password && <span className="font-bold text-red-500">{errors.password.message}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-950">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: 'Confirm Password is required' })}
              className="block w-full mt-1 p-2 border-gray-300 rounded-lg form-input text-gray-950"
            />
            {errors.confirmPassword && <span className="font-bold text-red-500">{errors.confirmPassword.message}</span>}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-950">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              {...register('phoneNumber', { required: 'Phone Number is required' })}
              className="block w-full mt-1 p-2 border-gray-300 rounded-lg form-input text-gray-950"
            />
            {errors.phoneNumber && <span className="font-bold text-red-500">{errors.phoneNumber.message}</span>}
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700">
              Gender:
            </label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className="block w-full mt-1 p-2 border-gray-300 rounded-lg form-input bg-gray-900"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="font-bold text-red-500">{errors.gender.message}</span>}
          </div>

          {/* Profile Image Field */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Profile Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register('image', { required: 'Profile image is required' })}
              className="block w-full mt-1 p-2 border-gray-300 rounded-lg form-input"
            />
            {errors.image && <span className="font-bold text-red-500">{errors.image.message}</span>}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>

          {/* Link to Login */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/login" className="ml-2 text-blue-500 hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupForm;
