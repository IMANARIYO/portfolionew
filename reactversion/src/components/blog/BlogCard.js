import PropTypes from "prop-types";
import React from "react";

// import "./BlogCard.css";

const BlogCard = ({ post }) => {
  return (
    <div className="blog-item">
      <div className="blog-image-wrapper">
        <img
          src={post.image}
          alt={`Blog Post: ${post.title}`}
          className="blog-image"
        />
        <div className="blog-category-overlay">{post.category}</div>
      </div>
      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-meta">
          <span className="blog-author">
            <img
              src={post.authorImage}
              alt="Author"
              className="author-photo"
            />
          </span>
          <div className="authName-date">
            <span>{post.author}</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <a href={post.readMoreLink} className="blog-read-more">
            Read More
          </a>
        </div>
        <div className="blog-interactions">
          <span className="likes">{post.likes} Likes</span>
          <span className="dislikes">{post.dislikes} Dislikes</span>
          <span className="comments">{post.comments} Comments</span>
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
    excerpt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readMoreLink: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }).isRequired,
};

export default BlogCard;
