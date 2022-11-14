import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import moment from "moment";

const EditPost = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

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
    if (e.target.name === "picPath") {
      newDetails[e.target.name] = e.target.files[0];
    } else {
      newDetails[e.target.name] = e.target.value;
    }
    setDetails(newDetails);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(details);

      const newFormData = new FormData();

      newFormData.append("image", details.picPath);
      newFormData.append("postDetails", JSON.stringify(details));

      const editPost = await axios.put(
        `http://localhost:5000/api/posts/${state.id}`,
        newFormData,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
          },
        }
      );

      if (editPost) {
        alert("Post Edited");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function verify() {
      try {
        const verifyToken = await axios.get(
          "http://localhost:5000/api/verify",
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
            },
          }
        );
      } catch (err) {
        navigate("/login");
        throw err;
      }
    }

    try {
      verify();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="createPostDiv">
        <form
          className="createPostForm"
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
        >
          <h1>Edit Event</h1>
          <br />
          <div className="field">
            <label>Title: </label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
              defaultValue={state.title}
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
              defaultValue={state.body}
            ></textarea>
          </div>
          <br />
          <div className="field">
            <label>Upload Post: </label>
            <input
              type="file"
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
              defaultValue={state.duration}
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
              defaultValue={state.venue}
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
              defaultValue={moment(state.date)
                .local()
                .format("YYYY-MM-DDTkk:mm")}
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
