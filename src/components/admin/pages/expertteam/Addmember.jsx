import React, { useCallback, useEffect } from 'react'
import teamServices from "../../../../appwrite/awteam"
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

const Addmember = () => {

    const { register, handleSubmit, watch, setValue} = useForm({
            name: "",
            slug: "",
            designation: "",
            experience: "",
            expertise: "",
            bio: "",
            status: "active"
        })

    const navigate = useNavigate();

    const slugTransform = useCallback((value) => {
        return value ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-") : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "name") {
                setValue("slug", slugTransform(value.name), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const addTeam = async (data) => {
        try {
            // 1. upload image
            const file = await teamServices.uploadFile(data.mimage[0]);
            let fileId = null;
            if (file) {
                fileId = file.$id;
            }

            // 2. create post
            const teammember = await teamServices.createTeam({
                ...data,
                expertimg: fileId,
                status: data.status === "1" ? "active" : "inactive",
            });

            if (teammember) {
                navigate(`/admin/listingmember`);
            }
        } catch (error) {
            console.error("Error creating team member:", error);
        }
    }

  return (
    <>
        <section>
            <Container>
                <Row>
                    <Col sm={12} className='mb-3'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="admintitle">
                                <h1>Add Team Member</h1>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <Card className='admincard'>
                              <Card.Header as="h5">Enter Team Member information here</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(addTeam)}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3 field" controlId="membername">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter user name"
                                                    {...register("name", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3 field" controlId="testimoslug">
                                                <Form.Label>Slug</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("slug", { required: true })}
                                                    onInput={(e) =>
                                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                              <Form.Group className="mb-3 field" controlId="memberdesignation">
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                      placeholder="Enter member designation"
                                                      {...register("designation", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                              <Form.Group className="mb-3 field" controlId="memberexperience">
                                                <Form.Label>Experience</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter member experience"
                                                    {...register("experience", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                          <Col md={12}>
                                              <Form.Group className="mb-3 field" controlId="memberexpertise">
                                                  <Form.Label>Expertise</Form.Label>
                                                  <Form.Control
                                                      type="text"
                                                      placeholder="Enter member expertise"
                                                      {...register("expertise", { required: true })}
                                                  />
                                              </Form.Group>
                                          </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3 field" controlId="memberbio">
                                                <Form.Label>Bio</Form.Label>
                                                <Form.Control as="textarea" rows={3} 
                                                    placeholder="Enter member bio"
                                                    {...register("bio", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3 field" controlId="testimoimg">
                                                <Form.Label>Member Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                                    {...register("mimage", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3 field" controlId="testimostatus">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select {...register("status", { required: true })}>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Button className="button" type="submit">Create Post</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Addmember