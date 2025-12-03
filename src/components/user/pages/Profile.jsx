import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { IconUserFilled, IconMailFilled, IconPhoneFilled, IconCalendarWeekFilled } from '@tabler/icons-react';
import Headtitle from '../common/Headtitle';

const Profile = () => {

    const userInfo = useSelector(state => state.auth.userData)

    const date = userInfo?.dob
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';


    return (
        <>
            <section className='auth_section'>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <Headtitle
                                className="text-center"
                                topTitle={`Hello, ${userInfo.name}`}
                                title="Welcome to Your Profile"
                                headingTag="h2"
                                headingClass="maintitle"
                                underline={true}
                                underlineClass="underline"
                                underlineText="Your Profile"
                                subTitle="View and manage your profile information here."
                            />
                        </Col>
                    </Row>
                    <Row className='align-items-center justify-content-center flex-sm-row flex-column-reverse gap-sm-0 gap-3'>
                        <Col lg={6} md={4} sm={4}>
                            <img loading="lazy" src="/profile-data.svg" alt="" />
                        </Col>
                        <Col lg={6} md={8} sm={8}>
                            <div className="authform">
                                <Form>
                                    <Form.Group className="mb-3 field">
                                        <Form.Label>Full name</Form.Label>
                                        <IconUserFilled stroke={1} width={20} height={20} />
                                        <Form.Control type="text" value={userInfo?.name} readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3 field">
                                        <Form.Label>Email</Form.Label>
                                        <IconMailFilled stroke={1} width={20} height={20} />
                                        <Form.Control type="email" value={userInfo?.email} readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3 field">
                                        <Form.Label>Phone Number</Form.Label>
                                        <IconPhoneFilled stroke={1} width={20} height={20} />
                                        <Form.Control type="tel" value={userInfo?.phone} readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3 field">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <IconCalendarWeekFilled stroke={1} width={20} height={20} />
                                        <Form.Control type="date" value={formattedDate} readOnly />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Profile