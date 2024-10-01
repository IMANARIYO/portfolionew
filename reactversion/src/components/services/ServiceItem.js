import React from "react";

const ServiceItem = ({ image, alt, title, description, overlayTitle, overlayDescription, overlayLink }) => {
  return (
    <div className="service-item">
      <div className="service-image-wrapper">
        <img src={image} alt={alt} />
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="service-overlay">
          <h3>{overlayTitle}</h3>
          <p>{overlayDescription}</p>
          <a href="#contacts" className="learn-more">{overlayLink}</a>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
