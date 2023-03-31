import { useLocation, Link } from "react-router-dom";
import React from "react";

const PageNotFound = () => {
  const location = useLocation();
  return (
    <div id="notFound" className="d-flex justify-content-center">
      <div>
        <h1>Error: the extension {location.pathname} doesn't lead anywhere.</h1>
        <h4> Click below to go to our Home Page</h4>
        <Link to="/">
          <img
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4470&q=80"
            alt="NOT FOUND"
            style={{ width: "1024px", objectFit: "cover" }}></img>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
