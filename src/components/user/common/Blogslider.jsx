import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import blogServices from '../../../appwrite/awblog';
import Headtitle from './Headtitle';

const Blogslider = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [blogs, setBlogs] = useState([]);

    const fatchBlogInfo = async () => {
        try {
            const response = await blogServices.getAllBlogs();

            if (response && response.documents) {
                setBlogs(response.documents);
            }
        } catch (error) {
            console.log("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fatchBlogInfo();
    }, []);

    return (
        <>
            <div className="blogslider">
                <Container>
                    <Row className="align-items-center justify-content-between">
                        <Col xl={3} md={4} className='text-center mb-md-0 mb-5'>
                            <Headtitle
                                className="text-center mb-3"
                                topTitle="Get Started With a basic knowledge"
                                title="Boost Your Career With Advanced Skill."
                                headingTag="h2"
                                headingClass="maintitle"
                                underline={true}
                                underlineClass="underline"
                                underlineText="Boost Your Career"
                            />
                            <Link to="/blog" className='button'>get knowledge</Link>
                        </Col>

                        <Col xl={9} md={8}>
                            <div className="blogslider_box">
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
                                        slidesPerView={3}
                                        onInit={(swiper) => {
                                            swiper.params.navigation.prevEl = prevRef.current;
                                            swiper.params.navigation.nextEl = nextRef.current;
                                            swiper.navigation.init();
                                            swiper.navigation.update();
                                        }}
                                        breakpoints={{
                                            1199: { slidesPerView: 3 },
                                            992: { slidesPerView: 3 },
                                            768: { slidesPerView: 2 },
                                            479: { slidesPerView: 2 },
                                            0: { slidesPerView: 1 }
                                        }}
                                    >
                                        {blogs.length > 0 ? (
                                            blogs.map((blog) => {
                                                const createdDateStr = blog.$createdAt || blog.createdAt;
                                                const createdDate = createdDateStr
                                                    ? new Date(createdDateStr).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "";

                                                return (
                                                    <SwiperSlide key={blog.$id}>
                                                        <div className="blog_box">
                                                            <div className="wrap">
                                                                <div className="box_img">
                                                                    <img src={blogServices.getFilePreview(blog.featuredimage)} alt={blog.title} />
                                                                </div>

                                                                <div className="featwrap">
                                                                    <small>{createdDate}</small>
                                                                    <h3>{blog.title}</h3>
                                                                    <p>{blog.shortcontent}</p>
                                                                    <Link to={`/blog/${blog.$id}`} className="button">Read More</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })
                                        ) : (
                                            <SwiperSlide>
                                                <h2>lol</h2>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>

                                    <button ref={nextRef} className="swiper-next"></button>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Blogslider;
