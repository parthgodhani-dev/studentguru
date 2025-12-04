import React, { useState } from 'react'
import { Col, Container, Row, Form, Button, Toast, ToastContainer } from 'react-bootstrap'
import { IconKeyFilled } from '@tabler/icons-react';
import Headtitle from '../common/Headtitle'
import { useForm } from "react-hook-form";
import authService from "../../../appwrite/auth";

const Changepassword = () => {

    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const {register,handleSubmit,formState: { errors },reset} = useForm();

    const onSubmit = async (data) => {

        setError("");

        if (data.newPassword !== data.confirmPassword) {
            setError("New password & confirm password does not match.");
            return;
        }

        try {
            await authService.changePassword(data.oldPassword, data.newPassword);

            setShowToast(true);
            reset();
        } catch (error) {
            setError("Old password is incorrect.", error );
        }
    };

    return (
        <>
            <section className='auth_section'>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Headtitle
                                className="text-center"
                                topTitle="Hi there !!!"
                                title="Create New Password"
                                headingTag="h1"
                                headingClass="maintitle"
                                underline={true}
                                underlineClass="underline"
                                underlineText="New Password"
                                subTitle="Your new password must be different from previously used password"
                            />
                        </Col>
                    </Row>

                    <Row className='align-items-center justify-content-center flex-sm-row flex-column-reverse gap-sm-0 gap-3'>
                        <Col xl={4} sm={4}>
                            <img loading="lazy" src="/changepassword.svg" alt="changepassword" />
                        </Col>

                        <Col xl={5} sm={8}>
                            <div className="authform">

                                {error && <p className='text-danger text-center'>{error}</p>}

                                <Form onSubmit={handleSubmit(onSubmit)}>

                                    <Form.Group className="mb-3 field">
                                        <Form.Label>Old Password</Form.Label>
                                        <IconKeyFilled stroke={1} width={20} height={20} />
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter old password"
                                            {...register("oldPassword", { required: true })}
                                        />
                                        {errors.oldPassword && (
                                            <p className="text-danger small">Old password is required</p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3 field">
                                        <Form.Label>New Password</Form.Label>
                                        <IconKeyFilled stroke={1} width={20} height={20} />
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter new password"
                                            {...register("newPassword", {
                                                required: true,
                                                minLength: 6
                                            })}
                                        />
                                        {errors.newPassword && (
                                            <p className="text-danger small">
                                                Minimum 6 characters required
                                            </p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3 field">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <IconKeyFilled stroke={1} width={20} height={20} />
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm new password"
                                            {...register("confirmPassword", { required: true })}
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-danger small">Confirm your password</p>
                                        )}
                                    </Form.Group>

                                    <Button variant="secondary" type="submit">
                                        Reset Password
                                    </Button>

                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <ToastContainer position="bottom-end" className="p-3">
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={2000}
                        autohide
                        bg="success"
                    >
                        <Toast.Header>
                            <strong className="me-auto">Success</strong>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            Password updated successfully!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </section>
        </>
    )
}

export default Changepassword
