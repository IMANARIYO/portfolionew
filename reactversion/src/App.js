import "./App.css";
import AboutMe from "./components/about/About";
import BlogSection from "./components/blog/BlogSection";
import BlogTable from "./components/dashboard/blogs/BlogsTable";
import ContactSection from "./components/contacts/Contact";
import ContactsManagement from "./components/dashboard/contact/ContactsManagement";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardSummary from "./components/dashboard/DashboardSummary";
import EducationTable from "./components/dashboard/about/EducationTable";
import ExperienceTable from "./components/dashboard/about/ExperienceTable";
import Home from "./components/home/Home";
import Layout from "./Layout";
import ProfileManagement from "./components/dashboard/about/AboutManagement";
import ProjectTable from "./components/dashboard/projects/ProjectTable";
import ProjectsSection from "./components/projects/Projects";
import ServiceManagement from "./components/dashboard/service/ServiceManagement";
import Services from "./components/services/Services";
import SkillsTable from "./components/dashboard/about/SkillsTable";
import Testimonial from "./components/testimonies/Testimonial";
import TestimonialsMngt from "./components/dashboard/testimony/Testimonialmngt";
import UsersManagement from "./components/dashboard/users/UsersManagement";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Layout for Landing Page */}
        <Route path="/" element={<Layout />}>
          {/* Default route for landing page */}
          <Route
            index
            element={
              <>

                <Home />
                <AboutMe />
                <ProjectsSection />
                <Services />
                <Testimonial />
                <BlogSection />
                <ContactSection />
              </>
            }
          />
        </Route>
         <Route
               path="/dashboard/*"
                element={
                    <Routes>
                      <Route path="/"  element={<DashboardLayout />}>
                      <Route index element={<DashboardSummary />} />
                      <Route path="projects" element={<ProjectTable />} />
                      <Route path="contacts" element={<ContactsManagement />} />
                      <Route path="services" element={<ServiceManagement />} />
                      <Route path="about" element={<AboutMe />} />
                      <Route path="testimonials" element={<TestimonialsMngt/>} />
                      <Route path="contacts" element={<ContactSection />} />
                      <Route path="skills" element={<SkillsTable />} />
                      <Route path="education" element={<EducationTable />} />
                      <Route path="experience" element={<ExperienceTable />} />
                      <Route path="blogPostsManagement" element={<BlogTable />} />
                      <Route path="profile-management" element={<ProfileManagement />} />
                      <Route path="UsersManagement" element={<UsersManagement />} />
                      </Route>
                    
                  
                    </Routes>
                }
              />
      </Routes>
    </Router>
  );
}

export default App;
