import "./App.css";
import AboutMe from "./components/about/About";
import AdminRoute from "./AdminRoute";
import BlogSection from "./components/blog/BlogSection";
import BlogTable from "./components/dashboard/BlogsMngt/BlogsTable";
import ContactSection from "./components/contacts/Contact";
import ContactsManagementModule from "./components/dashboard/ContactsMngt/ContactsManagement";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardSummary from "./components/dashboard/DashboardSummary";
import EducationTableModule from "./components/dashboard/AboutMngt/EducationTable";
import ExperienceTableModule from "./components/dashboard/AboutMngt/ExperienceTable";
import Home from "./components/home/Home";
import Layout from "./Layout";
import LoginForm from "./components/userscomponent/Login";
import ProfileManagementModule from "./components/dashboard/AboutMngt/AboutManagement";
import ProjectTableModule from "./components/dashboard/ProjectsMngt/ProjectTable";
import ProjectsSection from "./components/projects/Projects";
import ServiceManagementModule from "./components/dashboard/ServicesMngt/ServiceManagement";
import Services from "./components/services/Services";
import SignupForm from "./components/userscomponent/signup";
import SkillsTableModule from "./components/dashboard/AboutMngt/SkillsTable";
import Testimonial from "./components/testimonies/Testimonial";
import TestimonialsMngt from "./components/dashboard/TestimonyMngt/Testimonialmngt";
import UsersManagement from "./components/dashboard/users/UsersManagement";
import { Login } from "@mui/icons-material";
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
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm/>} />

         {/* <Route
               path="/dashboard/*"
                element={
                    <Routes>
                      <Route path="/"  element={<DashboardLayout />}>
                      <Route index element={<DashboardSummary />} />
                      <Route path="projects" element={<ProjectTableModule />} />
                      <Route path="contacts" element={<ContactsManagementModule />} />
                      <Route path="services" element={<ServiceManagementModule />} />
                      <Route path="about" element={<AboutMe />} />
                      <Route path="testimonials" element={<TestimonialsMngt/>} />
                      <Route path="contacts" element={<ContactSection />} />
                      <Route path="skills" element={<SkillsTableModule />} />
                      <Route path="education" element={<EducationTableModule/>} />
                      <Route path="experience" element={<ExperienceTableModule />} />
                      <Route path="blogPostsManagement" element={<BlogTable />} />
                      <Route path="profile-management" element={<ProfileManagementModule />} />
                      <Route path="UsersManagement" element={<UsersManagement />} />
                      </Route>
                    
                  
                    </Routes>
                }
              /> */}
              <Route
        path="/dashboard/*"
        element={
          <AdminRoute> {/* Protect the dashboard routes */}
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardSummary />} />
                <Route path="projects" element={<ProjectTableModule />} />
                <Route path="contacts" element={<ContactsManagementModule />} />
                <Route path="services" element={<ServiceManagementModule />} />
                <Route path="about" element={<AboutMe />} />
                <Route path="testimonials" element={<TestimonialsMngt />} />
                <Route path="contacts" element={<ContactSection />} />
                <Route path="skills" element={<SkillsTableModule />} />
                <Route path="education" element={<EducationTableModule />} />
                <Route path="experience" element={<ExperienceTableModule />} />
                <Route path="blogPostsManagement" element={<BlogTable />} />
                <Route path="profile-management" element={<ProfileManagementModule />} />
                <Route path="UsersManagement" element={<UsersManagement />} />
              </Route>
            </Routes>
          </AdminRoute>
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
