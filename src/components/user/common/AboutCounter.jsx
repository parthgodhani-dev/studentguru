


import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { IconBriefcase2, IconCalendarSearch, IconFlag } from '@tabler/icons-react';

const Counter = () => {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true });

    return (
        <div className="counter abt_count">
            <Container>
                <Row className="align-items-center justify-content-start">
                    <Col xl={4} md={6}>
                        <div className="box">
                            <div className="rbox">
                                <IconBriefcase2 stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref1}>
                                    <strong>{inView1 && <CountUp start={0} end={12} duration={0.5} />}</strong>
                                    <span>K+</span>
                                </div>
                                <p>Student successfully working in tech</p>
                            </div>
                        </div>
                    </Col>

                    <Col xl={4} md={6}>
                        <div className="box">
                            <div className="rbox">
                                <IconCalendarSearch stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref2}>
                                    <strong>{inView2 && <CountUp start={0} end={4} duration={3} />}</strong>
                                    <span>Week</span>
                                </div>
                                <p>To find a job after course on avg</p>
                            </div>
                        </div>
                    </Col>

                    <Col xl={4} md={12}>
                        <div className="box">
                            <div className="rbox">
                                <IconFlag stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref3}>
                                    <strong>{inView3 && <CountUp start={0} end={3} duration={3} />}</strong>
                                    <span>Months</span>
                                </div>
                                <p>To successfully finish the course</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Counter;
