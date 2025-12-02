import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import maincoursesServices from "../../../../appwrite/awmaincourses";
import subCourseServices from "../../../../appwrite/awsubcourses";
import lessonsServices from "../../../../appwrite/awlessons";
import RTE from "../../common/RTE";

const Addcourses = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, control } = useForm({
        defaultValues: {
            coursetitle: "",
            slug: "",
            description: "",
            briefinfo: "",
            status: "1",
        },
    });

    // slug convert
    const slugTransform = useCallback((value) => {
        return value
            ? value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
            : "";
    }, []);

    // Auto slug update on title typing
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "coursetitle") {
                setValue("slug", slugTransform(value.coursetitle), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // local state for builder
    const [modules, setModules] = useState([
        { subcoursename: "", lessons: [{ lessonstitle: "", lessonvideo: "" }] },
    ]);

    const addModule = () => {
        setModules((prev) => [...prev, { subcoursename: "", lessons: [{ lessonstitle: "", lessonvideo: "" }] }]);
    };

    const deleteModule = (index) => {
        setModules((prev) => prev.filter((_, i) => i !== index));
    };

    const updateModule = (index, field, value) => {
        setModules((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    };

    const addLesson = (moduleIndex) => {
        setModules((prev) => {
            const copy = [...prev];
            copy[moduleIndex].lessons = [...copy[moduleIndex].lessons, { lessonstitle: "", lessonvideo: "" }];
            return copy;
        });
    };

    const deleteLesson = (moduleIndex, lessonIndex) => {
        setModules((prev) => {
            const copy = [...prev];
            copy[moduleIndex].lessons = copy[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
            return copy;
        });
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        setModules((prev) => {
            const copy = [...prev];
            copy[moduleIndex].lessons = [...copy[moduleIndex].lessons];
            copy[moduleIndex].lessons[lessonIndex] = {
                ...copy[moduleIndex].lessons[lessonIndex],
                [field]: value,
            };
            return copy;
        });
    };

    // Submit add course + subcourses + lessons
    const addCourse = async (data) => {
        try {
            let fileId = null;

            // Upload image if present
            if (data.image && data.image[0]) {
                const file = await maincoursesServices.uploadFile(data.image[0]);
                if (file) fileId = file.$id;
            }

            // Create Course (use slug as document id)
            const course = await maincoursesServices.createCourse({
                coursetitle: data.coursetitle,
                slug: data.slug,
                description: data.description,
                briefinfo: data.briefinfo,
                courseimg: fileId,
                status: data.status === "1" ? "active" : "inactive",
            });

            if (!course) throw new Error("Failed to create course");

            console.log("COURSE CREATED:", course);

            const courseid = course.$id || data.slug; // fallback to slug if needed

            // Create subcourses and lessons sequentially
            for (const module of modules) {
                if (!module.subcoursename || module.subcoursename.trim() === "") continue; // skip empty

                const sub = await subCourseServices.createSubcourse({
                    courseid,
                    subtitle: module.subcoursename,
                });

                if (!sub) {
                    console.warn("Failed to create subcourse", module.subcoursename);
                    continue;
                }

                const subcourseid = sub.$id;

                console.log("SUBCOURSE CREATED:", sub);


                // create lessons for this subcourse
                for (const lesson of module.lessons) {
                    if (!lesson.lessonstitle || lesson.lessonstitle.trim() === "") continue; // skip empty

                    await lessonsServices.createLesson({
                        subcourseid: subcourseid,
                        lessontitle: lesson.lessonstitle,
                        lessonvideo: lesson.lessonvideo,
                    });

                    console.log("LESSON CREATED:", lesson);
                }
            }

            navigate("/admin/listingcourse");
        } catch (error) {
            console.error("Error creating course bundle:", error);
            alert("Error creating course. Check console for details.");
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col sm={12} className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="admintitle">
                                <h1>Add Course</h1>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <Card className="admincard">
                            <Card.Header as="h5">Enter Course Information</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(addCourse)}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3 field">
                                                <Form.Label>Course Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Course Title"
                                                    {...register("coursetitle", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3 field">
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
                                            <Form.Group className="mb-3 field">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    placeholder="Enter Course Description"
                                                    {...register("description", { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <RTE label="Content" name="briefinfo" control={control} />
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3 field">
                                                <Form.Label>Course Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                                    {...register("image")}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <h6>Add Sub Courses + Lessons</h6>

                                            {modules.map((module, moduleIndex) => (
                                                <Card className="coursacco mb-4" key={`module-${moduleIndex}`}>
                                                    <Card.Body style={{ background: "#D2D2D2" }}>
                                                        <Row>
                                                            <Col md={12}>
                                                                <div className="accoflex">
                                                                    <Form.Group className="mb-3" style={{ flex: 1 }}>
                                                                        <Form.Label>({moduleIndex + 1}) Sub Course Name</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Enter sub course name"
                                                                            value={module.subcoursename}
                                                                            onChange={(e) => updateModule(moduleIndex, "subcoursename", e.target.value)}
                                                                        />
                                                                    </Form.Group>

                                                                    {modules.length > 1 && (
                                                                        <Button
                                                                            
                                                                            onClick={() => deleteModule(moduleIndex)}
                                                                            className="mb-3 ms-3"
                                                                        >
                                                                            <IconTrash size={20} stroke={2} />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Form.Label>Lessons</Form.Label>

                                                        {module.lessons.map((lesson, lessonIndex) => (
                                                            <Card className="mb-3" key={`module-${moduleIndex}-lesson-${lessonIndex}`}>
                                                                <Card.Body style={{ background: "#B2B2B2" }}>
                                                                    <Row>
                                                                        <div className="accoflex smflex" style={{ width: "100%" }}>
                                                                            <h6>{lessonIndex + 1}</h6>

                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Lesson Title"
                                                                                value={lesson.lessonstitle}
                                                                                onChange={(e) =>
                                                                                    updateLesson(moduleIndex, lessonIndex, "lessonstitle", e.target.value)
                                                                                }
                                                                            />

                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Video URL"
                                                                                value={lesson.lessonvideo}
                                                                                onChange={(e) =>
                                                                                    updateLesson(moduleIndex, lessonIndex, "lessonvideo", e.target.value)
                                                                                }
                                                                            />

                                                                            {module.lessons.length > 1 && (
                                                                                <Button
                                                                                    
                                                                                    onClick={() => deleteLesson(moduleIndex, lessonIndex)}
                                                                                >
                                                                                    <IconTrash size={20} stroke={2} />
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                        ))}

                                                        <div className="d-flex justify-content-end">
                                                            <Button variant="secondary" onClick={() => addLesson(moduleIndex)}>
                                                                <IconPlus size={15} stroke={2} /> Add Lesson
                                                            </Button>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            ))}

                                            <div className="d-flex justify-content-end mb-3">
                                                <Button variant="primary" onClick={addModule} className="me-2">
                                                    <IconPlus size={15} stroke={2} /> Add Sub Course
                                                </Button>
                                            </div>

                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3 field">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select {...register("status", { required: true })}>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Button className="button" type="submit">
                                                Create Course
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

export default Addcourses;
