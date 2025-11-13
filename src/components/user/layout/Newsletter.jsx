import React from 'react'
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { IconMailFilled } from '@tabler/icons-react';
import Headtitle from '../common/Headtitle';

const Newsletter = () => {
  return (
    <>
        <section className="newletter_section">
            <Container>
                <Row className='justify-content-center'>
                    <Col sm={10}>
                        <Headtitle
                            className="text-center"
                            topTitle="Take Your Knowledge To Next Level"
                            title="subscribe for exclusive content and videos"
                            headingTag="h4"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="for exclusive content and"
                            subTitle="Subscribe to our newsletter and stay updated on the latest news and courses!"
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col md={6}>
                        <form action="" className='newletterform'>
                            <Form.Group className="field">
                                <IconMailFilled stroke={1} width={20} height={20} />
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant="primary" className='inside' type="submit">Subscribe</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Newsletter