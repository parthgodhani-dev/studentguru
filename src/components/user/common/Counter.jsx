import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { IconAward, IconMichelinStar, IconSchool, IconVideo } from '@tabler/icons-react';

const Counter = () => {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true });
    const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true });

    return (
        <div className="counter">
            <Container>
                <Row className="align-items-center justify-content-between">
                    <Col lg={3} sm={6}>
                        <div className="box">
                            <div className="rbox">
                                <IconVideo stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref1}>
                                    <strong>{inView1 && <CountUp start={0} end={200} duration={3} />}</strong>
                                    <span>+</span>
                                </div>
                                <p>Videos</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} sm={6}>
                        <div className="box">
                            <div className="rbox">
                                <IconSchool stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref2}>
                                    <strong>{inView2 && <CountUp start={0} end={3500} duration={3} />}</strong>
                                    <span>k+</span>
                                </div>
                                <p>Students</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} sm={6}>
                        <div className="box">
                            <div className="rbox">
                                <IconMichelinStar stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref3}>
                                    <strong>{inView3 && <CountUp start={0} end={14} duration={3} />}</strong>
                                    <span>yrs</span>
                                </div>
                                <p>Experience</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={3} sm={6}>
                        <div className="box">
                            <div className="rbox">
                                <IconAward stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref4}>
                                    <strong>{inView4 && <CountUp start={0} end={8} duration={3} />}</strong>
                                </div>
                                <p>Awards</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Counter;
