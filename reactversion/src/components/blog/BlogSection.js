import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../apirequest/blogApi";
import { blogPosts } from "../data/blogs";

const initial=blogPosts;
const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null); // State to manage the selected post
  const [blogPosts, setBlogs] = useState(initial); // State to hold the fetched blogs
  const [loading, setLoading] = useState(true); // To manage loading state
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs(); // Fetching data from API
        setBlogs(response.data); // Set the blogs to the response data
   
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false); // Turn off loading
      }
    };

    fetchBlogs(); // Fetch the blogs when component mounts
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>; // Display loading indicator
  }
  const handleReadMore = (post) => {
    setSelectedPost(post); // Set the selected post
  };

  const handleCloseModal = () => {
    setSelectedPost(null); // Close the modal
  };

  return (
    <section id="blog" className="section ">
      <div className="container content-container ">
        <h2 className="content-title">MY Blog</h2>
        <p className="content-subtitle">
          Stay updated with the latest insights, trends, and stories from MY team.
        </p>

        {/* Blog Cards Container */}
        <div className="blog-container">
          {blogPosts.map((post) => (
            <BlogCard key={post._id} post={post} onReadMore={handleReadMore} />
          ))}
          
        </div>
      </div>
      {selectedPost && (
        <BlogModal post={selectedPost} handleClose={handleCloseModal} props={selectedPost}  onReadMore={handleReadMore} />
      )}
    </section>
  );
};

export default BlogSection;
