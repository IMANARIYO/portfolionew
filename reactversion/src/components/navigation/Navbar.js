import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";
import React, { useEffect, useState } from "react";
import api from "../../apirequest/api";
import { FaBars, FaSignInAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // To store user's role
  const [showProfileMenu, setShowProfileMenu] = useState(false); // For dropdown menu
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false); // To manage login form
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false); // To manage signup form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullNames, setFullNames] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedRole = localStorage.getItem('userRole');
    if (token && storedRole) {
      setIsLoggedIn(true);
      setUserRole(storedRole);  // Set the stored user role (admin, user, etc.)
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      
      // Display a toast notification for successful login
      toast.success('Login successful!');
      
      // Store the user details in localStorage
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('userRole', data.user.role);  // Store the user role
      localStorage.setItem('user', JSON.stringify(data.user));

      // Set logged in state
      setIsLoggedIn(true);
      setUserRole(data.user.role);  // Set the user role based on the logged-in user
      
      // Close the login form modal
      setIsLoginFormOpen(false);
      setLoginError(null);
    } catch (error) {
      setLoginError("Invalid email or password");
      console.error("Login failed", error);
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post('/auth/signup', { fullNames, email, password });
      const data = response.data;
      
      // Store the user details in localStorage
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('userRole', data.user.role);  // Store the user role
      localStorage.setItem('user', JSON.stringify(data.user));

      // Set logged in state
      setIsLoggedIn(true);
      setUserRole(data.user.role);  // Set the user role based on the logged-in user
      
      // Close the signup form modal
      setIsSignupFormOpen(false);
      setSignupError(null);
      
      // Display a toast notification for successful signup
      toast.success('Signup successful!');
    } catch (error) {
      setSignupError("Signup failed, try again");
      console.error("Signup failed", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setShowProfileMenu(false);
    toast.info("Logged out successfully!");
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} section`}>
      <div className="logo">
        <img src="/images/myImage.png" alt="IMANARIYO Baptiste" />
        <span>IMANARIYO Baptiste</span>
      </div>
      <div className={`menu ${isMobileMenuOpen ? 'show' : ''}`}>
        {['Home', 'About', 'Projects', 'Services', 'Testimonial', 'Contacts'].map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className={`menu-item ${activeItem === item ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {item}
          </a>
        ))}

        {/* Render authentication-related items */}
        <div className="menu-item auth-menu">
          {!isLoggedIn ? (
            <>
              <a href="#" className="menu-item" onClick={() => setIsLoginFormOpen(true)}>
                <FaSignInAlt /> Login
              </a>
              <a href="#" className="menu-item" onClick={() => setIsSignupFormOpen(true)}>
                <FaSignInAlt /> Signup
              </a>
            </>
          ) : (
            <>
              <div className="menu-item profile-item" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <FaUserCircle /> Profile
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  {userRole === 'admin' && (
                    <a href="dashboard" onClick={closeMobileMenu}>
                      Dashboard
                    </a>
                  )}
                  <a href="#settings" onClick={closeMobileMenu}>
                    Settings
                  </a>
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <button className="mobile-menu-btn text-gray-950 bg-blue-900" aria-label="Toggle menu" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Login Form Modal */}
      {isLoginFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg text-gray-950">
            <h2 className="text-2xl mb-4">Login</h2>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">
              Login
            </button>
            <button onClick={() => setIsSignupFormOpen(true)} className="bg-green-500 text-white py-2 px-4 rounded ml-2">
              Sign Up
            </button>
            <button onClick={() => setIsLoginFormOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Signup Form Modal */}
      {isSignupFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg ">
            <h2 className="text-2xl mb-4 text-gray-950">Sign Up</h2>
            {signupError && <p className="text-red-500">{signupError}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={fullNames}
              onChange={(e) => setFullNames(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950 "
            />
            <button onClick={handleSignup} className="bg-blue-500 text-white py-2 px-4 rounded">
              Sign Up
            </button>
            <button onClick={() => setIsLoginFormOpen(true)} className="bg-green-500 text-white py-2 px-4 rounded ml-2">
              Login
            </button>
            <button onClick={() => setIsSignupFormOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
