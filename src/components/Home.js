import axios from "axios";
import moment from "moment";

import { useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";

import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  // States
  const [postsData, setPostsData] = useState([]);

  const getPosts = async () => {
    try {
      const postGet = await axios.get("http://localhost:5000/api/posts/org", {
        headers: {
          "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
        },
      });

      let postsArray = [];
      postsArray = postGet.data;

      setPostsData((postGet) => [...postGet, ...postsArray]);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const deletePost = async (id, cardId) => {
    try {
      const postDelete = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
          },
        }
      );

      alert(postDelete.data.msg);

      // Display as none
      const postCard = document.getElementById(cardId);
      postCard.style.display = "none";
    } catch (err) {
      // Display the error
      console.log(err.response.data.msg);
    }
  };

  // Calling when component loads
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

        await getPosts();
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
      <div className="home">
        <h1> Your Posts </h1>
        {postsData.map((item, i) => {
          return (
            <Posts key={item} cardId={i} {...item} deletePost={deletePost} />
          );
        })}
      </div>
    </>
  );
};

const Posts = (props) => {
  const navigate = useNavigate();

  // Download fetch
  const downloadPost = (id) => {
    window.open(
      `http://localhost:5000/api/posts/download/${id}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  //Edit Button Handler
  const editButtonHandler = () => {
    navigate("/edit", {
      state: {
        id: props._id,
        title: props.title,
        body: props.body,
        picPath: props.img,
        duration: props.duration,
        venue: props.venue,
        date: props.date,
        waLink: props.waLink,
      },
    });
  };

  const downloadButtonHandler = () => {
    downloadPost(props._id);
  };

  return (
    <div className="postCard" id={props.cardId}>
      <ul>
        <li>
          <h1>Organization: {props.organization}</h1>
        </li>
        <li>Title: {props.title}</li>
        <li>Body: {props.body}</li>
        <li>Likes: {props.likes}</li>
        <li>Registrants: {props.registrants}</li>
        <li>
          Pic <img src={`http://localhost:5000/${props.img}`} />
        </li>
        <li>Is Updated: {props.updated.toString()}</li>
        <li>Venue: {props.venue}</li>
        <li>
          Date: {moment(props.date).local().format("MMMM Do YYYY, hh:mm a")}
        </li>
        <li>Duration: {props.duration}</li>
        <li>WhatsApp Link: {props.waLink}</li>
      </ul>
      <br />
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete") === true) {
            props.deletePost(props._id, props.cardId);
          }
        }}
      >
        Delete Post
      </button>
      <button onClick={editButtonHandler}>Edit Post</button>
      <button onClick={downloadButtonHandler}>Download Registrants</button>
    </div>
  );
};

export default Home;
