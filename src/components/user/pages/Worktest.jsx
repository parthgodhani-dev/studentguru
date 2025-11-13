import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Headtitle from "../common/Headtitle"

const Worktest = () => {
  return (
    <>
        <section>
            <Container>
                <Row>
                    <Col md={12}>
                    <div>
                          <Headtitle
                            className="text-end"
                            topTitle="Take Your Knowledge To Next Level"
                            title = "subscribe for exclusive content and videos"
                            headingTag = "h2"
                            headingClass = "maintitle"
                            underline = {true}
                            underlineClass = "underline"
                            underlineText= "for exclusive content and"
                            subTitle = "Subscribe to our newsletter and stay updated on the latest news and courses!"
                          />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Worktest