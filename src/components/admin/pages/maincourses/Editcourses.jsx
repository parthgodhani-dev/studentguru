import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import maincoursesServices from "../../../../appwrite/awmaincourses";
import subCourseServices from "../../../../appwrite/awsubcourses";
import lessonsServices from "../../../../appwrite/awlessons";
import Loader from "../../../Loader";
import RTE from "../../common/RTE";

const Editcourse = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [deletedLessons, setDeletedLessons] = useState([]);
    const [loadingModules, setLoadingModules] = useState(true);

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            coursetitle: "",
            slug: "",
            description: "",
            briefinfo: "",
            status: "1",
        },
    });

    const slugTransform = useCallback((value) => {
        return value
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "coursetitle") {
                setValue("slug", slugTransform(value.coursetitle), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoadingModules(true);
                const data = await maincoursesServices.getCourse(slug);
                if (!data) {
                    console.error("Course not found");
                    return;
                }
                setCourse(data);

                setValue("coursetitle", data.coursetitle || "");
                setValue("slug", data.$id || "");
                setValue("description", data.description || "");
                setValue("briefinfo", data.briefinfo || "");
                setValue("status", data.status === "active" ? "1" : "2");

                const subRes = await subCourseServices.getSubcourses(data.$id || slug);
                const subs = (subRes && subRes.documents) || [];

                const modulesInit = [];

                for (const sub of subs) {
                    let lessons = [];
                    try {
                        const lessonRes = await lessonsServices.getLessons(sub.$id);
                        lessons = (lessonRes && lessonRes.documents) || [];
                    } catch (err) {
                        console.warn("Failed to fetch lessons for subcourse", sub.$id, err);
                    }

                    
                    const lessonsShape = lessons.map((l) => ({
                        id: l.$id,
                        lessonstitle: l.lessontitle || "",
                        lessonvideo: l.lessonvideo || "",
                    
                        isNew: false,
                    }));

                    modulesInit.push({
                        id: sub.$id,
                        subcoursename: sub.subtitle || "",
                        lessons: lessonsShape,
                        isNew: false,
                    });
                }

                if (modulesInit.length === 0) {
                    modulesInit.push({ subcoursename: "", lessons: [{ lessonstitle: "", lessonvideo: "" }], isNew: true });
                }

                setModules(modulesInit);
            } catch (error) {
                console.error("Error fetching course bundle:", error);
            } finally {
                setLoadingModules(false);
            }
        };

        fetchAll();
    }, [slug, setValue]);

    const addModule = () => {
        setModules((prev) => [...prev, { subcoursename: "", lessons: [{ lessonstitle: "", lessonvideo: "" }], isNew: true }]);
    };

    const deleteModule = async (index) => {
        const module = modules[index];
        if (!module) return;

        if (module.id) {
            try {
                for (const lesson of module.lessons || []) {
                    if (lesson.id) {
                        try {
                            await lessonsServices.deleteLesson(lesson.id);
                        } catch (err) {
                            console.warn("Failed to delete lesson", lesson.id, err);
                        }
                    }
                }
                await subCourseServices.deleteSubcourse(module.id);
            } catch (err) {
                console.error("Failed to delete module and its lessons:", err);
                alert("Failed to delete subcourse. Check console.");
                return;
            }
        } else {
            //
        }

        setModules((prev) => prev.filter((_, i) => i !== index));
    };

    const updateModule = (index, value) => {
        setModules((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], subcoursename: value };
            return copy;
        });
    };

    const addLesson = (moduleIndex) => {
        setModules((prev) => {
            const copy = [...prev];
            copy[moduleIndex].lessons = [...copy[moduleIndex].lessons, { lessonstitle: "", lessonvideo: "", isNew: true }];
            return copy;
        });
    };

    const deleteLesson = (moduleIndex, lessonIndex) => {
        setModules((prev) => {
            const copy = [...prev];
            const lesson = copy[moduleIndex].lessons[lessonIndex];
            if (lesson?.id) {
                setDeletedLessons((d) => [...d, lesson.id]);
            }
            copy[moduleIndex].lessons = copy[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);

            if (copy[moduleIndex].lessons.length === 0) {
                copy[moduleIndex].lessons = [{ lessonstitle: "", lessonvideo: "", isNew: true }];
            }
            return copy;
        });
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        setModules((prev) => {
            const copy = [...prev];
            const lessonsCopy = [...copy[moduleIndex].lessons];
            lessonsCopy[lessonIndex] = { ...lessonsCopy[lessonIndex], [field]: value };
            copy[moduleIndex].lessons = lessonsCopy;
            return copy;
        });
    };

    const updateCourse = async (data) => {
        try {
            
            if (deletedLessons.length > 0) {
                for (const lessonId of deletedLessons) {
                    try {
                        await lessonsServices.deleteLesson(lessonId);
                    } catch (err) {
                        console.warn("Failed to delete lesson during final save:", lessonId, err);
                    }
                }
            }

            let fileId = course.courseimg;
            if (data.image && data.image[0]) {
                const file = await maincoursesServices.uploadFile(data.image[0]);
                if (file) fileId = file.$id;
            }

            await maincoursesServices.updateCourse(slug, {
                coursetitle: data.coursetitle,
                description: data.description,
                courseimg: fileId,
                briefinfo: data.briefinfo,
                status: data.status === "1" ? "active" : "inactive",
            });

            const courseid = course.$id || slug;

            
            for (const module of modules) {
                if (!module.subcoursename || module.subcoursename.trim() === "") continue;

                if (!module.id) {
                
                    const createdSub = await subCourseServices.createSubcourse({
                        courseid,
                        subtitle: module.subcoursename,
                    });

                    if (!createdSub) {
                        console.warn("Failed to create subcourse", module.subcoursename);
                        continue;
                    }

                    const newSubId = createdSub.$id;

                    for (const lesson of module.lessons) {
                        if (!lesson.lessonstitle || lesson.lessonstitle.trim() === "") continue;
                        await lessonsServices.createLesson({
                            subcourseid: newSubId,
                            lessontitle: lesson.lessonstitle,
                            lessonvideo: lesson.lessonvideo,
                        });
                    }
                } else {
                    
                    try {
                        await subCourseServices.updateSubcourse(module.id, { subtitle: module.subcoursename });
                    } catch (err) {
                        console.warn("Failed to update subcourse", module.id, err);
                    }

                    
                    for (const lesson of module.lessons) {
                        if (!lesson.lessonstitle || lesson.lessonstitle.trim() === "") continue;

                        if (lesson.id) {
                            
                            try {
                                await lessonsServices.updateLesson(lesson.id, {
                                    lessontitle: lesson.lessonstitle,
                                    lessonvideo: lesson.lessonvideo,
                                });
                            } catch (err) {
                                console.warn("Failed to update lesson", lesson.id, err);
                            }
                        } else {
                           
                            try {
                                await lessonsServices.createLesson({
                                    subcourseid: module.id,
                                    lessontitle: lesson.lessonstitle,
                                    lessonvideo: lesson.lessonvideo,
                                });
                            } catch (err) {
                                console.warn("Failed to create lesson under existing subcourse", module.id, err);
                            }
                        }
                    }
                }
            }

            
            navigate("/admin/listingcourse");
        } catch (error) {
            console.error("Error updating course bundle:", error);
            alert("Error updating course. Check console for details.");
        }
    };

    if (!course || loadingModules) return <Loader message="Loading course..." />;

    return (
        <section>
            <Container>
                <Row>
                    <Col sm={12} className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="admintitle">
                                <h1>Edit Course</h1>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <Card className="admincard">
                            <Card.Header as="h5">Update Course Information</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(updateCourse)}>
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
                                            <RTE label="Content" name="briefinfo" control={control} defaultValue={getValues("briefinfo")} />
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group className="mb-3 field">
                                                <Form.Label>Course Image</Form.Label>
                                                <Form.Control type="file" accept="image/*" {...register("image")} />

                                                {course?.courseimg && (
                                                    <img
                                                        src={maincoursesServices.getFilePreview(course.courseimg)}
                                                        alt={course.coursetitle}
                                                        className="img-thumbnail mt-2"
                                                        width={150}
                                                    />
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <h6>Edit Sub Courses + Lessons</h6>

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
                                                                            onChange={(e) => updateModule(moduleIndex, e.target.value)}
                                                                        />
                                                                        {/* show a small hint if this module is existing
                                                                        {module.id ? (
                                                                            <Form.Text className="text-muted">Existing subcourse (will be updated on save)</Form.Text>
                                                                        ) : (
                                                                            <Form.Text className="text-muted">New subcourse (will be created on save)</Form.Text>
                                                                        )} */}
                                                                    </Form.Group>

                                                                    
                                                                        <Button
                                                                            variant="danger"
                                                                            onClick={() => deleteModule(moduleIndex)}
                                                                            className="mb-3"
                                                                        >
                                                                            <IconTrash size={20} stroke={2} />
                                                                        </Button>
                                                                    
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
                                                                                className="me-2"
                                                                            />

                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Video URL"
                                                                                value={lesson.lessonvideo}
                                                                                onChange={(e) =>
                                                                                    updateLesson(moduleIndex, lessonIndex, "lessonvideo", e.target.value)
                                                                                }
                                                                                className="me-2"
                                                                            />

                                                                            
                                                                                <Button variant="danger" onClick={() => deleteLesson(moduleIndex, lessonIndex)}>
                                                                                    <IconTrash size={20} stroke={2} />
                                                                                </Button>
                                                                            
                                                                        </div>

                                                                        {/* <Col md={12} className="mt-2">
                                                                            {lesson.id ? (
                                                                                <Form.Text className="text-muted">Existing lesson (will be updated on save)</Form.Text>
                                                                            ) : (
                                                                                <Form.Text className="text-muted">New lesson (will be created on save)</Form.Text>
                                                                            )}
                                                                        </Col> */}
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
                                                Update Course
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

export default Editcourse;
