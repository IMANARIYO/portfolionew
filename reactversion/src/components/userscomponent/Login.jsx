import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Handle login functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    const url = 'https://myportfolioapi-8vku.onrender.com';
    try {
      const response = await axios.post(`${url}/auth/login`, { email, password });

      const data = response.data;

      if (response.status === 200) {
        toast.success('Login successful!'); 
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // Navigate to dashboard after successful login
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Wrong user or password.');
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        
        {/* Go Back Button */}
        <button 
          className="mb-4 flex items-center text-blue-500 hover:underline"
          onClick={() => navigate(-1)}  // Go back to the previous page
        >
          <FaArrowLeft className="mr-2" /> {/* Back Icon */}
          Go Back
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter your credentials to login to your account.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-gray-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
        
        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/signup" className="ml-2 text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
