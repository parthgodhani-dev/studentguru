import React, { useCallback, useEffect, useState } from 'react'
import blogServices from "../../../../appwrite/awblog"
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import RTE from '../../common/RTE'
import TagsInput from '../../common/TagsInput';

const Addblog = () => {

    const { register, handleSubmit, watch, setValue, control } = useForm({
        title: "",
        slug: "",
        tags : "",
        shortcontent: "",
        content: "",
        status: "active"
    })

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    const slugTransform = useCallback((value) => {
        return value ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-") : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const addPost = async (data) => {
        try {
            let fileId = null;
            
            if (data.image && data.image[0]) {
                const file = await blogServices.uploadFile(data.image[0]);
                if (file) fileId = file.$id;
            }

            const cleanTags = tags
                .filter((tag) => tag && tag.trim() !== "")
                .join(", ");

            const blog = await blogServices.createBlog({
                title: data.title,
                slug: data.slug,
                tags: cleanTags,
                shortcontent: data.shortcontent,
                content: data.content,
                featuredimage: fileId,
                status: data.status === "1" ? "active" : "inactive",
            });

            if (blog) navigate("/admin/listingblog");
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col sm={12} className='mb-3'>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="admintitle">
                                    <h1>Add Blog</h1>
                                </div>
                            </div>
                        </Col>
                        
                        <Col md={12}>
                            <Card className='admincard'>
                                <Card.Header as="h5">Enter blog information here</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(addPost)}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3 field" controlId="blogtitle">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter post title"
                                                        {...register("title", { required: true })}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3 field" controlId="blogslug">
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
                                            <Col md={12}>
                                                <TagsInput tags={tags} setTags={setTags} />
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Short Content</Form.Label>
                                                    <Form.Control as="textarea" rows={3}
                                                        placeholder="Enter short content"
                                                        {...register("shortcontent", { required: true })}
                                                     />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <RTE label="Content" name="content" control={control} />
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group className="mb-3 field" controlId="blogimg">
                                                    <Form.Label>Featured Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                                        {...register("image", { required: true })}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-3 field" controlId="blogstatus">
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

export default Addblog