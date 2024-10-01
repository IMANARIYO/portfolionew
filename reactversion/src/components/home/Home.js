import "./Home.css";
import React, { useEffect, useState } from "react";

const Home = () => {
  const roles = [
    'Full Stack Developer',
    'Mobile App Developer',
    'Web Developer'
  ];
  const [currentRole, setCurrentRole] = useState(roles[0]);
  let index = 0;

  // Function to cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % roles.length;
      setCurrentRole(roles[index]);
    }, 2000); // Change role every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [roles]);

  return (
    <section id="home" className="section">
      <div className="container content-container">
        <div className="home-container">
          <div className="home-content">
            <h4 className="welcome-text">Welcome to My Digital Space</h4>
            <h1 className="name-intro">
              Hi, I'm <span className="highlighted-name">Baptiste</span>
            </h1>
            <h2 className="role-intro">
              A <span className="dynamic-role">{currentRole}</span>
            </h2>
            <p className="intro-text">
              With a passion for crafting efficient, scalable web and mobile
              solutions, I specialize in bringing ideas to life through code.
              Whether it's optimizing backend processes or designing sleek,
              user-friendly interfaces, I ensure that every project exceeds
              expectations. Let’s collaborate to create something amazing.
            </p>
            <div className="lower_section">
              <div className="action-buttons">
                <a
                  href="https://res.cloudinary.com/dorjr1njc/image/upload/v1719239042/ivgn0cf7ai1bz2dafnfn.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  View My CV
                </a>
                <a href="#contacts" className="button">Hire Me</a>
              </div>
            </div>
          </div>
          <div className="home-image">
            <img src="images/myImage.png" alt="My Photo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
