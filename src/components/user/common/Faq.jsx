import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Headtitle from "../common/Headtitle";

const Faq= () => {
    const faqs = [
        {
            question: "What is StudentGuru?",
            answer:
                "StudentGuru is an online learning and mentorship platform designed to help students improve skills, gain real-world knowledge, and connect with experienced mentors for career growth.",
        },
        {
            question: "How do I join a program?",
            answer:
                "You can register for free, explore our available programs, and enroll directly through your dashboard. Once enrolled, you’ll get access to course materials and live mentor sessions.",
        },
        {
            question: "Are the classes live or recorded?",
            answer:
                "StudentGuru offers both! You can attend live interactive sessions and also access recorded lectures anytime for revision or self-paced learning.",
        },
        {
            question: "Do I get a certificate after completing a program?",
            answer:
                "Yes, every program includes a completion certificate that validates your learning and can be added to your resume or LinkedIn profile.",
        },
        {
            question: "How much does it cost to join?",
            answer:
                "Many of our resources are free, while premium programs come at affordable prices. You’ll find all fee details clearly mentioned on each program’s page.",
        },
        {
            question: "Can I talk to a mentor before enrolling?",
            answer:
                "Absolutely! We encourage students to connect with mentors to understand program benefits, learning paths, and career opportunities before joining.",
        },
    ];

    return (
        <section className="faqsection">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Headtitle
                            className="text-center"
                            topTitle="FAQ's"
                            title="Frequently Asked Questions"
                            headingTag="h3"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Asked Questions"
                        />
                    </Col>
                </Row>
                <Row className="align-items-end justify-content-between gap-md-0 gap-4">
                    <Col lg={4} md={3}>
                        <img loading="lazy" src="/faq.svg" alt="faq" />
                    </Col>
                    <Col lg={7} md={9}>
                        <Accordion defaultActiveKey="0" flush>
                            {faqs.map((faq, index) => (
                                <Accordion.Item eventKey={index.toString()} key={index}>
                                    <Accordion.Header>{faq.question}</Accordion.Header>
                                    <Accordion.Body>{faq.answer}</Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Faq;
