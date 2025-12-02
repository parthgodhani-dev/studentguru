import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="loader_wrapper d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            {/* <Spinner animation="border" variant="secondary" /> */}
            <div class="loader"></div>
            <p className="mt-2 text-muted">{message}</p>
        </div>
    );
};

export default Loader;