import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import teamServices from "../../../../appwrite/awteam";
import Loader from "../../../Loader";

const Editmember = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);

    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            slug: "",
            designation: "",
            experience: "",
            expertise: "",
            bio: "",
            status: "active",
        },
    });

    const slugTransform = useCallback((value) => {
        return value
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "name") {
                setValue("slug", slugTransform(value.name), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const data = await teamServices.getTeam(slug);
                if (data) {
                    setMember(data);

                    setValue("name", data.name);
                    setValue("slug", data.$id);
                    setValue("designation", data.designation);
                    setValue("experience", data.experience);
                    setValue("expertise", data.expertise);
                    setValue("bio", data.bio);
                    setValue("status", data.status === "active" ? "1" : "2");
                }
            } catch (error) {
                console.error("Error fetching team member:", error);
            }
        };

        fetchMember();
    }, [slug, setValue]);

    const editMember = async (data) => {
        try {
            let fileId = member.expertimg;

            if (data.image && data.image[0]) {
                const file = await teamServices.uploadFile(data.image[0]);
                if (file) {
                    fileId = file.$id;
                }
            }

            await teamServices.updateTeam(slug, {
                name: data.name,
                designation: data.designation,
                experience: data.experience,
                expertise: data.expertise,
                bio: data.bio,
                expertimg: fileId,
                status: data.status === "1" ? "active" : "inactive",
            });

            navigate("/admin/listingmember");
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    if (!member) return <Loader message="Loading team member..." />;

    return (
        <section>
            <Container>
                <Row>
                    <Col sm={12} className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="admintitle">
                                <h1>Edit Team Member</h1>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <Card className="admincard">
                            <Card.Header as="h5">
                                Update team member information here
                            </Card.Header>

                            <Card.Body>
                                <Form onSubmit={handleSubmit(editMember)}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="membername">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("name", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="memberslug">
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
                                            <Form.Group className="mb-3" controlId="memberdesignation">
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("designation", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="memberexperience">
                                                <Form.Label>Experience</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("experience", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3" controlId="memberexpertise">
                                                <Form.Label>Expertise</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("expertise", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3" controlId="memberbio">
                                                <Form.Label>Bio</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    {...register("bio", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3" controlId="memberimg">
                                                <Form.Label>Member Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/*"
                                                    {...register("image")}
                                                />

                                                {member?.expertimg && (
                                                    <img
                                                        loading="lazy"
                                                        src={teamServices.getFilePreview(member.expertimg)}
                                                        alt={member.name}
                                                        className="img-thumbnail mt-2"
                                                        width={150}
                                                    />
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3" controlId="memberstatus">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select
                                                    {...register("status", { required: true })}
                                                    defaultValue={member.status === "active" ? "1" : "2"}
                                                >
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Button type="submit" className="button">
                                                Update Member
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

export default Editmember;
