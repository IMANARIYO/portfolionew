import "./About.css";
import React, { useEffect, useState } from "react";
import { education, experience, skills } from "../data/about";

// import { education } from "../data/about";

const AboutMe = () => {
  // Skills data structure


  // State for active skill category and active navigation button
  const [activeSkillCategory, setActiveSkillCategory] = useState('frontend');
  const [activeNavButton, setActiveNavButton] = useState('skills');

  // State for main image in the gallery
  const [mainImage, setMainImage] = useState('images/mythirdimg.jpg');
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // Event handler for skill navigation
  const handleSkillNav = (category) => {
    setActiveSkillCategory(category);
  };

  // Event handler for navigation buttons
  const handleNavButtonClick = (section) => {
    setActiveNavButton(section);
  };

  // Thumbnail click handler
  const handleThumbnailClick = (index, src) => {
    setActiveThumbnail(index);
    setMainImage(src);
  };

    // Define the sections that will automatically cycle
  const sections = ["skills", "education", "experience"];




  // Event handler for skill navigation
  return (
    <section id="about" className="section">
      <div className="container content-container">
        <h2 className="content-title">About Me</h2>
        <p className="content-subtitle">
          Ready to see what I can bring to your project?
          <a href="#skills" className="call-to-action-link"> Discover my skills</a>,
          <a href="#education" className="call-to-action-link"> review my education</a>,
          <a href="#experience" className="call-to-action-link"> check out my experience</a>.
          Let’s make great things happen together!
        </p>

        <div className="about-intro">
          <p className="introduction">
            Hi there! I’m Imanariyo BAPTISTE, a passionate and versatile developer with a keen interest in creating innovative web and mobile applications. I specialize in crafting seamless and engaging user experiences.
          </p>

          <div className="about-content">
            <div className="about-images gallery">
              <div className="big-image">
                <img src={mainImage} alt="Big Image" id="main-image" />
              </div>
              <div className="thumbnails">
                {['images/mythirdimg.jpg', 'images/mysecondimg.jpg', 'images/myImage.png'].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Image ${index + 1}`}
                    className={`thumbnail ${activeThumbnail === index ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index, src)}
                  />
                ))}
              </div>
            </div>

            <div className="about-info">
              <div className="about-nav">
                <button
                  id="skills-btn"
                  className={`nav-btn ${activeNavButton === 'skills' ? 'active-button' : ''}`}
                  onClick={() => handleNavButtonClick('skills')}
                >
                  Skills
                </button>
                <button
                  id="education-btn"
                  className={`nav-btn ${activeNavButton === 'education' ? 'active-button' : ''}`}
                  onClick={() => handleNavButtonClick('education')}
                >
                  Education
                </button>
                <button
                  id="experience-btn"
                  className={`nav-btn ${activeNavButton === 'experience' ? 'active-button' : ''}`}
                  onClick={() => handleNavButtonClick('experience')}
                >
                  Experience
                </button>
              </div>

              <div className="info-sections">
                {/* Skills Section */}
                {activeNavButton === 'skills' && (
                  <div className="info-section" id="skills">
                    <h3>Skills</h3>
                    <p>
                      As a Full Stack & Mobile App Developer, I possess a diverse skill set that allows me to tackle a wide range of projects. Here are some of the technologies and tools I'm proficient in:
                    </p>

                    {/* Skill Categories */}
                    <div className="skills-nav">
                      {Object.keys(skills).map((category) => (
                        <button
                          key={category}
                          className={`skills-nav-btn ${activeSkillCategory === category ? 'active' : ''}`}
                          onClick={() => handleSkillNav(category)}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Frontend Category */}
                    <div id="frontend" className={`category ${activeSkillCategory === 'frontend' ? 'active' : ''}`}>
                      <h3>Frontend</h3>
                      <div className="subcategory">
                        <h4>Web Development</h4>
                        <div className="skills-list">
                          {skills.frontend.map(skill => (
                            <div className="skill" key={skill.name}>
                           <i>{skill.icon}</i>
                              <span>{skill.name}</span>
                              <div className="skill-bar">
                                <div className="skill-level" style={{ width: skill.level }}></div>
                              </div>
                              <span className="skill-percentage">{skill.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Backend Category */}
                    <div id="backend" className={`category ${activeSkillCategory === 'backend' ? 'active' : ''}`}>
                      <h3>Backend</h3>
                      <div className="subcategory">
                        <h4>Server-Side Development</h4>
                        <div className="skills-list">
                          {skills.backend.map(skill => (
                            <div className="skill" key={skill.name}>
                           <i>{skill.icon}</i>
                              <span>{skill.name}</span>
                              <div className="skill-bar">
                                <div className="skill-level" style={{ width: skill.level }}></div>
                              </div>
                              <span className="skill-percentage">{skill.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Databases Category */}
                    <div id="databases" className={`category ${activeSkillCategory === 'databases' ? 'active' : ''}`}>
                      <h3>Databases</h3>
                      <div className="subcategory">
                        <h4>Database Management</h4>
                        <div className="skills-list">
                          {skills.databases.map(skill => (
                            <div className="skill" key={skill.name}>
                              {/* <i className={skill.icon}> <{skill.icon}/></i> */}
                           <i>{skill.icon}</i>
                              <span>{skill.name}</span>
                              <div className="skill-bar">
                                <div className="skill-level" style={{ width: skill.level }}></div>
                              </div>
                              <span className="skill-percentage">{skill.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Category */}
                    <div id="mobile" className={`category ${activeSkillCategory === 'mobile' ? 'active' : ''}`}>
                      <h3>Mobile Development</h3>
                      <div className="subcategory">
                        <h4>Mobile App Development</h4>
                        <div className="skills-list">
                          {skills.mobile.map(skill => (
                            <div className="skill" key={skill.name}>
                           <i>{skill.icon}</i>
                              <span>{skill.name}</span>
                              <div className="skill-bar">
                                <div className="skill-level" style={{ width: skill.level }}></div>
                              </div>
                              <span className="skill-percentage">{skill.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* UI/UX Category */}
                    <div id="uiux" className={`category ${activeSkillCategory === 'uiux' ? 'active' : ''}`}>
                      <h3>UI/UX Design</h3>
                      <div className="subcategory">
                        <h4>Design Tools</h4>
                        <div className="skills-list">
                          {skills.uiux.map(skill => (
                            <div className="skill" key={skill.name}>
                           <i>{skill.icon}</i>
                              <span>{skill.name}</span>
                              <div className="skill-bar">
                                <div className="skill-level" style={{ width: skill.level }}></div>
                              </div>
                              <span className="skill-percentage">{skill.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    
                  </div>
                )}

                {/* Education Section */}
                {activeNavButton === 'education' && (
                  <div className="info-section" id="education">
                    <h3 className="section-title">Education</h3>
                    {education.map(edu => (
                      <div className="education-item" key={edu.institution}>
                        <img src={edu.logo} alt={`${edu.institution} Logo`} className="institution-logo" />
                        <h4>{edu.degree}</h4>
                        <span className="education-institution">{edu.institution}</span>
                        <span className="education-duration">{edu.duration}</span>
                        <p>{edu.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience Section */}
                {activeNavButton === 'experience' && (
                  <div className="info-section" id="experience">
                    <h3 className="section-title">Experience</h3>
                    {experience.map(exp => (
                      <div className="experience-item" key={exp.position}>
                        <img src={exp.logo} alt={`${exp.company} Logo`} className="company-logo" />
                        <h4>{exp.position}</h4>
                        <span className="experience-company">{exp.company}</span>
                        <span className="experience-duration">{exp.duration}</span>
                        <p>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
