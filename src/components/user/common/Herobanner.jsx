import React from 'react';
import {Link} from "react-router-dom"
import { Button, Col, Container, Row } from 'react-bootstrap';

const Herobanner = () => {
  return (
    <>
        <section className="herobanner">
            <Container>
                  <Row className="justify-content-between align-items-center flex-md-row flex-column-reverse gap-md-0 gap-3">
                    <Col xl={5} lg={6} md={7}>
                        <div className="banner_text">
                            <h2>Unlock your potential with <strong className="unline">Student Guru</strong></h2>
                            <p>Expert courses and YouTube lessons to help you learn, grow, and succeed—anytime, anywhere.</p>
                            <Button className="button" as={Link} to="/courses">Start Learing Now</Button>
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={5}>
                        <div className="big_img">
                              <img src="/banner_h.svg" alt="Banner" class="d-lg-block d-none" fetchpriority="high"  decoding="async" />
                              <img className='d-lg-none d-block' src="/hbhome.svg" alt="Banner" fetchpriority="high" decoding="async" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Herobanner;