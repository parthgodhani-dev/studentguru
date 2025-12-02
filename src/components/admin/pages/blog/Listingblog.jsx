import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import { IconEdit, IconTrash, IconLibraryPlus } from '@tabler/icons-react';
import { Link } from "react-router-dom"
import blogServices from "../../../../appwrite/awblog";

const Listingblog = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchBlogs = async () => {
        try {
            const response = await blogServices.getAllBlogs("desc");

            if (response && response.documents) {
                setBlogs(response.documents)
            }
        } catch (error) {
            console.log(console.error("Error fetching blogs:", error))
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (slug, newStatus) => {
        try {
            const blog = blogs.find((b) => (b.$id === slug))

            if (!blog) return;

            const update = await blogServices.updateBlog(slug, {
                title: blog.title,
                content: blog.content,
                featuredimage: blog.featuredimage,
                status: newStatus,
            });

            if (update) {
                setBlogs((prev) =>
                    prev.map((b) =>
                        b.$id === slug ? { ...b, status: newStatus } : b
                    )
                );
            }

        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    // delete blog
    const handleDelete = async (slug) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const success = await blogServices.deleteBlog(slug);
            if (success) {
                setBlogs((prev) => prev.filter((blog) => blog.$id !== slug));
            }
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <section>
            <Container fluid>
                <Row className='align-items-center'>
                    <Col sm={12} className='mb-3'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="admintitle">
                                <h1>Blog</h1>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Button className='button icon' as={Link} to="/admin/addblog">
                                    <IconLibraryPlus size={20} stroke={2} />  Create New Blog
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <Card className='admincard'>
                            <Card.Header as="h5">Here is the list of blog</Card.Header>
                            <Card.Body>
                                {loading ? (
                                    <div className="text-center py-4">
                                        <Spinner animation="border" />
                                    </div>
                                ) : (
                                    <div class="table-responsive">
                                        <table className="list-table">
                                            <thead>
                                                <tr>
                                                    <th width="20%">Image</th>
                                                    <th width="50%">Title</th>
                                                    <th width="15%">Status</th>
                                                    <th width="15%" className='text-end'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {blogs.length > 0 ? (
                                                    blogs.map((blog) => (
                                                        <tr key={blog.$id}>
                                                            <td>
                                                                <img className='img-thumbnail' src={blogServices.getFilePreview(blog.featuredimage)} alt={blog.title} width={100} />
                                                            </td>
                                                            <td className='fw-medium'>{blog.title}</td>
                                                            <td className='fw-medium'>
                                                                <Form.Select
                                                                    value={blog.status}
                                                                    onChange={(e) => handleStatusChange(blog.$id, e.target.value)}
                                                                >
                                                                    <option value="active">Active</option>
                                                                    <option value="inactive">Inactive</option>
                                                                </Form.Select>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-end gap-2">
                                                                    <Button className="button icon" as={Link} to={`/admin/editblog/${blog.$id}`}><IconEdit size={20} stroke={2} /></Button>
                                                                    <Button className="button icon" onClick={() => handleDelete(blog.$id)}><IconTrash size={20} stroke={2} /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-3">
                                                            No blogs found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Listingblog