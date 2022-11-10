import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    title: "",
    body: "",
    picPath: "",
    duration: "",
    venue: "",
    date: "",
  });

  const handleChange = (e) => {
    const newDetails = { ...details };
    newDetails[e.target.name] = e.target.value;
    setDetails(newDetails);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const createPost = await axios.post(
        "http://localhost:5000/api/posts/",
        details,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
          },
        }
      );

      if (createPost) {
        alert("Posted!!");
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <div className="createPostDiv">
      <form className="createPostForm" onSubmit={handleSubmit}>
        <h1>Create a new Event</h1>
        <br />
        <div className="field">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="field">
          <label>Body: </label>
          <textarea
            id="body"
            name="body"
            rows="4"
            cols="50"
            onChange={handleChange}
          ></textarea>
        </div>
        <br />
        <div className="field">
          <label>Upload Poster: </label>
          <input
            type="text"
            name="picPath"
            placeholder="Enter pic path"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="field">
          <label>Duration: </label>
          <input
            type="text"
            name="duration"
            placeholder="Enter duration"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="field">
          <label>Venue: </label>
          <input
            type="text"
            name="venue"
            placeholder="Enter venue"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="field">
          <label>Date: </label>
          <input
            type="datetime-local"
            name="date"
            placeholder="Enter title"
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="field">
          <input type="submit" name="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
