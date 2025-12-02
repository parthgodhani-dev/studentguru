import React, { useEffect } from 'react'
import Slider from "react-slick";
import { Col, Container, Row } from 'react-bootstrap'

const Features = () => {

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
        speed: 1000,
        autoplaySpeed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
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

    const featuresSlideInfo = [
        {
            src: "/icons/online-learning.png",
            title: "Learn Anytime, Anywhere",
            desc: "Access all your courses and live sessions online — study at your own pace from any device."
        },
        {
            src: "/icons/operation.png",
            title: "Instant Enrollment",
            desc: "Join your favorite program instantly after sign-up and start learning without any delays."
        },
        {
            src: "/icons/best-seller.png",
            title: "Our Expert Mentors",
            desc: "Learn directly from industry professionals who share real-world knowledge and experience."
        },
        {
            src: "/icons/quote.png",
            title: "Personalized Guidance",
            desc: "Get customized learning paths, career advice, and progress tracking tailored just for you."
        },
        {
            src: "/icons/buy.png",
            title: "Practical Learning",
            desc: "Go beyond theory with hands-on projects, assignments, and real-world challenges."
        },
        {
            src: "/icons/order.png",
            title: "Certification & Recognition",
            desc: "Earn verified certificates for each program — showcase your achievements on LinkedIn and resumes."
        }
    ];


  return (
    <>
          <section className="features_section">
            <Container>
                <Row className="justify-content-center">
                    <Col md={12}>
                        <div className="Features_slider">
                            <Slider {...settings}>
                                {featuresSlideInfo.map((feature, index) => (
                                    <div className="features_box" key={index}>
                                        <div className="featwrap">
                                            <div className="box_img">
                                                <img src={feature.src} alt="" />
                                            </div>
                                            <h3>{feature.title}</h3>
                                            <p>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Features