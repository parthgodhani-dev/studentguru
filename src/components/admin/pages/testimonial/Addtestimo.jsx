import React, { useCallback, useEffect } from 'react'
import testimoServices from "../../../../appwrite/awtestimo"
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import RTE from '../../common/RTE'

const Addtestimo = () => {

    const { register, handleSubmit, watch, setValue, control } = useForm({
            name: "",
            slug: "",
            state: "",
            country : "",
            content: "",
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

    const addReview = async (data) => {
        try {
            // 1. upload image
            const file = await testimoServices.uploadFile(data.image[0]);
            let fileId = null;
            if (file) {
                fileId = file.$id;
            }

            // 2. create post
            const testimo = await testimoServices.createTestimo({
                ...data,
                userimg: fileId,
                status: data.status === "1" ? "active" : "inactive",
            });

            if (testimo) {
                navigate(`/admin/listingtestimonial`);
            }
        } catch (error) {
            console.error("Error creating testimonial:", error);
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
                                <h1>Add Testimonial</h1>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <Card className='admincard'>
                            <Card.Header as="h5">Enter testimonial information here</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(addReview)}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3 field" controlId="testimoname">
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
                                            <Form.Group className="mb-3 field" controlId="testimostate">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter user state"
                                                    {...register("state", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3 field" controlId="testimocountry">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter user country"
                                                    {...register("country", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <RTE label="Content" name="content" control={control} />
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3 field" controlId="testimoimg">
                                                <Form.Label>User Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                                    {...register("image", { required: true })}
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

export default Addtestimo