import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Slider from "react-slick";
import Headtitle from './Headtitle';

const AboutStories = () => {

    const [sliderKey, setSliderKey] = useState(0);
        
    useEffect(() => {
        setTimeout(() => {
            setSliderKey(prev => prev + 1);
            window.dispatchEvent(new Event("resize"));
        }, 200);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }
        ]
    };

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
                            <div className="storie_slider">
                                <Slider key={sliderKey} {...settings}>
                                    <div className="storie">
                                        <div className="storiewrap">
                                            <h5>Learning Beyond Books</h5>
                                            <div className="content">This program not only improved my academic scores but also taught me teamwork, problem-solving, and communication — skills that helped me get my first internship.</div>
                                            <div className="botinfo">
                                                <div className="user">
                                                    <img src="./user/user_b.png" alt="" />
                                                </div>
                                                <div className="username">
                                                    <p>Riya Patel</p>
                                                    <span>Gujarat, India</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="storie">
                                        <div className="storiewrap">
                                            <h5>Confidence Through Practice</h5>
                                            <div className="content">Public speaking used to terrify me. But the interactive sessions and constant encouragement from my coach changed everything. Today, I lead presentations at my college with ease!</div>
                                            <div className="botinfo">
                                                <div className="user">
                                                    <img src="./user/user_a.png" alt="" />
                                                </div>
                                                <div className="username">
                                                    <p>Aman Verma</p>
                                                    <span>Maharashtra, India</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="storie">
                                        <div className="storiewrap">
                                            <h5>Turning Fear into Focus</h5>
                                            <div className="content">I joined the program after failing my exams twice. The personalized study plan helped me rebuild my basics, manage time, and stay disciplined. This year, I passed with distinction!</div>
                                            <div className="botinfo">
                                                <div className="user">
                                                    <img src="./user/user_e.png" alt="" />
                                                </div>
                                                <div className="username">
                                                    <p>Neha Sharma</p>
                                                    <span>Delhi, India</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="storie">
                                        <div className="storiewrap">
                                            <h5>The Power of Consistency</h5>
                                            <div className="content">I never believed small daily efforts could lead to big results until I joined this program. The mentors taught me how to stay consistent and focused on progress, not perfection.</div>
                                            <div className="botinfo">
                                                <div className="user">
                                                    <img src="./user/user_c.png" alt="" />
                                                </div>
                                                <div className="username">
                                                    <p>Rahul Mehta</p>
                                                    <span>Gujarat, India</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="storie">
                                        <div className="storiewrap">
                                            <h5>Rediscovering My Passion</h5>
                                            <div className="content">I lost interest in studies after switching streams, but the practical learning methods here made subjects exciting again. I now look forward to every session!</div>
                                            <div className="botinfo">
                                                <div className="user">
                                                    <img src="./user/user_f.png" alt="" />
                                                </div>
                                                <div className="username">
                                                    <p>Sneha Desai</p>
                                                    <span>Uttar Pradesh, India</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="storie">
                                        <div className="storiewrap">
                                            <h5>From Struggling to Standing Tall</h5>
                                            <div className="content">Math was always my weakest subject. Thanks to the mentors and step-by-step learning modules, I now solve complex problems confidently — and even help my classmates.</div>
                                            <div className="botinfo">
                                                <div className="user">
                                                    <img src="./user/user_d.png" alt="" />
                                                </div>
                                                <div className="username">
                                                    <p>Ankit Gupta</p>
                                                    <span>Chhattisgarh, India</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AboutStories
