import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import api from "../../apirequest/api";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BlogModal({ handleClose, props }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);
  const [likes, setLikes] = useState(props?.likes);
  const [dislikes, setDislikes] = useState(props?.dislikes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNames, setFullNames] = useState(""); // State for full names

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchComments();
    checkLikedStatusAndCheckDisLikedStatus();
  }, [props]);

  const checkLikedStatusAndCheckDisLikedStatus = async () => {

    if (!accessToken) return;
    try {
      const response = await api.get(
        `/Blogs/getBlog/${props._id}`
        
      );
      setLiked(response.data.data.likedBy.includes(userId));
      setDisLiked(response.data.data.dislikedBy.includes(userId));
    } catch (error) {
      console.error("Error checking liked status:", error);
    }
  };

  const handleliking = async () => {
    if (!accessToken) {
      alert("Please log in to like.");
      toggleLoginForm();
      return;
    }
    try {
      const response = await api.post(
        `/Blogs/likeBlog/${props._id}`,
        {},
       
      );
      alert(response.data.message);
      setLiked(true);
      if (response.data.success) setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking blog:", error);
      alert("An error occurred while liking the blog.");
    }
  };

  const handleDislike = async () => {
    if (!accessToken) {
      alert("Please log in to dislike.");
      toggleLoginForm();
      return;
    }
    try {
      const response = await api.post(
        `/Blogs/dislikeBlog/${props._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert(response.data.message);
      setDisLiked(true);
      if (response.data.success) setDislikes(dislikes + 1);
    } catch (error) {
      console.error("Error disliking blog:", error);
      alert("An error occurred while disliking the blog.");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(
        `/comments/${props._id}`
      );
      const sortedComments = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log("the acees token is",accessToken);
    if (!accessToken) {
      alert("Please log in to comment.");
      toggleLoginForm();
      return;
    }

    try {
      const response = await api.post(
        `/comments/${props._id}`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Comment submitted successfully!");
      fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
    setIsSignupFormOpen(false); // Close signup form if it's open
  };

  const toggleSignupForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
    setIsLoginFormOpen(false); // Close login form if it's open
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = 'https://myportfolioapi-8vku.onrender.com';
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      const data = response.data;

      // Check response status
      if (response.status === 200) {
        toast.success('Login successful!'); 
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsLoginFormOpen(false)
      } else {
        // Handle error from server response
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Wrong user or password.');
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }
    try {
      const response = await api.post(
        "/auth/signup",
        { fullNames,
          email,
          password,
        }
      );
      alert("Signup successful! You can now log in.");
      toggleSignupForm(); // Close signup form after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      setSignupError("Signup failed. Please try again.");
    }
  };

  const mapingusersandcomments = (comment) => {
    let user = comment.user;

    for (let i = 0; i < props.commentedBy.length; i++) {
      if (props.commentedBy[i]._id === user) {
        return (
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={props?.commentedBy[i]?.image}
            alt="User Profile"
          />
        );
      }
    }
  };

  const { image, title, description, views } = props || {};

  return (
    <div className="flex justify-center items-center bg-black bg-opacity-50 fixed inset-0 top-0 left-0 right-0 bottom-0 z-50">
      <div
        className="relative bg-white p-5 max-w-4xl w-full max-h-full overflow-y-auto rounded-lg shadow-lg top-12 pb-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={handleClose}
            className="bg-green-600 p-2 rounded-full text-2xl"
          >
            <FaRegWindowClose />
          </button>
        </div>

        <img
          className="w-full h-auto rounded-xl"
          src={image}
          alt="Blog main image"
        />

        <h1 className="text-3xl text-gray-800 font-bold mt-4">{title}</h1>

        {/* Sanitize the description before rendering it */}
        <div
          className="mt-2 text-lg text-gray-800 italic"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        ></div>

        <div className="flex gap-4 mt-4">
          <button className="flex items-center gap-2 bg-gray-500 p-2 rounded-md">
            Views <AiOutlineEye />: {views}
          </button>
          <button
            className={`flex items-center gap-2 bg-blue-500 text-gray-800 p-2 rounded-md ${
              liked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleliking}
            disabled={liked}
          >
            <FiThumbsUp /> Likes: {likes}
          </button>
          <button
            className={`flex items-center gap-2 bg-red-500 text-gray-800 p-2 rounded-md ${
              disliked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDislike}
            disabled={disliked}
          >
            <FiThumbsDown /> Dislikes: {dislikes}
          </button>
        </div>

        <div id="comments" className="mt-6">
          <h2 className="text-2xl font-bold mb-4">{comments.length} Comments</h2>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              className="border border-gray-300 p-2 w-full rounded text-gray-700"
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
            >
              Submit Comment
            </button>
          </div>

          <div>
            {comments.map((comment) => (
              <div
                className="border border-gray-300 p-2 mb-2 rounded"
                key={comment._id}
              >
                {mapingusersandcomments(comment)}
                <div>
                  <strong className="block text-black">{comment.username}:</strong>
                  <p className="text-black">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Login Form */}
      {isLoginFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-2xl mb-4 text-gray-950">Login</h2>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <input
          
              type="email"
              placeholder="Email"
              value={email}
              title="enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="border text-gray-950 border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="password"
              title="enter your password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-950 p-2 mb-4 w-full rounded text-gray-950"
            />
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              onClick={toggleSignupForm}
              className="bg-green-500 text-white py-2 px-4 rounded ml-2"
            >
              Sign Up
            </button>
            <button
              onClick={toggleLoginForm}
              className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Embedded Signup Form */}
      {isSignupFormOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
    <div className="bg-slate-950 p-5 rounded shadow-lg">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {signupError && <p className="text-red-500">{signupError}</p>}
      <input
        type="text"
        placeholder="Full Name"
        value={fullNames}
        onChange={(e) => setFullNames(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-full text-gray-950 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-full text-gray-950 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 text-gray-950 mb-4 w-full rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border border-gray-300 text-gray-950 p-2 mb-4 w-full rounded"
      />
      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Sign Up
      </button>
      <button
        onClick={toggleLoginForm}
        className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
      >
        Back to Login
      </button>
      <button
        onClick={toggleSignupForm}
        className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default BlogModal;
