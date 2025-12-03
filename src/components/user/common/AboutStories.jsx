import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Col, Container, Row } from "react-bootstrap";
import Headtitle from "./Headtitle";


const AboutStories = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const stories = [
        {
            title: "Learning Beyond Books",
            content:
                "This program not only improved my academic scores but also taught me teamwork, problem-solving, and communication — skills that helped me get my first internship.",
            img: "/user/user_b.png",
            name: "Riya Patel",
            location: "Gujarat, India",
        },
        {
            title: "Confidence Through Practice",
            content:
                "Public speaking used to terrify me. But the interactive sessions and constant encouragement from my coach changed everything.",
            img: "/user/user_a.png",
            name: "Aman Verma",
            location: "Maharashtra, India",
        },
        {
            title: "Turning Fear into Focus",
            content:
                "I joined the program after failing exams twice. The personalized plan helped rebuild basics and stay disciplined.",
            img: "/user/user_e.png",
            name: "Neha Sharma",
            location: "Delhi, India",
        },
        {
            title: "The Power of Consistency",
            content:
                "Small daily efforts lead to big results. The mentors taught me how to stay consistent and focused on progress.",
            img: "/user/user_c.png",
            name: "Rahul Mehta",
            location: "Gujarat, India",
        },
        {
            title: "Rediscovering My Passion",
            content:
                "Practical learning made subjects exciting again after switching streams. I now look forward to every session!",
            img: "/user/user_f.png",
            name: "Sneha Desai",
            location: "Uttar Pradesh, India",
        },
        {
            title: "From Struggling to Standing Tall",
            content:
                "Math was my weakest subject. With step-by-step modules, I now solve complex problems confidently.",
            img: "/user/user_d.png",
            name: "Ankit Gupta",
            location: "Chhattisgarh, India",
        },
    ];

    return (
        <>
            <div className="studentstories">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={6} lg={8} md={10}>
                            <Headtitle
                                className="text-center"
                                topTitle="Success Stories"
                                title="How our program helped student succeed"
                                headingTag="h3"
                                headingClass="maintitle"
                                underline={true}
                                underlineClass="underline"
                                underlineText="student succeed"
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={8} sm={10}>
                            <div className="swiperslider">

                                <button ref={prevRef} className="swiper-prev"></button>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    loop={true}
                                    speed={1200}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true,
                                    }}
                                    slidesPerView={1}
                                    onInit={(swiper) => {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }}
                                    breakpoints={{
                                        767: { slidesPerView: 1 },
                                    }}
                                >
                                    {stories.map((story, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="storie">
                                                <div className="storiewrap">
                                                    <h5>{story.title}</h5>
                                                    <div className="content">{story.content}</div>
                                                    <div className="botinfo">
                                                        <div className="user">
                                                            <img loading="lazy" src={story.img} alt={story.name} />
                                                        </div>
                                                        <div className="username">
                                                            <p>{story.name}</p>
                                                            <span>{story.location}</span>
                                                        </div>
                                                    </div>
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
            </div>
        </>
    );
};

export default AboutStories;
