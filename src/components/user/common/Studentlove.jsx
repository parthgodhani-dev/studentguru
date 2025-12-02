import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Slider from "react-slick";
import Headtitle from './Headtitle';
import testimoServices from "../../../appwrite/awtestimo"

const Studentlove = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = async () => {
        try {
            const response = await testimoServices.getAllTestimo()
            if (response && response.documents) {
                setReviews(response.documents)
            }

            console.log(response.documents.length);
            
        } catch (error) {
            console.error("Error fetching testimonials:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

  return (
    <>
        <div className="studentlove">
            <Container>
                <Row className="justify-content-center">
                    <Col sm={10}>
                          <Headtitle
                              className="text-center"
                              topTitle="Our Student Stories"
                              title="Why Student Love Us ?"
                              headingTag="h3"
                              headingClass="maintitle"
                              underline={true}
                              underlineClass="underline"
                              underlineText="Student Love Us"
                          />
                    </Col>
                </Row>
                <div className="testimo_slider">
                     <Row>
                        <Col sm={12}>
                            {loading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" />
                                </div>
                            ) : (
                                <Slider {...settings}>
                                    {
                                        reviews.map((review) => (
                                            <div className="testimo" key={review.$id}>
                                                <div className="testimowrap">
                                                    <div
                                                        className="content"
                                                        dangerouslySetInnerHTML={{ __html: review.content }}
                                                    ></div>
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        <div className="user">
                                                            <img
                                                                src={testimoServices.getFilePreview(review.userimg)}
                                                                alt={review.name}
                                                            />
                                                        </div>
                                                        <div className="username">
                                                            <p>{review.name}</p>
                                                            <span>{review.state}, {review.country}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))

                                    }
                                </Slider>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>
  )
}

export default Studentlove
