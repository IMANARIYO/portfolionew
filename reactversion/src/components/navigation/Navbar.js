import "./Navbar.css";
import React, { useEffect, useState } from "react";
import { FaBars, FaComments, FaConciergeBell, FaEnvelope, FaFolderOpen, FaHome, FaSignInAlt, FaSignOutAlt, FaTimes, FaUser, FaUserCircle } from "react-icons/fa";

// src/components/Navbar.js

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  // Simulated user state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // For dropdown menu

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false); // Close the dropdown on logout
  };

  // Menu items
  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonial', href: '#testimonial' },
    { name: 'Contacts', href: '#contacts' },
  ];

  // Authentication items
  const authItems = [
    { name: 'Profile', action: () => setShowProfileMenu(!showProfileMenu) },
    { name: 'Logout', action: handleLogout },
  ];

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Function to handle scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    menuItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveItem(item.name);
        }
      }
    });

    setIsScrolled(scrollPosition > 50);
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to close profile menu
  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src="/images/myImage.png" alt="IMANARIYO Baptiste" />
        <span>IMANARIYO Baptiste</span>
      </div>
      <div className={`menu ${isMobileMenuOpen ? 'show' : ''}`}>
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className={`menu-item ${activeItem === item.name ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            {item.name}
          </a>
        ))}
        
        {/* Render authentication-related items */}
        <div className="menu-item auth-menu">
          {!isLoggedIn ? (
            <>
              <a 
                href="#"
                className="menu-item"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleLogin(); // Simulate login
                  closeMobileMenu(); // Close the mobile menu on click
                }}
              >
                <FaSignInAlt /> Login
              </a>
              <a 
                href="#"
                className="menu-item"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleLogin(); // Simulate signup
                  closeMobileMenu(); // Close the mobile menu on click
                }}
              >
                <FaUser /> Signup
              </a>
            </>
          ) : (
            <>
              <div className="menu-item profile-item" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <FaUserCircle /> Profile
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <a href="#settings" onClick={() => { closeProfileMenu(); closeMobileMenu(); }}>Settings</a>
                  <a href="dashboard" onClick={() => { closeProfileMenu(); closeMobileMenu(); }}>Dashboard</a>
                  <a href="#notifications" onClick={() => { closeProfileMenu(); closeMobileMenu(); }}>Notifications</a>
                  <a href="#orders" onClick={() => { closeProfileMenu(); closeMobileMenu(); }}>Orders</a>
                  <a href="#messages" onClick={() => { closeProfileMenu(); closeMobileMenu(); }}>Messages</a>
                  <a href="#help" onClick={() => { closeProfileMenu(); closeMobileMenu(); }}>Help</a>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <button 
        className="mobile-menu-btn" 
        aria-label="Toggle menu" 
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
