import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { IconMailFilled } from '@tabler/icons-react';
import Headtitle from '../common/Headtitle'

const Forgotpassword = () => {
  return (
    <>
        <section className='auth_section'>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Headtitle
                            className="text-center"
                            topTitle="oww!!"
                            title="Forgot your Password ?"
                            headingTag="h1"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="your Password ?"
                            subTitle="Provide your account's email for which you want to reset your password"
                        />
                    </Col>
                </Row>

                <Row className='align-items-center justify-content-center flex-md-row flex-column-reverse gap-md-0 gap-3'>
                    <Col xl={4} lg={4} md={3}>
                        <img src="/undraw_unlock.svg" alt="" />
                    </Col>
                    <Col xl={6} lg={6} md={9}>
                        <div className="authform">

                            <Form>
                                <Form.Group className="mb-3 field" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <IconMailFilled stroke={1} width={20} height={20} />
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>
                                <Button className='w-100' variant="secondary" type="submit">
                                    Sign In
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Forgotpassword