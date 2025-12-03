import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import { IconEdit, IconTrash, IconLibraryPlus } from '@tabler/icons-react'
import { Link } from "react-router-dom"
import teamServices from "../../../../appwrite/awteam"

const Listingmember = () => {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMembers = async () => {
        try {
            const response = await teamServices.getAllTeam()
            if (response && response.documents) {
                setMembers(response.documents)
            }
        } catch (error) {
            console.error("Error fetching team:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (slug, newStatus) => {
        try {
            const member = members.find((m) => m.$id === slug)
            if (!member) return

            const update = await teamServices.updateTeam(slug, {
                name: member.name,
                designation: member.designation,
                experience: member.experience,
                expertise: member.expertise,
                bio: member.bio,
                expertimg: member.expertimg,
                status: newStatus,
            })

            if (update) {
                setMembers((prev) =>
                    prev.map((m) => (m.$id === slug ? { ...m, status: newStatus } : m))
                )
            }
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    const handleDelete = async (slug) => {
        if (window.confirm("Are you sure you want to delete this team member?")) {
            try {
                const success = await teamServices.deleteTeam(slug)
                if (success) {
                    setMembers((prev) => prev.filter((m) => m.$id !== slug))
                }
            } catch (error) {
                console.error("Error deleting member:", error)
            }
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    return (
        <>
            <section>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col sm={12} className="mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="admintitle">
                                    <h1>Team Members</h1>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button className="button icon" as={Link} to="/admin/addmember">
                                        <IconLibraryPlus size={20} stroke={2} /> Add New Member
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col md={12}>
                            <Card className="admincard">
                                <Card.Header as="h5">List of Team Members</Card.Header>
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
                                                        <th width="35%">Designation</th>
                                                        <th width="15%">Status</th>
                                                        <th width="20%" className="text-end">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {members.length > 0 ? (
                                                        members.map((member) => (
                                                            <tr key={member.$id}>
                                                                <td>
                                                                    {member.expertimg ? (
                                                                        <img
                                                                            loading="lazy"
                                                                            className="img-thumbnail"
                                                                            src={teamServices.getFilePreview(member.expertimg)}
                                                                            alt={member.name}
                                                                            width={100}
                                                                        />
                                                                    ) : (
                                                                        <span className="text-muted">No Image</span>
                                                                    )}
                                                                </td>

                                                                <td className="fw-medium">{member.name}</td>
                                                                <td className="fw-medium">{member.designation}</td>
                                                                <td className="fw-medium">
                                                                    <Form.Select
                                                                        value={member.status}
                                                                        onChange={(e) =>
                                                                            handleStatusChange(member.$id, e.target.value)
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
                                                                            to={`/admin/editmember/${member.$id}`}
                                                                        >
                                                                            <IconEdit size={20} stroke={2} />
                                                                        </Button>


                                                                        <Button
                                                                            className="button icon"
                                                                            onClick={() => handleDelete(member.$id)}
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
                                                                No team members found
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

export default Listingmember
