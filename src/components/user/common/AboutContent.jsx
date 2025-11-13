import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Headtitle from './Headtitle'

const AboutContent = () => {
  return (
    <>
        <div className="AboutContent">
            <Container>
                <Row className="justify-content-center">
                    <Col sm={10}>
                        <Headtitle
                            className="text-center"
                            topTitle="Why Choose Us ???"
                            title="Fast Track Your Learning With a Simplified One-To-One MenToring"
                            headingTag="h2"
                            headingClass="maintitle h3"
                            underline={true}
                            underlineClass="underline h3"
                            underlineText="One-To-One MenToring"
                        />
                        <div className="headtitle">
                            <span></span>
                            <h2></h2>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-between rowpy'>
                    <Col sm={6}>
                        <div className="aboutimg">
                            <img src="/public/about_c.svg" alt="" />
                        </div>
                    </Col>
                    <Col sm={5}>
                        <div className="aboutcont">
                            <div className="icon_box"></div>
                            <h3>Bulding talier-mode projects and a portfolio to find a job</h3>
                              <p>Work on real-world projects that reflect your goals and interests. Our mentors guide you step-by-step to create a professional portfolio that helps you stand out in job interviews and impress employers.</p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-between rowpy'>
                    <Col sm={5}>
                        <div className="aboutcont">
                            <div className="icon_box"></div>
                            <h3>Realizing your first missions as a freelance developer</h3>
                              <p>StudentGuru helps you go beyond theory. From understanding client requirements to completing live freelance missions — we prepare you for the real challenges of the tech world with confidence.</p>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <div className="aboutimg">
                            <img src="/public/about_a.svg" alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-between rowpy'>
                    <Col sm={6}>
                        <div className="aboutimg">
                            <img src="/public/about_b.svg" alt="" />
                        </div>
                    </Col>
                    <Col sm={5}>
                        <div className="aboutcont">
                            <div className="icon_box"></div>
                            <h3>Starting at first job as a juniior devloper.</h3>
                              <p>Step into the professional world with the right guidance. Our one-to-one mentorship focuses on technical, communication, and interview skills so you can start your career strong and grow faster.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <div className="d-flex align-items-center justify-content-center">
                            <a className="button" href="/">Get Start Now</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default AboutContent