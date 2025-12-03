import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RTE from "../../common/RTE";
import TagsInput from "../../common/TagsInput";
import blogServices from "../../../../appwrite/awblog";
import Loader from "../../../Loader";

const Editblog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      tags: "",
      content: "",
      status: "active",
    },
  });

  
  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogServices.getBlog(slug);
      if (data) {
        setPost(data);
  
        setValue("title", data.title);
        setValue("slug", data.$id);
        setTags(
          (Array.isArray(data.tags)
            ? data.tags
            : data.tags?.split(",").map((t) => t.trim()) || []
          ).filter((tag) => tag && tag.trim() !== "")
        );
        setValue("shortcontent", data.shortcontent);
        setValue("content", data.content);
        setValue("status", data.status === "active" ? "1" : "2");
      }
    };
    fetchBlog();
  }, [slug, setValue]);

  
  const slugTransform = useCallback((value) => {
    return value
      ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
      : "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const editPost = async (data) => {
    try {
      let fileId = post.featuredimage;

      
      if (data.image && data.image[0]) {
        const file = await blogServices.uploadFile(data.image[0]);
        if (file) fileId = file.$id;
      }

      await blogServices.updateBlog(slug, {
        title: data.title,
        slug: data.slug,
        tags: Array.isArray(tags) ? tags.join(", ") : tags,
        shortcontent: data.shortcontent,
        content: data.content,
        featuredimage: fileId,
        status: data.status === "1" ? "active" : "inactive",
      });

      navigate("/admin/listingblog");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!post) return <Loader message="Loading..." />;

  return (
    <section>
      <Container>
        <Row>
          <Col sm={12} className='mb-3'>
              <div className="d-flex align-items-center justify-content-between">
                  <div className="admintitle">
                      <h1>Edit Blog</h1>
                  </div>
              </div>
          </Col>
          <Col md={12}>
            <Card className="admincard">
              <Card.Header as="h5">Update blog information here</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(editPost)}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="blogtitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" {...register("title", { required: true })} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="blogslug">
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
                            <Form.Control as="textarea" rows={3} {...register("shortcontent", { required: true })} />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                      <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="blogimg">
                        <Form.Label>Featured Image</Form.Label>
                        <Form.Control type="file" accept="image/*" {...register("image")} />
                        {post?.featuredimage && !getValues("image") && (
                          <img
                            loading="lazy"
                            src={blogServices.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="img-thumbnail mt-2"
                            width={150}
                          />
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="blogstatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select {...register("status", { required: true })}>
                          <option value="1" selected={post.status === "active"}>
                            Active
                          </option>
                          <option value="2" selected={post.status === "inactive"}>
                            Inactive
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Button type="submit" className="button">
                        Update Blog
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

export default Editblog;
