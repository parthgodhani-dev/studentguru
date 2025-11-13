import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Herobanner = () => {
  return (
    <>
        <section className="herobanner">
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col sm={5}>
                        <div className="banner_text">
                            <h2>Unlock your potential with <strong className="unline">Student Guru</strong></h2>
                            <p>Expert courses and YouTube lessons to help you learn, grow, and succeed—anytime, anywhere.</p>
                            <button className="button">Click Here</button>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="big_img">
                            <img src="/banner_h.svg" alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Herobanner;