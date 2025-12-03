import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Headtitle from "../common/Headtitle";

const LearningPrograms = () => {
    const programs = [
        {
            img : "/p1.png",
            title: "UI/UX Design Mastery",
            description: "Understand design thinking, prototyping, and user interface design tools.",
            duration: "2 Months"
        },
        {
            img : "/p2.png",
            title: "Web Development Bootcamp",
            description: "Learn to build responsive websites using HTML, CSS, JavaScript, and React.",
            duration: "3 Months"
        },
        {
            img : "/p3.png",
            title: "Mobile App Development",
            description: "Build Android and iOS apps using React Native and modern APIs with hands-on projects.",
            duration: "3.5 Months"
        },
        {
            img : "/p4.png",
            title: "Digital Marketing Essentials",
            description: "Learn SEO, social media marketing, and analytics-driven campaign strategies.",
            duration: "2.5 Months"
        },
        {
            img : "/p5.png",
            title: "Cloud Computing & DevOps Basics",
            description: "Understand cloud platforms, CI/CD pipelines, and deployment automation to boost  career.",
            duration: "4 Months"
        },
        {
            img : "/p6.png",
            title: "Data Science Fundamentals",
            description: "Master data analysis, visualization, and Python-based machine learning basics.",
            duration: "4 Months"
        },
        {
            img : "/p7.png",
            title: "Artificial Intelligence & Machine Learning",
            description: "Started AI concepts, neural networks, and machine learning using Python and TensorFlow.",
            duration: "5 Months"
        },
        {
            img : "/p8.png",
            title: "Communication & Soft Skills",
            description: "Improve your public speaking, presentation, and teamwork skills for career success.",
            duration: "1.5 Months"
        },
        {
            img: "/p9.png",
            title: "Career Guidance & Mentorship",
            description: "Personalized mentorship and mock interviews to help you achieve your career goals.",
            duration: "Ongoing"
        }
    ];

    return (
        <section className="programs">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Headtitle
                            className="text-center"
                            topTitle="Our Learning Programs"
                            title="Explore the Courses That Empower Students"
                            headingTag="h3"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Empower Students"
                        />
                    </Col>
                </Row>

                <Row>
                    {programs.map((program, index) => (
                        <Col key={index} md={4} sm={6} className=" d-flex align-items-stretch">
                            <Card className="mb-4">
                                <Card.Body className="text-center p-4">
                                    <img loading="lazy" src={program.img} alt={program.title} />
                                    <h4>{program.title}</h4>
                                    <p>{program.description}</p>
                                    <strong>{program.duration}</strong>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default LearningPrograms;
