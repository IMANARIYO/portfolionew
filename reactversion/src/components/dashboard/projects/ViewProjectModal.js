import ProjectCard from "../../projects/ProjectCard";
import React from "react";
import { Modal } from "@mui/material";

const ViewProjectModal = ({ open, project, onClose }) => {
  if (!project) return null;
console.log("the details of project",project);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-20">
        <ProjectCard
          image={project.image}
          title={project.projectName
          }
          description={project.description}
          techUsed={project.languageUsed}
          company={project.company}
          githubLink={project.github}
          visitLink={project.projectLink
          }
        />
        <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewProjectModal;
