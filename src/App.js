import Login from "./Pages/login";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
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
      <BrowserRouter>
        {isLoggedin ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
