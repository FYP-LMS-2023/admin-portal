import Login from "./Pages/login";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/NotFound";
import User from "./Pages/User";
import Course from "./Pages/Course";
import Semester from "./Pages/Semester";
import Program from "./Pages/Program";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";
import { checkToken } from "./utils/utils";

function App() {
  const [isLoggedin, setisLoggedin] = React.useState(false);

  React.useEffect(() => {
    const result = checkToken();
    setisLoggedin(result);
  }, []);

  return (
    <div>
      {isLoggedin ? <Navbar /> : <></>}
      <BrowserRouter>
        {isLoggedin ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/program" element={<Program />} />
            <Route path="/user" element={<User />} />
            <Route path="/semester" element={<Semester />} />
            <Route path="/course" element={<Course />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
