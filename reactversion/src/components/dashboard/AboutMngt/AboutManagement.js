import EducationTableModule from "./EducationTable";
import ExperienceTableModule from "./ExperienceTable";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { education, experience, skills } from "../../data/about";

// import SkillsTableModule from "./SkillsTableModule";

const ProfileManagementModule = () => {
  const [skillsData, setSkillsData] = useState(
    skills.frontend.concat(
      skills.backend,
      skills.databases,
      skills.mobile,
      skills.uiux
    )
  )
  const [educationData, setEducationData] = useState(education)
  const [experienceData, setExperienceData] = useState(experience)

  return (
    <Box className='bg-white p-4 rounded-md shadow-md'>
      <Typography variant='h4'>Profile Management</Typography>
      {/* <SkillsTableModule
        skillsData={skillsData}
        setSkillsData={setSkillsData}
      /> */}
      <EducationTableModule
        educationData={educationData}
        setEducationData={setEducationData}
      />SkillsTableModule
      <ExperienceTableModule
        experienceData={experienceData}
        setExperienceData={setExperienceData}
      />
    </Box>
  )
}

export default ProfileManagementModule
