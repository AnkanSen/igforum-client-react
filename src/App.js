import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./Login";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import Home from "./Home";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/edit" element={<EditPost />} />
    </Routes>
  );
};

export default App;
