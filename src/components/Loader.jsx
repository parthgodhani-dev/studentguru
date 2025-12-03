import React from "react";

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="loader_wrapper d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="loader"></div>
            <p className="mt-2 text-muted">{message}</p>
        </div>
    );
};

export default Loader;