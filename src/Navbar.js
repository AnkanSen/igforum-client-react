import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("x-auth-token");
    navigate("/login");
  };

  const createPostHandler = () => {
    navigate("/post");
  };
  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
      <br></br>
      <button onClick={createPostHandler}>Create New Event</button>
    </>
  );
};

export default Navbar;
