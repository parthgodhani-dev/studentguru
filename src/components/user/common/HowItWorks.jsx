import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IconUserPlus, IconRoad, IconBrandFeedly, IconTrophy } from "@tabler/icons-react"

import Headtitle from "../common/Headtitle";

const HowItWorks = () => {
    const steps = [
        {
            icon: <IconUserPlus size={60} />,
            title: "Register & Explore",
            desc: "Create your free StudentGuru account and explore our wide range of learning programs designed for all skill levels.",
        },
        {
            icon: <IconRoad size={60} />,
            title: "Choose Your Path",
            desc: "Select a program or course that matches your goals — from web development to personal growth.",
        },
        {
            icon: <IconBrandFeedly size={60} />,
            title: "Learn & Practice",
            desc: "Attend live sessions, complete projects, and interact with mentors for hands-on learning.",
        },
        {
            icon: <IconTrophy size={60} />,
            title: "Achieve & Grow",
            desc: "Get certified, share your success story, and take your next big step in career or academics.",
        },
    ];

    return (
        <section className="howworks">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Headtitle
                            className="text-center mb-5"
                            topTitle="Our Process"
                            title={"How Our Program Works"}
                            headingTag="h3"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Program Works"
                        />
                    </Col>
                </Row>

                <div className="timeline">
                    <Row className="justify-content-center">
                        {steps.map((step, index) => (
                            <Col key={index} md={3}>
                                <Card className="h-100">
                                    <Card.Body>
                                        <span>{index + 1}</span>
                                        <div className="icon">{step.icon}</div>
                                        <h5>{step.title}</h5>
                                        <p className="">{step.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default HowItWorks;
