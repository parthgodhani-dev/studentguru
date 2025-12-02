import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const PageBanner = ({ pageTitle, pageSubtext, pageBannerimg, className }) => {
    return (
        <>
            <div className={`herobanner ${className || ""}`}>
                <Container>
                    <Row className="justify-content-between align-items-center flex-md-row flex-column-reverse gap-md-0 gap-3">
                        <Col xl={6} md={7}>
                            <div className="banner_text">
                                {pageTitle}
                                {pageSubtext}
                            </div>
                        </Col>
                        <Col xl={6} md={5}>
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