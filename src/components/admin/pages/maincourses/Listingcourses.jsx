import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import { IconEdit, IconTrash, IconLibraryPlus } from '@tabler/icons-react'
import { Link } from "react-router-dom"
import maincoursesServices from '../../../../appwrite/awmaincourses'

const Listingcourse = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch all courses
    const fetchCourses = async () => {
        try {
            const response = await maincoursesServices.getAllCourses()
            if (response && response.documents) {
                setCourses(response.documents)
            }
        } catch (error) {
            console.error("Error fetching courses:", error)
        } finally {
            setLoading(false)
        }
    }

    // Handle status update
    const handleStatusChange = async (slug, newStatus) => {
        try {
            const course = courses.find((c) => c.$id === slug)
            if (!course) return

            const update = await maincoursesServices.getCourse(slug, {
                coursetitle: course.coursetitle,
                description: course.description,
                courseimg: course.courseimg,
                status: newStatus,
            })

            if (update) {
                setCourses((prev) =>
                    prev.map((c) => (c.$id === slug ? { ...c, status: newStatus } : c))
                )
            }
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    // Delete course
    const handleDelete = async (slug) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const success = await maincoursesServices.deleteCourse(slug)
                if (success) {
                    setCourses((prev) => prev.filter((c) => c.$id !== slug))
                }
            } catch (error) {
                console.error("Error deleting course:", error)
            }
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <>
            <section>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col sm={12} className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="admintitle">
                                    <h1>Courses</h1>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button className="button icon" as={Link} to="/admin/addcourse">
                                        <IconLibraryPlus size={20} stroke={2} /> Add New Course
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col md={12}>
                            <Card className="admincard">
                                <Card.Header as="h5">List of Courses</Card.Header>
                                <Card.Body>
                                    {loading ? (
                                        <div className="text-center py-4">
                                            <Spinner animation="border" />
                                        </div>
                                    ) : (
                                        <table className="GeneratedTable">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Image</th>
                                                    <th width="25%">Course Title</th>
                                                    <th width="35%">Description</th>
                                                    <th width="15%">Status</th>
                                                    <th width="15%" className="text-end">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {courses.length > 0 ? (
                                                    courses.map((course) => (
                                                        <tr key={course.$id}>
                                                            <td>
                                                                {course.courseimg ? (
                                                                    <img
                                                                        className="img-thumbnail"
                                                                        src={maincoursesServices.getFilePreview(course.courseimg)}
                                                                        alt={course.coursetitle}
                                                                        width={100}
                                                                    />
                                                                ) : (
                                                                    <span className="text-muted">No Image</span>
                                                                )}
                                                            </td>

                                                            <td className="fw-medium">{course.coursetitle}</td>

                                                            <td className="fw-medium" style={{ maxWidth: "300px" }}>
                                                                {course.description}
                                                            </td>

                                                            <td className="fw-medium">
                                                                <Form.Select
                                                                    value={course.status}
                                                                    onChange={(e) =>
                                                                        handleStatusChange(course.$id, e.target.value)
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
                                                                        to={`/admin/editcourse/${course.$id}`}
                                                                    >
                                                                        <IconEdit size={20} stroke={2} />
                                                                    </Button>

                                                                    <Button
                                                                        className="button icon"
                                                                        onClick={() => handleDelete(course.$id)}
                                                                    >
                                                                        <IconTrash size={20} stroke={2} />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center py-3">
                                                            No courses found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

export default Listingcourse
