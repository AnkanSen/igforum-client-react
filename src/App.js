import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import Login from "./Login";

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
