import React, { useState } from 'react'
import { Col, Container, Row, Form, Button, Toast, ToastContainer } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login as authLogin } from '../../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../../appwrite/auth'
import { useForm } from "react-hook-form"
import {IconMailFilled, IconKeyFilled } from '@tabler/icons-react';
import Headtitle from '../common/Headtitle'

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)
    const from = location.state?.from || "/";

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) { 
                    dispatch(authLogin(userData))
                    setShowToast(true)
                    
                    setTimeout(() => {
                        setShowToast(false)
                        navigate(from, { replace: true });
                    }, 2000)
                }
            }
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
        }
    }

  return (
    <>
        <section className='auth_section'>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Headtitle
                            className="text-center"
                            topTitle="Hi there !!!"
                            title="Welcome Back !!!"
                            headingTag="h1"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Welcome Back !!!"
                            subTitle="Sign in to continue"
                        />
                    </Col>
                </Row>

                <Row className='align-items-center justify-content-center flex-md-row flex-column-reverse gap-md-0 gap-3'>
                    <Col xl={7} lg={6} md={5}>
                        <img loading="lazy" src="/login.svg" alt="" />
                    </Col>
                    <Col xl={5} lg={6} md={7}>
                        <div className="authform">
                            {error && <p className='text-danger text-center'>{error}</p>}
                            <Form onSubmit={handleSubmit(login)}>
                                <Form.Group className="mb-3 field" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <IconMailFilled stroke={1} width={20} height={20} />
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", { required: true })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 field" controlId="formBasicPassword">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Form.Label>Password</Form.Label>
                                        <Link to="/forgotpassword">Lost password ?</Link>
                                    </div>
                                    <IconKeyFilled stroke={1} width={20} height={20} />
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", { required: true })}
                                        autoComplete=''
                                    />
                                </Form.Group>

                                <Button variant="secondary" type="submit">
                                    Sign In
                                </Button>

                                <div className="mt-3">
                                    <p className="mb-0">Not Registered ? <Link to="/register" data-discover="true">Create account</Link></p>
                                </div>

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
                        <strong className="me-auto">Login Success</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        You have logged in successfully!
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </section>
    </>
  )
}

export default Login