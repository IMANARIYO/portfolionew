import React from "react";

const ProjectCard = ({ image, title, description, techUsed, company, githubLink, visitLink }) => {
  console.log("ProjectCard props:", { image, title, description, techUsed, company, githubLink, visitLink });
  return (
    <div className="project-item" data-tech={techUsed}>
      <img src={image} alt={title} className="project-image" />
      <div className="project-title-bar">
        <h3 className="project-title">{title}</h3>
      </div>
      <div className="project-overlay">
        <p className="project-description">{description}</p>
        <p className="project-tech">Tech Used: {techUsed}</p>
        <p className="project-company">Developed for: {company}</p>
        <div className="project-links">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link github-link">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href={visitLink} target="_blank" rel="noopener noreferrer" className="project-link visit-link">
            <i className="fas fa-external-link-alt"></i> Visit Site
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
