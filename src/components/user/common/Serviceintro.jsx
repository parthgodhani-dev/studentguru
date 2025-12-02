import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Serviceintro = () => {
  return (
    <>
        <section className='serviceintro'>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={8}>
                        <h2>Learning That Adapts to You</h2>
                        <p>At StudentGuru, we believe every learner is unique. Our online learning programs are built around your pace, your goals, and your style of learning. Whether you’re mastering new skills or improving your existing ones, our mentors guide you step-by-step through personalized video sessions, assignments, and feedback.</p>
                        <strong>Our expert mentors aren’t just teachers — they’re professionals who help students turn learning into real success.</strong>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Serviceintro