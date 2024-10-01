import EducationTable from "./EducationTable";
import ExperienceTable from "./ExperienceTable";
import React, { useState } from "react";
import SkillsTable from "./SkillsTable";
import { Box, Typography } from "@mui/material";
import { education, experience, skills } from "../../data/about";

const ProfileManagement = () => {
    const [skillsData, setSkillsData] = useState(skills.frontend.concat(skills.backend, skills.databases, skills.mobile, skills.uiux));
    const [educationData, setEducationData] = useState(education);
    const [experienceData, setExperienceData] = useState(experience);

    return (
        <Box className='bg-white p-4 rounded-md shadow-md'>
            <Typography variant="h4">Profile Management</Typography>
            <SkillsTable skillsData={skillsData} setSkillsData={setSkillsData} />
            <EducationTable educationData={educationData} setEducationData={setEducationData} />
            <ExperienceTable experienceData={experienceData} setExperienceData={setExperienceData} />
        </Box>
    );
};

export default ProfileManagement;
