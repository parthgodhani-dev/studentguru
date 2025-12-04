import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../../../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { IconUserFilled, IconMailFilled, IconPhoneFilled, IconCalendarWeekFilled, IconKeyFilled } from '@tabler/icons-react';
import Headtitle from "../common/Headtitle";

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", bg: "success" });
    const dispatch = useDispatch()

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {

                dispatch(login(userData))

                setToast({ show: true, message: "Registered successfully!", bg: "success" });

                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            setError(error.message || error.response?.message || "Registration failed. Please try again.");
            setToast({ show: true, message: "Registration failed!", bg: "danger" });
        }
    };

    return (
        <>
            <section className="auth_section">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Headtitle
                                className="text-center"
                                topTitle="it's completely free"
                                title="Registration !!!"
                                headingTag="h1"
                                headingClass="maintitle"
                                underline={true}
                                underlineClass="underline"
                                underlineText="Registration !!!"
                                subTitle="Please fill your personal details."
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center flex-md-row flex-column-reverse gap-md-0 gap-3">
                        <Col xl={6} lg={5} md={5}>
                            <img loading="lazy" src="/register.svg" alt="Registration" />
                        </Col>
                        <Col xl={6} lg={7} md={7}>
                            {error && <p className="text-danger text-center">{error}</p>}
                                <div className="authform">
                                    <Form onSubmit={handleSubmit(create)}>
                                        <Form.Group className="mb-3 field">
                                            <Form.Label>Full name</Form.Label>
                                            <IconUserFilled stroke={1} width={20} height={20} />
                                            <Form.Control type="text" {...register("name", { required: true })} placeholder="Enter your full name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 field">
                                            <Form.Label>Email</Form.Label>
                                            <IconMailFilled stroke={1} width={20} height={20} />
                                            <Form.Control type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 field">
                                            <Form.Label>Phone Number</Form.Label>
                                            <IconPhoneFilled stroke={1} width={20} height={20} />
                                            <Form.Control type="tel" {...register("phone", { required: true })} placeholder="Enter your phone number" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 field">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <IconCalendarWeekFilled stroke={1} width={20} height={20} />
                                            <Form.Control type="date" {...register("dob", { required: true })} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 field">
                                            <Form.Label>Password</Form.Label>
                                            <IconKeyFilled stroke={1} width={20} height={20} />
                                            <Form.Control type="password" {...register("password", { required: true })} placeholder="Enter your password" autoComplete="" />
                                        </Form.Group>
                                        <Button variant="secondary" type="submit">Register</Button>
                                    </Form>
                                </div>
                        </Col>
                    </Row>
                </Container>

                <ToastContainer position="bottom-end" className="p-3">
                    <Toast
                        bg={toast.bg}
                        onClose={() => setToast({ ...toast, show: false })}
                        show={toast.show}
                        delay={2000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">Message</strong>
                        </Toast.Header>
                        <Toast.Body className="text-white">{toast.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </section>
        </>
    );
};

export default Register;
