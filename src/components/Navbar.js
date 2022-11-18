import { useNavigate } from "react-router-dom";
import "./Navbar.css";

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
      <div class="nav">
        <ul className="dict">
          <li className="dict">
            <a onClick={logoutHandler}>Logout</a>
          </li>
          <li className="dict">
            <a onClick={createPostHandler}>Create New Event</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
