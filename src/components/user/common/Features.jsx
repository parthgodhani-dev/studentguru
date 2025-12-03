import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Col, Container, Row } from 'react-bootstrap';

const Features = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

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
                            <div className="swiperslider">

                                <button ref={prevRef} className="swiper-prev d-md-none d-block"></button>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    loop={true}
                                    speed={1000}
                                    autoplay={{
                                        delay: 500,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true,
                                    }}
                                    slidesPerView={4}
                                    onInit={(swiper) => {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }}
                                    breakpoints={{
                                        1200: { slidesPerView: 4 },
                                        992: { slidesPerView: 3 },
                                        768: { slidesPerView: 2 },
                                        0: { slidesPerView: 1 }
                                    }}
                                >
                                    {featuresSlideInfo.map((feature, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="features_box">
                                                <div className="featwrap">
                                                    <div className="box_img">
                                                        <img loading="lazy" src={feature.src} alt="" />
                                                    </div>
                                                    <h3>{feature.title}</h3>
                                                    <p>{feature.desc}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <button ref={nextRef} className="swiper-next"></button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Features
