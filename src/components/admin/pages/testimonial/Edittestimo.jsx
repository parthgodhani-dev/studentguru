import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RTE from "../../common/RTE";
import testimoServices from "../../../../appwrite/awtestimo";
import Loader from "../../../Loader";

const Edittestimo = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            name: "",
            slug: "",
            state: "",
            country: "",
            content: "",
            status: "active",
        },
    });

    // Fetch testimonial
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await testimoServices.getTestimo(slug);
                if (data) {
                    setReviews(data);
                    setValue("name", data.name);
                    setValue("slug", data.$id);
                    setValue("state", data.state);
                    setValue("country", data.country);
                    setValue("content", data.content);
                    setValue("status", data.status === "active" ? "1" : "2");
                }
            } catch (error) {
                console.error("Error fetching testimonial:", error);
            }
        };
        fetchReviews();
    }, [slug, setValue]);

    // Slug transform
    const slugTransform = useCallback((value) => {
        return value
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            : "";
    }, []);

    // Auto slug update on name change
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "name") {
                setValue("slug", slugTransform(value.name), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Submit handler
    const editTestimo = async (data) => {
        try {
            let fileId = reviews.userimg;

            // Upload new image if selected
            if (data.image && data.image[0]) {
                const file = await testimoServices.uploadFile(data.image[0]);
                if (file) fileId = file.$id;
            }

            await testimoServices.updateTestimo(slug, {
                name: data.name,
                slug: data.slug,
                state: data.state,
                country: data.country,
                content: data.content,
                userimg: fileId,
                status: data.status === "1" ? "active" : "inactive",
            });

            navigate("/admin/listingtestimonial");
        } catch (error) {
            console.error("Error updating testimonial:", error);
        }
    };

    if (!reviews) return <Loader message="Loading testimonial..." />;

    return (
        <section>
            <Container>
                <Row>
                    <Col sm={12} className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="admintitle">
                                <h1>Edit Testimonial</h1>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <Card className="admincard">
                            <Card.Header as="h5">Update testimonial information here</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(editTestimo)}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="testimoname">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("name", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="testimoslug">
                                                <Form.Label>Slug</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("slug", { required: true })}
                                                    onInput={(e) =>
                                                        setValue(
                                                            "slug",
                                                            slugTransform(e.currentTarget.value),
                                                            { shouldValidate: true }
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="testimostate">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("state", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="testimocountry">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("country", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <RTE
                                                label="Content"
                                                name="content"
                                                control={control}
                                                defaultValue={getValues("content")}
                                            />
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3" controlId="testimoimg">
                                                <Form.Label>User Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/*"
                                                    {...register("image")}
                                                />
                                                {reviews?.userimg && !getValues("image") && (
                                                    <img
                                                        src={testimoServices.getFilePreview(reviews.userimg)}
                                                        alt={reviews.name}
                                                        className="img-thumbnail mt-2"
                                                        width={150}
                                                    />
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3" controlId="testimostatus">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select {...register("status", { required: true })} defaultValue={reviews.status === "active" ? "1" : "2"}>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Button type="submit" className="button">
                                                Update Testimonial
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Edittestimo;
