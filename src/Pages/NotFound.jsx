import React from "react";
import notFound404 from "../public/notFound404.gif";

const NotFound = () => {
  return (
    <div>
      <center>
        <h1> ERROR 404 </h1>
      </center>
      <center>
        <h2> Page Not Found!</h2>
      </center>

      <center>
        <img alt={"not found"} src={notFound404} />
      </center>
    </div>
  );
};

export default NotFound;
