import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5 fade-in-el">
      <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted-custom fw-medium">{message}</p>
    </div>
  );
};

export default Loader;
