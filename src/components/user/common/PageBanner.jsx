import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const PageBanner = ({ pageTitle, pageSubtext, pageBannerimg, className }) => {
    return (
        <>
            <div className={`herobanner ${className || ""}`}>
                <Container>
                    <Row className="justify-content-between align-items-center">
                        <Col sm={6}>
                            <div className="banner_text">
                                {pageTitle}
                                {pageSubtext}
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="big_img">
                                {pageBannerimg}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default PageBanner