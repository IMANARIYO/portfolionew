import { BsFiletypeScss } from "react-icons/bs";
import { DiPostgresql } from "react-icons/di";
import { FaFigma, FaJs, FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { PiFileCssDuotone } from "react-icons/pi";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb, SiMysql } from "react-icons/si";
import { TbBrandFlutter, TbHtml, TbSql } from "react-icons/tb";

// Skills data
export const skills = {
  frontend: [
    { id: 1, name: 'CSS', level: '85%', icon: <PiFileCssDuotone />, category: 'Frontend' },
    { id: 2, name: 'Tailwind CSS', level: '80%', icon: <RiTailwindCssFill />, category: 'Frontend' }, 
    { id: 3, name: 'SCSS', level: '75%', icon: <BsFiletypeScss />, category: 'Frontend' },
    { id: 4, name: 'HTML5', level: '90%', icon: <TbHtml />, category: 'Frontend' },
    { id: 5, name: 'React', level: '75%', icon: <FaReact />, category: 'Frontend' },
    { id: 6, name: 'JavaScript', level: '80%', icon: <FaJs />, category: 'Frontend' },
  ],
  backend: [
    { id: 7, name: 'Node.js', level: '75%', icon: <FaNodeJs />, category: 'Backend' },
    { id: 8, name: 'PHP', level: '60%', icon: <FaPhp />, category: 'Backend' },
    { id: 9, name: 'Java', level: '65%', icon: <FaJava />, category: 'Backend' },
    { id: 10, name: 'Laravel', level: '65%', icon: <FaLaravel />, category: 'Backend' },
  ],
  databases: [
    { id: 11, name: 'MySQL', level: '85%', icon: <SiMysql />, category: 'Databases' },
    { id: 12, name: 'PostgreSQL', level: '85%', icon: <DiPostgresql />, category: 'Databases' },
    { id: 13, name: 'MongoDB', level: '75%', icon: <SiMongodb />, category: 'Databases' },
    { id: 14, name: 'SQL Server', level: '70%', icon: <TbSql />, category: 'Databases' },
  ],
  mobile: [
    { id: 15, name: 'React Native', level: '80%', icon: <FaReact />, category: 'Mobile' },
    { id: 16, name: 'Flutter', level: '70%', icon: <TbBrandFlutter />, category: 'Mobile' },
  ],
  uiux: [
    { id: 17, name: 'Figma', level: '80%', icon: <FaFigma />, category: 'UI/UX' },
  ],
};

// Education data
export const education = [
    {
      id: 1,
      institution: 'University of Rwanda, College of Science and Technology',
      degree: 'Bachelor of Science in Computer and Software Engineering',
      duration: '2021 - 2025 (Expected)',
      description: 'Currently in my final year, I have gained solid expertise in software engineering, excelling in both front-end and back-end development. My academic journey has equipped me with the most essential skills needed in the industry, such as building responsive web applications and high-performance systems. As graduation nears, I am eager to bring these skills to real-world projects.',
      logo: '/images/university_of_rwanda.png',
    },
    {
      id: 2,
      institution: 'Sumba Secondary School',
      degree: 'Secondary Education',
      duration: '2013 - 2019',
      description: 'Completed my secondary education with a focus on science and technology, forming a solid foundation for my career in software engineering.',
      logo: '/images/sumbalogo.png',
    },
];

// Experience data
export const experience = [
    {
      id: 1,
      company: 'kLab Rwanda',
      position: 'Back-End Developer Intern (Full-time)',
      duration: 'August 2023 - December 2023',
      description: 'As a back-end developer, I played a key role in designing and maintaining web applications, which significantly enhanced the performance and scalability of the company\'s solutions.',
      logo: '/images/klab.png',
    },
    {
      id: 2,
      company: 'Rwanda ICT Chamber',
      position: 'Full Stack Engineer Apprentice (Hybrid)',
      duration: 'April 2024 - June 2024',
      description: 'As a full-stack engineer, I was responsible for both front-end and back-end development, helping the company deliver seamless, user-friendly applications.',
      logo: '/images/rwandaIctchamber.png',
    },
    {
      id: 3,
      company: 'Iraady Ltd',
      position: 'Front-End Developer (Remote)',
      duration: 'May 2024 - Present',
      description: 'In this remote role, I worked as a front-end developer, designing and optimizing user interfaces for multiple web applications.',
      logo: '/images/iraady.png',
    },
    {
      id: 4,
      company: 'Algorithm Inc. (Ishyiga Software)',
      position: 'Full-Stack Developer Intern (Full-Time)',
      duration: 'July 2024 - Present',
      description: 'At Algorithm Inc., I contributed as a full-stack developer, where my focus on both the front-end and back-end development ensured the successful delivery of projects.',
      logo: '/images/ishyiga.png',
    },
];
