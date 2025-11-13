import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import blogServices from "../../../appwrite/awblog";

const Blogcard = ({ blogs }) => {
    if (!blogs || blogs.length === 0) {
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="text-center text-muted">
                            <h5>No blogs found...</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <>
            {blogs.map((blog) => {
                const createdDateStr = blog.$createdAt || blog.createdAt;
                const createdDate = createdDateStr
                    ? new Date(createdDateStr).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })
                    : "";

                return (
                    <div className="blog_box" key={blog.$id}>
                        <div className="wrap">
                            <div className="box_img">
                                <img
                                    src={blogServices.getFilePreview(blog.featuredimage)}
                                    alt={blog.title}
                                />
                            </div>
                            <div className="featwrap">
                                <small>{createdDate}</small>
                                <h3>{blog.title}</h3>
                                <p>{blog.shortcontent}</p>
                                <Link to={`/blog/${blog.$id}`} className="button">
                                    View More
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Blogcard;
