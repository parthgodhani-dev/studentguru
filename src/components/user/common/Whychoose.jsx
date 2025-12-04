import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Headtitle from './Headtitle'

const Whychoose = () => {

    const reasons = [
        {
            img: "/consulting.webp",
            title: "Expert Mentors",
            content: "Learn directly from industry professionals who guide you at every step.",
        },
        {
            img: "/knowledge.webp",
            title: "Personalized Learning",
            content: "Every student gets a custom learning path designed for their goals.",
        },
        {
            img: "/flexible.webp",
            title: "Real-World Projects",
            content: "Build real projects to strengthen your skills and portfolio.",
        },
        {
            img: "/goal.webp",
            title: "Career Support",
            content: "Get resume help, mock interviews, and placement guidance.",
        },
        {
            img: "/project.webp",
            title: "Flexible Schedule",
            content: "Learn anytime, anywhere with our self-paced modules.",
        },
        {
            img: "/help.webp",
            title: "Community Support",
            content: "Join a vibrant community of students and mentors who help you grow.",
        },
    ]

  return (
    <>
        <div className="whychoose">
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
                            underlineText="Your Learning With a Simplified"
                        />
                    </Col>
                </Row>
                <Row>
                    {
                        reasons.map((whychoose, index) => (
                            <Col lg={4} sm={6} key={index}>
                                <div className="infobox">
                                    <img loading="lazy" src={whychoose.img} alt={whychoose.title} />
                                    <h4>{whychoose.title}</h4>
                                    <p>{whychoose.content}</p>
                                </div>
                            </Col>
                        ))
                    }
                    
                </Row>
                <Row className="justify-content-center">
                    <Col xl={4} md={6}>
                        <div className="buttons d-flex align-items-center flex-sm-row flex-column justify-content-center gap-3">
                            <Link to="/courses" className='button'>Get Start Now</Link>
                            <Link to="/about" className='button'>Learn More</Link>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    </>
  )
}

export default Whychoose