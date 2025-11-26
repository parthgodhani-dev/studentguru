import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { IconBook2, IconUsersGroup, IconClockHour4 } from '@tabler/icons-react';

const CourseCounter = () => {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true });

    return (
        <div className="counter courses_count">
            <Container>
                <Row className="align-items-center justify-content-between">

                    {/* Total Courses */}
                    <Col sm={4}>
                        <div className="box">
                            <div className="rbox">
                                <IconBook2 stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref1}>
                                    <strong>{inView1 && <CountUp start={0} end={10} duration={1} />}</strong>
                                    <span>+</span>
                                </div>
                                <p>Professional IT Courses Available</p>
                            </div>
                        </div>
                    </Col>

                    {/* Active Learners */}
                    <Col sm={4}>
                        <div className="box">
                            <div className="rbox">
                                <IconUsersGroup stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref2}>
                                    <strong>{inView2 && <CountUp start={0} end={1200} duration={2} />}</strong>
                                    <span>+</span>
                                </div>
                                <p>Active Learners on StudentGuru</p>
                            </div>
                        </div>
                    </Col>

                    {/* Avg Course Duration */}
                    <Col sm={4}>
                        <div className="box">
                            <div className="rbox">
                                <IconClockHour4 stroke={2} width={50} height={50} />
                            </div>
                            <div className="lbox">
                                <div className="number" ref={ref3}>
                                    <strong>{inView3 && <CountUp start={0} end={6} duration={2.5} />}</strong>
                                    <span>Weeks</span>
                                </div>
                                <p>Average Duration to Complete each Course</p>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default CourseCounter;
