import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogServices from "../../../appwrite/awblog";
import { Container, Row, Col } from "react-bootstrap";
import Headtitle from "../common/Headtitle";

const Blogsingle = () => {
    const { slug } = useParams(); // get blog id or slug from URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await blogServices.getBlog(slug);
                if (res) {
                    setBlog(res);
                }
            } catch (error) {
                console.log("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
        getBlog();
    }, [slug]);

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (!blog) {
        return <div className="text-center py-5">Blog not found</div>;
    }

    const createdDateStr = blog.$createdAt || blog.createdAt;
    const createdDate = createdDateStr
        ? new Date(createdDateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "";

    return (
        <section className="blogs-single">
            <Container>
                <Row className="justify-content-center">
                    <Col md={3}>
                    <div className="sidebar">
                        <div className="box">
                            <h6>Set order</h6>
                            <div className="blogdate">{createdDate}</div>
                        </div>
                        <div className="box">
                            <h6>Tags</h6>
                            <div className="tags">{blog.tags}</div>
                        </div>
                    </div>
                    </Col>
                    <Col md={9}>
                        <Headtitle
                            className="text-center"
                            headingTag="h1"
                            headingClass="maintitle h3"
                            title={blog.title}
                        />
                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Blogsingle;
