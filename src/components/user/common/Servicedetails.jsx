import React from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import Headtitle from './Headtitle'

const Servicedetails = () => {

  const servicesinfo = [
    {
      img: "/interactive-video-learning.svg",
      title: "Interactive Video Learning",
      content: "Our high-quality, topic-based video tutorials make complex subjects simple. Each module includes practice tasks and real examples, helping students grasp concepts visually."
    }, 
    {
      img: "/one-to-one-mentorship.svg",
      title: "One-to-One Mentorship",
      content: "Every learner gets access to mentors who guide them through challenges, review progress, and share proven strategies for academic and career growth."
    },
    {
      img: "/skill-development-programs.svg",
      title: "Skill Development Programs",
      content: "From communication and coding to data analytics, our programs focus on real-world skills employers value most — helping you stay ahead of the competition."
    },
    {
      img: "/assessments-progress-tracking.svg",
      title: "Assessments & Progress Tracking",
      content: "StudentGuru offers smart progress analytics so you can monitor improvements, identify weak areas, and celebrate every milestone along your learning journey."
    },
  ]
  
  return (
    <>
      <div className="servicecontent">
        <Container>
          <Row className="justify-content-center">
            <Col sm={8}>
              <Headtitle
                className="text-center"
                topTitle="What We Offer"
                title="Our Core Services Designed for Student Success"
                headingTag="h2"
                headingClass="maintitle h3"
                underline={true}
                underlineClass="underline h3"
                underlineText="Student Success"
              />
            </Col>
          </Row>

          <Row className='justify-content-center'>
            {
              servicesinfo.map((service, index) => (
                <Col md={3} key={index}>
                  <Card>
                    <div className="imgbox">
                      <Card.Img src={service.img} />
                    </div>
                    <Card.Body>
                      <h2>{service.title}</h2>
                      <Card.Text>{service.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Servicedetails