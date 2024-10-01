import React, { useState } from "react";
import { Box, Button, Input, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BsFiletypeScss } from "react-icons/bs";
import { DiPostgresql } from "react-icons/di";
import { FaFigma, FaJava, FaJs, FaLaravel, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";
import { PiFileCssDuotone } from "react-icons/pi";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb, SiMysql } from "react-icons/si";
import { TbBrandFlutter, TbHtml, TbSql } from "react-icons/tb";
import { skills } from "../../data/about";

// Import specific icons from react-icons

const SkillsTable = () => {
    const [skillsData, setSkillsData] = useState([
        ...skills.frontend, ...skills.backend, ...skills.databases, ...skills.mobile, ...skills.uiux
    ]);
    const [filteredSkills, setFilteredSkills] = useState(skillsData);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Icon options for selection
    const iconOptions = {
        "CSS": <PiFileCssDuotone />,
        "Tailwind CSS": <RiTailwindCssFill />,
        "SCSS": <BsFiletypeScss />,
        "HTML5": <TbHtml />,
        "React": <FaReact />,
        "JavaScript": <FaJs />,
        "Node.js": <FaNodeJs />,
        "PHP": <FaPhp />,
        "Java": <FaJava />,
        "Laravel": <FaLaravel />,
        "MySQL": <SiMysql />,
        "PostgreSQL": <DiPostgresql />,
        "MongoDB": <SiMongodb />,
        "SQL Server": <TbSql />,
        "React Native": <FaReact />,
        "Flutter": <TbBrandFlutter />,
        "Figma": <FaFigma />
    };

    const handleOpenModal = (item) => {
        setCurrentItem(item || { id: Date.now(), name: "", level: "", category: "", icon: "" });
        setIsEditing(!!item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentItem(null);
    };

    const handleSave = () => {
        if (isEditing) {
            setSkillsData(skillsData.map((skill) => (skill.id === currentItem.id ? currentItem : skill)));
        } else {
            setSkillsData([...skillsData, { ...currentItem, id: Date.now() }]);
        }
        setFilteredSkills(skillsData);
        handleCloseModal();
    };

    const handleDelete = (itemId) => {
        const updatedSkills = skillsData.filter((skill) => skill.id !== itemId);
        setSkillsData(updatedSkills);
        setFilteredSkills(updatedSkills);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = skillsData.filter(skill =>
            skill.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            skill.category.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredSkills(filtered);
    };

    const columns = [
        {
            field: "icon",
            headerName: "Icon",
            width: 100,
            renderCell: (params) => (
                <span>{params.row.icon}</span>
            ),
        },
        { field: "name", headerName: "Skill", width: 200 },
        { field: "level", headerName: "Level", width: 100 },
        { field: "category", headerName: "Category", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleOpenModal(params.row)}>Edit</Button>
                    <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h6">Skills Table</Typography>
            
            <Input 
                placeholder="Search by Skill or Category" 
                value={searchTerm} 
                onChange={handleSearch} 
                fullWidth 
                margin="normal"
                style={{ marginBottom: '20px' }}
            />

            <Button onClick={() => handleOpenModal()} variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                Add Skill
            </Button>

            <DataGrid 
                rows={filteredSkills} 
                columns={columns} 
                pageSize={5} 
                className="bg-white"
            />

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: '100px auto', maxWidth: 400 }}>
                    <Typography variant="h6">{isEditing ? "Edit Skill" : "Add Skill"}</Typography>
                    <TextField 
                        label="Skill Name" 
                        value={currentItem?.name || ""} 
                        onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} 
                        fullWidth 
                        margin="normal" 
                    />
                    <TextField 
                        label="Level" 
                        value={currentItem?.level || ""} 
                        onChange={(e) => setCurrentItem({ ...currentItem, level: e.target.value })} 
                        fullWidth 
                        margin="normal" 
                    />
                    <TextField 
                        label="Category" 
                        value={currentItem?.category || ""} 
                        onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })} 
                        fullWidth 
                        margin="normal" 
                    />
                    <Typography>Select Icon</Typography>
                    <Select
                        value={currentItem?.icon || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, icon: iconOptions[e.target.value] })}
                        fullWidth
                    >
                        {Object.keys(iconOptions).map((key) => (
                            <MenuItem key={key} value={key}>
                                {iconOptions[key]} {key}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default SkillsTable;
