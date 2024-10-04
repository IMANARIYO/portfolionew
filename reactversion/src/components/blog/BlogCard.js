import "./BlogSection.css";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const BlogCard = ({ post, onReadMore }) => {
  // Sanitize the title and description
  const sanitizedTitle = DOMPurify.sanitize(post.title).slice(0, 50); // Sanitize and limit length
  const sanitizedDescription = DOMPurify.sanitize(post.description).slice(0, 100); // Sanitize and limit length
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  return (
    <div className="blog-item">
      <div className="blog-image-wrapper">
        <img
          src={post.image}
          alt={`Blog Post: ${sanitizedTitle}`} // Use sanitized title for alt text
          className="blog-image"
        />
        <div className="blog-category-overlay">
          {post.category.slice(0, 60)}
        </div>
      </div>
      <div className="blog-content">
        <h3 className="blog-title ">{sanitizedTitle}</h3>

        {/* Render the sanitized description using dangerouslySetInnerHTML */}
        <div
          className="blog-excerpt"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description).slice(0, 100), // Safely render sanitized description
          }}
        ></div>

        <div className="blog-meta">
          <span className="blog-author">
            <img
              src={`${"/images/myImage.png"}`}
              alt="imanariyo baptiste"
              className="author-photo"
            />
          </span>
          <div className="authName-date">
            <span>{"imanariyo baptiste"}</span>
            <span className="blog-date">{timeAgo}</span> 
          </div>
          <button onClick={() => onReadMore(post)} className="blog-read-more">
            Read More
          </button>
        </div>
        <div className="blog-interactions">
          <span className="likes">{post.likes} Likes</span>
          <span className="dislikes">{post.dislikes} Dislikes</span>
          <span className="comments">{post.comments.length} Comments</span>
        </div>
      </div>
    </div>
  );
};

// Prop Types for validation
BlogCard.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
  onReadMore: PropTypes.func.isRequired,
};

export default BlogCard;
