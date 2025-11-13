import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Headtitle from '../common/Headtitle'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <>
    <section className='notfound'>
        <Container>
            <Row className='flex-column align-items-center justify-content-between'>
                <Col md={6}>
                    <img src="/notfound.svg" alt="" width={350} />
                </Col>
                <Col md={6}>
                    <Headtitle
                        className="text-center"
                        title="Oops! Page Not Found"
                        headingTag="h1"
                        headingClass="maintitle"
                        underline={true}
                        underlineClass="underline"
                        underlineText="Not Found"
                        subTitle=""
                    />
                    <strong>The page you're looking for doesn’t exist, has been removed, or is temporarily unavailable. Try checking the URL or return to the homepage.</strong>
                    <Link to={"/"} className='button d-flex'>Go to Homepage</Link>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Notfound