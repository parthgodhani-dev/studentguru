import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import { IconEdit, IconTrash, IconLibraryPlus } from '@tabler/icons-react'
import { Link } from "react-router-dom"
import testimoServices from "../../../../appwrite/awtestimo"

const Listingtestimo = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = async () => {
        try {
            const response = await testimoServices.getAllTestimo()
            if (response && response.documents) {
                setReviews(response.documents)
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (slug, newStatus) => {
        try {
            const testimo = reviews.find((b) => b.$id === slug)
            if (!testimo) return

            const update = await testimoServices.updateTestimo(slug, {
                name: testimo.name,
                content: testimo.content,
                slug: testimo.slug,
                userimg: testimo.userimg,
                status: newStatus,
            })

            if (update) {
                setReviews((prev) =>
                    prev.map((b) => (b.$id === slug ? { ...b, status: newStatus } : b))
                )
            }
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    const handleDelete = async (slug) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            try {
                const success = await testimoServices.deleteTestimo(slug)
                if (success) {
                    setReviews((prev) => prev.filter((review) => review.$id !== slug))
                }
            } catch (error) {
                console.error("Error deleting testimonial:", error)
            }
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return (
        <>
            <section>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col sm={12} className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="admintitle">
                                    <h1>Testimonials</h1>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button className="button icon" as={Link} to="/admin/addtestimonial">
                                        <IconLibraryPlus size={20} stroke={2} /> Create New Testimonial
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col md={12}>
                            <Card className="admincard">
                                <Card.Header as="h5">Here is the list of testimonials</Card.Header>
                                <Card.Body>
                                    {loading ? (
                                        <div className="text-center py-4">
                                            <Spinner animation="border" />
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="list-table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%">Image</th>
                                                        <th width="20%">Name</th>
                                                        <th width="40%">Content</th>
                                                        <th width="15%">Status</th>
                                                        <th width="15%" className="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reviews.length > 0 ? (
                                                        reviews.map((review) => (
                                                            <tr key={review.$id}>
                                                                <td>
                                                                    {review.userimg ? (
                                                                        <img
                                                                            loading="lazy"
                                                                            className="img-thumbnail"
                                                                            src={testimoServices.getFilePreview(review.userimg)}
                                                                            alt={review.name}
                                                                            width={100}
                                                                        />
                                                                    ) : (
                                                                        <span className="text-muted">No Image</span>
                                                                    )}
                                                                </td>
                                                                <td className="fw-medium">{review.name}</td>
                                                                <td
                                                                    className="fw-medium"
                                                                    dangerouslySetInnerHTML={{ __html: review.content }}
                                                                ></td>
                                                                <td className="fw-medium">
                                                                    <Form.Select
                                                                        value={review.status}
                                                                        onChange={(e) =>
                                                                            handleStatusChange(review.$id, e.target.value)
                                                                        }
                                                                    >
                                                                        <option value="active">Active</option>
                                                                        <option value="inactive">Inactive</option>
                                                                    </Form.Select>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center justify-content-end gap-2">
                                                                        <Button
                                                                            className="button icon"
                                                                            as={Link}
                                                                            to={`/admin/edittestimonial/${review.$id}`}
                                                                        >
                                                                            <IconEdit size={20} stroke={2} />
                                                                        </Button>
                                                                        <Button
                                                                            className="button icon"
                                                                            onClick={() => handleDelete(review.$id)}
                                                                        >
                                                                            <IconTrash size={20} stroke={2} />
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center py-3">
                                                                No testimonials found
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
        </>
    )
}

export default Listingtestimo
