import React from "react";

import"./Contact.css";
const ContactSection = () => {
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
            <form id="contactForm">
              <div className="form-group">
                <input type="text" id="name" name="name" required placeholder="Your Name" />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" required placeholder="Your Email" />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className="form-group">
                <input type="tel" id="telphone" name="telphone" required placeholder="Telephone" />
                <label htmlFor="telphone">Telephone</label>
              </div>
              <div className="form-group">
                <input type="text" id="subject" name="subject" required placeholder="Subject" />
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows="6" required placeholder="Message"></textarea>
                <label htmlFor="message">Message</label>
              </div>
              <button type="submit" className="btn-submit">Contact Me Now</button>
            </form>
            <p className="urgent-message">
              <strong>Don't hesitate!</strong> Every second you wait could be a missed opportunity to take your business to the next level. Let's talk and create your success story today.
            </p>
          </div>

          {/* Right Contact (Social Media, Contact Info, and Map) */}
          <div className="right-contact">
            <div className="upper-section">
              {/* Social Media and Contact Info */}
              <div className="holder">
                <h3 className="contact-title">Connect with Me</h3>
                <p>
                  Prefer reaching out through social media or direct contact? Find me on your favorite platform:
                </p>
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
              <p>
                Want to meet in person? Find me below and let's schedule a face-to-face meeting.
              </p>
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
