import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const EditPost = () => {
  const { state } = useLocation();
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
      const updatePost = await axios.put(
        `http://localhost:5000/api/posts/${state.id}`,
        details,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
          },
        }
      );

      console.log("Ls");

      if (updatePost) {
        alert("Post Updated");
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="createPostDiv">
        <form className="createPostForm" onSubmit={handleSubmit}>
          <h1>Create a new Event</h1>
          <br />
          <div className="field">
            <label>Title: </label>
            <input
              type="text"
              name="title"
              defaultValue={state.title}
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
              defaultValue={state.body}
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
              defaultValue={state.picPath}
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
              defaultValue={state.duration}
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
              defaultValue={state.venue}
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
              defaultValue={moment(state.date).format("YYYY-MM-DDTkk:mm")}
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
    </>
  );
};

export default EditPost;
