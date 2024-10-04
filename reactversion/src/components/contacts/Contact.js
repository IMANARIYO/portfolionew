import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://myportfolioapi-8vku.onrender.com/contact/createContact', data);

      if (response.data.status === "success") {
        toast.success("Your message has been sent successfully!");
        reset(); // reset form after successful submission
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    }
  };

  return (
    <section id="contacts" className="section">
      <div className="container content-container">
        {/* Contact Header */}
        <div className="contact-header text-center">
          <h2 className="content-title">Get in Touch Now</h2>
          <p className="content-subtitle">
            Your success starts with a conversation. Whether it’s a new project, technical support, or consultation, I’m here to help. 
            <strong className="warning">Don’t wait—every moment counts!</strong>
          </p>
        </div>

        {/* Contact Wrapper */}
        <div className="contact-wrapper">
          {/* Left Contact (Contact Form) */}
          <div className="left-contact contact-form">
            <h3 className="contact-form-title">Start a Conversation</h3>
            <p className="contact-subtitle">
              The best time to act is now. Send me a message and let’s get started on creating something great together.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="message text-gray-900"
                  {...register("name", { required: "Name is required.", minLength: { value: 2, message: "Name must be at least 2 characters long." } })}
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="message text-gray-900"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." }
                  })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              {/* Telephone */}
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Telephone"
                  className="message text-gray-900"
                  {...register("telephone", {
                    required: "Telephone is required.",
                    pattern: { value: /^\+?\d{7,15}$/, message: "Please enter a valid telephone number." }
                  })}
                />
                {errors.telephone && <p className="error-message">{errors.telephone.message}</p>}
              </div>

              {/* Subject */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                  className="message text-gray-900"
                  {...register("subject", { required: "Subject is required." })}
                />
                {errors.subject && <p className="error-message">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div className="form-group">
                <textarea
                  placeholder="Message"
                  rows="6"
                  className="message text-gray-900"
                  {...register("message", { required: "Message is required.", minLength: { value: 10, message: "Message must be at least 10 characters long." } })}
                ></textarea>
                {errors.message && <p className="error-message">{errors.message.message}</p>}
              </div>

              <button type="submit" className="btn-submit">Contact Me Now</button>
            </form>
          </div>

          {/* Right Contact (Social Media, Contact Info, and Map) */}
          <div className="right-contact">
            {/* Social Media and Contact Info */}
            <div className="upper-section">
              <div className="holder">
                <h3 className="contact-title">Connect with Me</h3>
                <p>Prefer reaching out through social media or direct contact? Find me on your favorite platform:</p>
                <div className="social-links">
                  <a href="https://twitter.com/Imanariyob" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                  <a href="https://wa.me/250787795163" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                    <i className="fab fa-whatsapp"></i> WhatsApp
                  </a>
                  <a href="https://www.linkedin.com/in/imanariyo-baptiste-046191286" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </div>
              </div>

              <div className="holder">
                <h3 className="contact-title">Direct Contact Information</h3>
                <p>Need an immediate response? Call or email me directly:</p>
                <div className="contact-links">
                  <a href="mailto:imanariyobaptiste@gmail.com" className="contact-icon email">
                    <i className="fas fa-envelope"></i> imanariyobaptiste@gmail.com
                  </a>
                  <a href="tel:+250787795163" className="contact-icon phone">
                    <i className="fas fa-phone"></i> +250787795163
                  </a>
                </div>
              </div>
            </div>

            {/* Lower Section (Map) */}
            <div className="lower-section contact-map">
              <h3 className="contact-map-title">Find Me Here</h3>
              <p>Want to meet in person? Find me below and let's schedule a face-to-face meeting.</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4078.3357960016288!2d30.061278236037268!3d-1.957860213369754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5d5b9897711%3A0x34e7b1e5cded7867!2sUR%20College%20of%20Science%20and%20Technology!5e0!3m2!1sen!2srw!4v1725029956505!5m2!1sen!2srw"
                width="100%"
                height="80%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
