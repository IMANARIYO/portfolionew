import "./BlogSection.css";
import BlogCard from "./BlogCard";
import React from "react";
import { blogPosts } from "../data/blogs";

const BlogSection = () => {
  return (
    <section id="blog" className="section">
      <div className="container content-container">
        <h2 className="content-title">MY Blog</h2>
        <p className="content-subtitle">
          Stay updated with the latest insights, trends, and stories from MY team.
        </p>

        {/* Blog Cards Container */}
        <div className="blog-container">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
