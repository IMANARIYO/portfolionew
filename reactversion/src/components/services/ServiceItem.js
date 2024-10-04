import DOMPurify from "dompurify";
import React from "react";

const ServiceItem = ({
  image,
  alt,
  title = "<strong>Service Title</strong>",  // Default HTML for testing
  description = "<em>Description with emphasis.</em>", // Default HTML for testing
  overlayTitle = "<h4>Overlay Title</h4>",  // Default HTML for testing
  overlayDescription = "<p>Overlay Description.</p>", // Default HTML for testing
  overlayLink
}) => {
  return (
    <div className="service-item">
      <div className="service-image-wrapper">
        <img src={image} alt={alt} />
      </div>
      <div className="service-content">
        <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }} />
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
        <div className="service-overlay">
          <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(overlayTitle) }} />
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(overlayDescription) }} />
          <a href="#contacts" className="learn-more">{overlayLink}</a>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
