import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Spinner } from 'react-bootstrap';
import Slider from "react-slick";
import Headtitle from './Headtitle'
import teamServices from '../../../appwrite/awteam';

const Aboutteam = () => {

    const settings = {
        dots: false,
        arrow : true,
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
                        <Col md={10}>
                            {loading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" />
                                </div>
                            ) : (
                                <Slider {...settings}>
                                        {memberdata.map((m, index) => (
                                            <Col md={3} key={index} className='mb-4'>
                                                <Card>
                                                    <Card.Img variant="top" 
                                                        src={teamServices.getFilePreview(m.expertimg)}
                                                        alt={m.name} />
                                                    <Card.Body>
                                                        <h4>{m.name}</h4>
                                                        <strong>{m.designation}</strong>
                                                        <ul>
                                                            <li><strong>Experience :</strong><span>{m.experience}</span></li>
                                                            <li><strong>Expertise :</strong><span>{m.expertise}</span></li>
                                                            <li><strong>Bio :</strong><span>{m.bio}</span></li>
                                                        </ul>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                </Slider>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    </>
  )
}

export default Aboutteam