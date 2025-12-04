import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Form, Row, Button, FormGroup } from 'react-bootstrap'
import { IconBrandFacebook, IconBrandInstagram, IconBrandYoutube, IconUserFilled, IconMailFilled, IconPhoneFilled, IconMessage} from '@tabler/icons-react'; 
import Headtitle from '../common/Headtitle';


const Contact = () => {
  return (
    <>
        <div className="auth_section">
            <Container>
                <Row>
                    <Col sm={12}>
                        <Headtitle
                            className="text-center"
                            topTitle="Have Some Questions ???"
                            title="Way To Contact Us"
                            headingTag="h1"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Contact Us"
                            subTitle="Don't be stranger just say Hello."
                        />
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-between'>
                    <Col md={7}>
                        <div className="authform">
                            <Form>
                                <FormGroup className="mb-3 field" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <IconUserFilled stroke={1} width={20} height={20} />
                                    <Form.Control type="text" placeholder="Enter full name" />
                                </FormGroup>

                                <Form.Group className="mb-3 field" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <IconMailFilled stroke={1} width={20} height={20} />
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3 field" controlId="formBasicPhone">
                                    <Form.Label>Phone address</Form.Label>
                                    <IconPhoneFilled stroke={1} width={20} height={20} />
                                    <Form.Control type="tel" placeholder="Enter Phone" />
                                </Form.Group>

                                <Form.Group className="mb-3 field" controlId="formBasicPhone">
                                    <Form.Label>Comment</Form.Label>
                                    <IconMessage stroke={1} width={20} height={20} />
                                    <Form.Control as="textarea" placeholder="Leave a comment here" />
                                </Form.Group>

                                <Button className='button' variant="primary" type="submit">Submit</Button>

                            </Form>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="cont_img">
                            <img loading="lazy" src="/contact_us.svg" alt="Contact" />
                        </div>
                        <div className="contact_info">
                            <div className="contact_box phone">
                                <h6>E-mail</h6>
                                <a href="mailto:info@Studentguru.com">info@Studentguru.com</a>
                            </div>
                            <div className="contact_box email">
                                <h6>Phone</h6>
                                <a href="tel:9876543210">987-654-3210</a>
                            </div>
                            <div className="contact_box address">
                                <h6>Address</h6>
                                  <a href="https://goo.gl/maps/4tBfSGtecCWS2S9f6" target="_blank" rel="noopener noreferrer">301, Shivalik Shilp Building, Near Vastrapur Lake, Vastrapur, Ahmedabad, Gujarat – 380015, India</a>
                            </div>
                            <div className="contact_box social">
                                <h6>Social</h6>
                                <ul className="social">
                                    <li><Link to="https://www.facebook.com/"><IconBrandFacebook stroke={1} width={24} height={24} /></Link></li>
                                    <li><Link to="https://www.instagram.com/"><IconBrandInstagram stroke={1} width={24} height={24} /></Link></li>
                                    <li><Link to="https://www.youtube.com/"><IconBrandYoutube stroke={1} width={24} height={24} /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default Contact