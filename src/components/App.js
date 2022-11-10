import { Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import CreatePost from "../components/CreatePost";
import EditPost from "../components/EditPost";
import Home from "../components/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/edit" element={<EditPost />} />
    </Routes>
  );
};

export default App;
