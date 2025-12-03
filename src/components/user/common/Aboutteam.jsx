import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Row, Card, Spinner } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import Headtitle from './Headtitle'
import teamServices from '../../../appwrite/awteam';

const Aboutteam = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const [memberdata, setMemberdata] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchmemberdata = async () => {
        try {
            const response = await teamServices.getAllTeam()
            if (response && response.documents) {
                setMemberdata(response.documents)
            }
            console.log(response.documents.length);

        } catch (error) {
            console.error("Error fetching member data:", error)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        fetchmemberdata()
    }, [])
    

  return (
    <>
        <section className="ourteam">
            <Container>
                <Row className="justify-content-center">
                    <Col xl={6} lg={8} md={10}> 
                        <Headtitle
                            className="text-center"
                            topTitle="Our Expert Team"
                            title="Guiding You Toward a Successful Tech Career"
                            headingTag="h3"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Successful Tech Career"
                        />
                    </Col>
                </Row>
                <div className="teamslider">
                    <Row className='justify-content-center'>
                        {loading ? (
                            <Col md={10}>
                                <div className="text-center py-4">
                                    <Spinner animation="border" />
                                </div>
                            </Col>
                        ) : (
                            <Col md={10}>
                                <div className="swiperslider">
                                    <button ref={prevRef} className="swiper-prev"></button>
                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        slidesPerView={3}
                                        speed={1000}
                                        autoplay={{
                                            delay: 500,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true, // stop autoplay on hover
                                        }}
                                        loop={true}
                                        onInit={(swiper) => {
                                            swiper.params.navigation.prevEl = prevRef.current;
                                            swiper.params.navigation.nextEl = nextRef.current;
                                            swiper.navigation.init();
                                            swiper.navigation.update();
                                        }}
                                        breakpoints={{
                                            1200: { slidesPerView: 3 },
                                            1024: { slidesPerView: 2 },
                                            768: { slidesPerView: 2 },
                                            480: { slidesPerView: 1 },
                                            0: { slidesPerView: 1 },
                                        }}
                                    >
                                        {memberdata.map((m, index) => (
                                            <SwiperSlide key={index}>
                                                <Card className="h-100">
                                                    <Card.Img
                                                        variant="top"
                                                        src={teamServices.getFilePreview(m.expertimg)}
                                                        alt={m.name}
                                                    />
                                                    <Card.Body>
                                                        <h4>{m.name}</h4>
                                                        <strong>{m.designation}</strong>
                                                        <ul>
                                                            <li><strong>Experience :</strong> <span>{m.experience}</span></li>
                                                            <li><strong>Expertise :</strong> <span>{m.expertise}</span></li>
                                                            <li><strong>Bio :</strong> <span>{m.bio}</span></li>
                                                        </ul>
                                                    </Card.Body>
                                                </Card>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <button ref={nextRef} className="swiper-next"></button>
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>
            </Container>
        </section>
    </>
  )
}

export default Aboutteam