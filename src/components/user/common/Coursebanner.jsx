import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Coursebanner = ({ pageTitle, pageSubtext, className }) => {
    return (
        <>
            <div className={`coursebanner ${className || "smallbanner"}`}>
                <Container>
                    <Row className="justify-content-between align-items-center">
                        <Col md={10}>
                            <div className="banner_text">
                                {pageTitle}
                                {pageSubtext}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Coursebanner