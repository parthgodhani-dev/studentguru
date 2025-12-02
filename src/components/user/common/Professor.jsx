import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IconCircleArrowRightFilled } from '@tabler/icons-react';
import Headtitle from './Headtitle';

const Professor = () => {
  return (
      <>
          <section className="professer">
              <Container>
                  <Row className="align-items-center justify-content-between">
                      <Col lg={6} md={5}>
                          <div className="img_box d-lg-block d-none">
                              <div className="box">
                                  <img src="/unifr.png" alt="" />
                              </div>
                              <img src="/mr_johndoe.png" alt="mr_johndoe" />
                              <Link to="/register" className="link_box">
                                  <p className='mb-0'>Register For Webinar Now <IconCircleArrowRightFilled stroke={1} width={20} height={20} /></p>
                              </Link>
                          </div>
                      </Col>
                      <Col lg={6} md={12}>
                          <div className="info">
                              <Headtitle
                                  className="text-start mb-3"
                                  topTitle="Learn with the best"
                                  title="Meet Mr. Rajesh Sharma, Professor of Computer Science"
                                  headingTag="h3"
                                  headingClass="maintitle h4"
                                  underline={true}
                                  underlineClass="underline h4"
                                  underlineText="Mr. Rajesh Sharma"
                              />
                              <div className="img_box d-lg-none mb-3">
                                  <div className="box">
                                      <img src="/unifr.png" alt="" />
                                  </div>
                                  <img src="/mr_johndoe.png" alt="mr_johndoe" />
                                  <Link to="/register" className="link_box">
                                      <p className='mb-0'>Register For Webinar Now <IconCircleArrowRightFilled stroke={1} width={20} height={20} /></p>
                                  </Link>
                              </div>
                              <p>With over 15 years of teaching and industry experience, Mr. Rajesh Sharma has mentored thousands of students across the globe. His passion for technology and education drives him to make complex topics simple and engaging for every learner. He specializes in guiding students through practical coding challenges, modern web development, and career-focused learning strategies. At StudentGuru, his mission is to help every student unlock their potential and build confidence in real-world problem solving.</p>
                              <ul>
                                  <li>Builds strong foundations in programming and logic</li>
                                  <li>Focuses on hands-on, project-based learning</li>
                                  <li>Inspires curiosity and lifelong learning habits</li>
                              </ul>
                          </div>
                      </Col>
                  </Row>
              </Container>
          </section>
      </>
  )
}

export default Professor